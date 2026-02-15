import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function GET(request: NextRequest) {
  const phone = request.nextUrl.searchParams.get("phone");
  if (!phone) return NextResponse.json({ error: "Phone number required" }, { status: 400 });

  const db = getDb();
  const customer = db.prepare("SELECT firstName FROM customers WHERE phone = ?").get(phone) as { firstName: string } | undefined;

  if (customer) return NextResponse.json({ found: true, firstName: customer.firstName });
  return NextResponse.json({ found: false });
}
