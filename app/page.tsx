import GoogleMapsProvider from "@/components/GoogleMapsProvider";
import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <GoogleMapsProvider>
      <main className="min-h-screen bg-gray-50 flex justify-center px-4 py-8">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif text-gold">Let&apos;s get you on your way!</h2>
          <BookingForm />
        </div>
      </main>
    </GoogleMapsProvider>
  );
}
