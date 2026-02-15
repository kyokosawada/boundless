"use client";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { E164Number } from "libphonenumber-js";

interface PhoneFieldProps {
  value: E164Number | undefined;
  onChange: (value: E164Number | undefined) => void;
  onLookup: (phone: string) => void;
}

export default function PhoneField({ value, onChange, onLookup }: PhoneFieldProps) {
  return (
    <PhoneInput international defaultCountry="US" value={value} onChange={onChange}
      onBlur={() => { if (value) onLookup(value); }} className="w-full" />
  );
}
