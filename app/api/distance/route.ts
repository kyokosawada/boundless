import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { origin, destination } = await request.json();
  if (!origin || !destination) return NextResponse.json({ error: "Origin and destination required" }, { status: 400 });

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.rows?.[0]?.elements?.[0]?.status === "OK") {
    const el = data.rows[0].elements[0];
    return NextResponse.json({ distance: el.distance.text, duration: el.duration.text });
  }
  return NextResponse.json({ error: "Could not calculate distance" }, { status: 422 });
}
