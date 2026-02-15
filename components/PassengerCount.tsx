"use client";

interface PassengerCountProps {
  value: number | ""; onChange: (value: number | "") => void;
}

export default function PassengerCount({ value, onChange }: PassengerCountProps) {
  return (
    <div>
      <p className="text-sm text-gray-700 mb-2">How many passengers are expected for the trip?</p>
      <div className="floating-input flex items-center w-32">
        <label># Passengers</label>
        <input type="number" min="1" value={value}
          onChange={(e) => onChange(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
          placeholder="#" className="text-gold placeholder:text-gold" />
      </div>
    </div>
  );
}
