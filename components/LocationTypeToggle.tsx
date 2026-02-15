"use client";

interface LocationTypeToggleProps {
  value: "location" | "airport";
  onChange: (value: "location" | "airport") => void;
}

export default function LocationTypeToggle({ value, onChange }: LocationTypeToggleProps) {
  const base = "px-4 py-1 text-xs font-medium rounded-full border transition-colors";
  const active = "border-gold text-gold";
  const inactive = "border-gray-300 text-gray-400 hover:border-gray-400";

  return (
    <div className="flex gap-1">
      <button type="button" onClick={() => onChange("location")} className={`${base} ${value === "location" ? active : inactive}`}>Location</button>
      <button type="button" onClick={() => onChange("airport")} className={`${base} ${value === "airport" ? active : inactive}`}>Airport</button>
    </div>
  );
}
