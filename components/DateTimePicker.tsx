"use client";

interface DateTimePickerProps {
  date: string; time: string;
  onDateChange: (date: string) => void; onTimeChange: (time: string) => void;
}

export default function DateTimePicker({ date, time, onDateChange, onTimeChange }: DateTimePickerProps) {
  return (
    <div className="flex gap-3">
      <div className="floating-input flex items-center flex-1">
        <span className="icon">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
            <path strokeWidth="2" d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </span>
        <input type="date" value={date} onChange={(e) => onDateChange(e.target.value)} className="flex-1" />
      </div>
      <div className="floating-input flex items-center w-36">
        <span className="icon">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeWidth="2" strokeLinecap="round" d="M12 6v6l4 2" />
          </svg>
        </span>
        <input type="time" value={time} onChange={(e) => onTimeChange(e.target.value)} className="flex-1" />
      </div>
    </div>
  );
}
