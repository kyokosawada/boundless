"use client";

import { Autocomplete } from "@react-google-maps/api";
import { useRef, useState, useCallback } from "react";

interface LocationPickerProps {
  label?: string; value: string; locationType: "location" | "airport";
  onChange: (value: string) => void; placeholder?: string;
}

export default function LocationPicker({ label = "Location", value, locationType, onChange, placeholder = "Enter a location" }: LocationPickerProps) {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState(value);

  const onLoad = useCallback((ac: google.maps.places.Autocomplete) => { autocompleteRef.current = ac; }, []);
  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      const addr = place.formatted_address || place.name || "";
      setInputValue(addr);
      onChange(addr);
    }
  }, [onChange]);

  const options: google.maps.places.AutocompleteOptions = {
    types: locationType === "airport" ? ["airport"] : ["establishment", "geocode"],
  };

  return (
    <div className="floating-input flex items-center">
      <label>{label}</label>
      <span className="icon">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" strokeWidth="2" />
        </svg>
      </span>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} options={options}>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={placeholder} className="flex-1" />
      </Autocomplete>
      <svg className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
