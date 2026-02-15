"use client";

interface ServiceToggleProps {
  value: "one-way" | "hourly";
  onChange: (value: "one-way" | "hourly") => void;
}

export default function ServiceToggle({ value, onChange }: ServiceToggleProps) {
  return (
    <div className="flex border border-gray-300 rounded-full overflow-hidden">
      <button type="button" onClick={() => onChange("one-way")}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 text-sm font-medium transition-colors ${value === "one-way" ? "bg-gold text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 12h8m0 0l-3-3m3 3l-3 3" />
        </svg>
        One-way
      </button>
      <button type="button" onClick={() => onChange("hourly")}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 text-sm font-medium transition-colors ${value === "hourly" ? "bg-gold text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="2" />
          <path strokeWidth="2" d="M8 2v4m8-4v4" />
          <circle cx="12" cy="13" r="3" strokeWidth="2" />
          <path strokeWidth="2" strokeLinecap="round" d="M12 12v1.5l1 .5" />
        </svg>
        Hourly
      </button>
    </div>
  );
}
