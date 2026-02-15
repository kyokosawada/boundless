"use client";

interface ContactInfoProps {
  found: boolean | null; firstName: string; lastName: string; email: string; customerName?: string;
  onFirstNameChange: (v: string) => void; onLastNameChange: (v: string) => void; onEmailChange: (v: string) => void;
}

export default function ContactInfo({ found, firstName, lastName, email, customerName, onFirstNameChange, onLastNameChange, onEmailChange }: ContactInfoProps) {
  if (found === null) return null;
  if (found && customerName) return <p className="text-green-700 text-sm mt-2">Welcome back, {customerName}!</p>;

  return (
    <div className="space-y-3 mt-2">
      <p className="text-sm text-gray-600">We don&apos;t have that phone number on file. Please provide additional contact information.</p>
      <div className="flex gap-3">
        <div className="floating-input flex items-center flex-1">
          <label>First name</label>
          <span className="icon"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" strokeWidth="2" /></svg></span>
          <input type="text" value={firstName} onChange={(e) => onFirstNameChange(e.target.value)} placeholder="First name" />
        </div>
        <div className="floating-input flex items-center flex-1">
          <label>Last name</label>
          <span className="icon"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" strokeWidth="2" /></svg></span>
          <input type="text" value={lastName} onChange={(e) => onLastNameChange(e.target.value)} placeholder="Last name" />
        </div>
      </div>
      <div className="floating-input flex items-center">
        <label>Email</label>
        <span className="icon"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></span>
        <input type="email" value={email} onChange={(e) => onEmailChange(e.target.value)} placeholder="name@example.com" />
      </div>
    </div>
  );
}
