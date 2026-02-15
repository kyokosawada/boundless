"use client";

import { useState, useCallback } from "react";
import { E164Number } from "libphonenumber-js";
import ServiceToggle from "./ServiceToggle";
import DateTimePicker from "./DateTimePicker";
import LocationTypeToggle from "./LocationTypeToggle";
import LocationPicker from "./LocationPicker";
import PhoneField from "./PhoneField";
import ContactInfo from "./ContactInfo";
import PassengerCount from "./PassengerCount";
import { validateForm, FormData, ValidationErrors } from "@/lib/validation";

export default function BookingForm() {
  const [serviceType, setServiceType] = useState<"one-way" | "hourly">("one-way");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupType, setPickupType] = useState<"location" | "airport">("location");
  const [pickupAddress, setPickupAddress] = useState("");
  const [stops, setStops] = useState<string[]>([]);
  const [dropoffType, setDropoffType] = useState<"location" | "airport">("airport");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [phone, setPhone] = useState<E164Number | undefined>();
  const [phoneFound, setPhoneFound] = useState<boolean | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passengers, setPassengers] = useState<number | "">("");
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handlePhoneLookup = useCallback(async (phoneNumber: string) => {
    try {
      const res = await fetch(`/api/customers/lookup?phone=${encodeURIComponent(phoneNumber)}`);
      const data = await res.json();
      setPhoneFound(data.found);
      setCustomerName(data.found ? data.firstName : "");
    } catch { setPhoneFound(false); }
  }, []);

  const calculateDistance = useCallback(async (origin: string, dest: string) => {
    if (!origin || !dest) return;
    try {
      const res = await fetch("/api/distance", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ origin, destination: dest }) });
      const data = await res.json();
      if (data.distance) { setDistance(data.distance); setDuration(data.duration); }
    } catch {}
  }, []);

  const handlePickupChange = useCallback((addr: string) => {
    setPickupAddress(addr);
    if (addr && dropoffAddress) calculateDistance(addr, dropoffAddress);
  }, [dropoffAddress, calculateDistance]);

  const handleDropoffChange = useCallback((addr: string) => {
    setDropoffAddress(addr);
    if (pickupAddress && addr) calculateDistance(pickupAddress, addr);
  }, [pickupAddress, calculateDistance]);

  const addStop = () => setStops([...stops, ""]);
  const updateStop = (i: number, v: string) => { const s = [...stops]; s[i] = v; setStops(s); };
  const removeStop = (i: number) => setStops(stops.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData: FormData = { serviceType, pickupDate, pickupTime, pickupType, pickupAddress, dropoffType, dropoffAddress, stops, phone: phone || "", phoneFound, firstName, lastName, email, passengers };
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...formData, distance, duration }) });
      const data = await res.json();
      if (data.success) setSubmitSuccess(true);
    } catch { setErrors({ submit: "Failed to submit booking. Please try again." }); }
    finally { setSubmitting(false); }
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-serif text-gold mb-4">Booking Confirmed!</h2>
        <p className="text-gray-600">Your reservation has been submitted successfully.</p>
        {distance && duration && <p className="text-sm text-gray-500 mt-2">Estimated: {distance} — {duration}</p>}
        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-gold text-white rounded-full hover:bg-gold-dark transition-colors">Book Another Ride</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ServiceToggle value={serviceType} onChange={setServiceType} />

      <section className="space-y-3">
        <h2 className="font-bold text-navy">Pickup</h2>
        <DateTimePicker date={pickupDate} time={pickupTime} onDateChange={setPickupDate} onTimeChange={setPickupTime} />
        {errors.pickupDate && <p className="text-red-500 text-xs">{errors.pickupDate}</p>}
        {errors.pickupTime && <p className="text-red-500 text-xs">{errors.pickupTime}</p>}
        <LocationTypeToggle value={pickupType} onChange={setPickupType} />
        <LocationPicker value={pickupAddress} locationType={pickupType} onChange={handlePickupChange} />
        {errors.pickupAddress && <p className="text-red-500 text-xs">{errors.pickupAddress}</p>}
        {stops.map((stop, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="flex-1"><LocationPicker label={`Stop ${i + 1}`} value={stop} locationType="location" onChange={(v) => updateStop(i, v)} /></div>
            <button type="button" onClick={() => removeStop(i)} className="text-red-400 hover:text-red-600 text-sm mt-3">✕</button>
          </div>
        ))}
        <button type="button" onClick={addStop} className="text-gold text-sm hover:text-gold-dark transition-colors">+ Add a stop</button>
      </section>

      <section className="space-y-3">
        <h2 className="font-bold text-navy">Drop off</h2>
        <LocationTypeToggle value={dropoffType} onChange={setDropoffType} />
        <LocationPicker value={dropoffAddress} locationType={dropoffType} onChange={handleDropoffChange} />
        {errors.dropoffAddress && <p className="text-red-500 text-xs">{errors.dropoffAddress}</p>}
      </section>

      {distance && duration && (
        <div className="bg-gold/10 border border-gold/30 rounded-md px-4 py-2 text-sm text-navy">
          Estimated distance: <strong>{distance}</strong> — Travel time: <strong>{duration}</strong>
        </div>
      )}

      <section className="space-y-3">
        <h2 className="font-bold text-navy">Contact Information</h2>
        <PhoneField value={phone} onChange={setPhone} onLookup={handlePhoneLookup} />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
        <ContactInfo found={phoneFound} firstName={firstName} lastName={lastName} email={email} customerName={customerName} onFirstNameChange={setFirstName} onLastNameChange={setLastName} onEmailChange={setEmail} />
        {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
        {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </section>

      <PassengerCount value={passengers} onChange={setPassengers} />
      {errors.passengers && <p className="text-red-500 text-xs">{errors.passengers}</p>}

      {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
      <button type="submit" disabled={submitting} className="w-full bg-gold hover:bg-gold-dark text-white font-medium py-3 rounded-full transition-colors disabled:opacity-50">
        {submitting ? "Submitting..." : "Continue"}
      </button>
    </form>
  );
}
