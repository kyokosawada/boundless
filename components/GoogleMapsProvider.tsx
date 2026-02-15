"use client";

import { Libraries, LoadScript } from "@react-google-maps/api";
import { ReactNode } from "react";

const libraries: Libraries = ["places"];

export default function GoogleMapsProvider({ children }: { children: ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return <>{children}</>;
  return <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>{children}</LoadScript>;
}
