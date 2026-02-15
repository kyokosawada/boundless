export interface FormData {
  serviceType: "one-way" | "hourly";
  pickupDate: string;
  pickupTime: string;
  pickupType: "location" | "airport";
  pickupAddress: string;
  dropoffType: "location" | "airport";
  dropoffAddress: string;
  stops: string[];
  phone: string;
  phoneFound: boolean | null;
  firstName: string;
  lastName: string;
  email: string;
  passengers: number | "";
}

export interface ValidationErrors {
  [key: string]: string;
}

export function validateForm(data: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.pickupDate) {
    errors.pickupDate = "Pickup date is required";
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pickup = new Date(data.pickupDate + "T00:00:00");
    if (pickup < today) {
      errors.pickupDate = "Pickup date must be today or later";
    }
  }
  if (!data.pickupTime) errors.pickupTime = "Pickup time is required";
  if (!data.pickupAddress.trim()) errors.pickupAddress = "Pickup location is required";
  if (!data.dropoffAddress.trim()) errors.dropoffAddress = "Drop off location is required";
  if (!data.phone) errors.phone = "Phone number is required";

  if (data.phoneFound === false) {
    if (!data.firstName.trim()) errors.firstName = "First name is required";
    if (!data.lastName.trim()) errors.lastName = "Last name is required";
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email format";
    }
  }

  if (data.passengers === "" || data.passengers < 1) errors.passengers = "At least 1 passenger required";
  return errors;
}
