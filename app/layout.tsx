import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ExampleIQ - Book Your Ride",
  description: "Airport transportation and limousine booking",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
