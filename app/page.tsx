import GoogleMapsProvider from "@/components/GoogleMapsProvider";
import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <GoogleMapsProvider>
      <main className="min-h-screen bg-gray-50 flex justify-center px-4 py-8">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-8 h-8 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="14" r="9" strokeWidth="1.5" />
              <path strokeWidth="1.5" strokeLinecap="round" d="M12 14l-4-7" />
              <path strokeWidth="1.5" strokeLinecap="round" d="M6.5 9.5A7.5 7.5 0 0117.5 9.5" />
              <circle cx="7" cy="11" r="0.5" fill="currentColor" />
              <circle cx="12" cy="8" r="0.5" fill="currentColor" />
              <circle cx="17" cy="11" r="0.5" fill="currentColor" />
            </svg>
            <h1 className="text-xl font-bold text-navy font-serif">ExampleIQ</h1>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-gold">Let&apos;s get you on your way!</h2>
          <BookingForm />
        </div>
      </main>
    </GoogleMapsProvider>
  );
}
