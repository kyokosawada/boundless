import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";

interface BookingRequest {
  serviceType: string; pickupDate: string; pickupTime: string; pickupType: string;
  pickupAddress: string; dropoffType: string; dropoffAddress: string; stops: string[];
  passengers: number; distance?: string; duration?: string;
  phone: string; firstName?: string; lastName?: string; email?: string;
}

export async function POST(request: NextRequest) {
  const body: BookingRequest = await request.json();
  const db = getDb();

  let customer = db.prepare("SELECT id, firstName FROM customers WHERE phone = ?").get(body.phone) as { id: number; firstName: string } | undefined;

  if (!customer) {
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json({ error: "New customers must provide firstName, lastName, and email" }, { status: 400 });
    }
    const result = db.prepare("INSERT INTO customers (phone, firstName, lastName, email) VALUES (?, ?, ?, ?)").run(body.phone, body.firstName, body.lastName, body.email);
    customer = { id: Number(result.lastInsertRowid), firstName: body.firstName };
  }

  const result = db.prepare(`INSERT INTO bookings (customerId, serviceType, pickupDate, pickupTime, pickupType, pickupAddress, dropoffType, dropoffAddress, stops, passengers, distance, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
    customer.id, body.serviceType, body.pickupDate, body.pickupTime, body.pickupType, body.pickupAddress, body.dropoffType, body.dropoffAddress, JSON.stringify(body.stops || []), body.passengers, body.distance || null, body.duration || null
  );

  return NextResponse.json({ success: true, bookingId: Number(result.lastInsertRowid), customerName: customer.firstName });
}
