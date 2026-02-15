# ExampleIQ Booking Form

A full-stack booking form for airport transportation and limousine services, built with Next.js 14, featuring Google Maps integration, phone-based customer recognition, and SQLite persistence.

## Features

- **Service type toggle** — One-way transfer or hourly booking
- **Google Places Autocomplete** — Location and airport search for pickup, stops, and drop-off
- **Distance & duration estimation** — Google Distance Matrix API integration
- **Phone-based customer lookup** — Returning customers are recognized automatically
- **New customer registration** — Collects first name, last name, and email for new phone numbers
- **Form validation** — Client-side validation with inline error messages
- **SQLite persistence** — Bookings and customers stored locally via better-sqlite3

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** SQLite via better-sqlite3
- **Maps:** Google Maps JavaScript API (@react-google-maps/api)
- **Phone Input:** react-phone-number-input + libphonenumber-js

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**

   Create a `.env.local` file in the project root:

   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

   You need a Google Maps API key with the following APIs enabled:
   - Maps JavaScript API
   - Places API
   - Distance Matrix API

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### `GET /api/customers/lookup?phone=<phone>`

Looks up a customer by phone number. Returns `{ found: true, firstName }` or `{ found: false }`.

### `POST /api/bookings`

Submits a new booking. Creates the customer record if not found. Request body includes service type, pickup/dropoff details, stops, passenger count, phone, and optional contact info for new customers. Returns `{ success: true, bookingId, customerName }`.

### `POST /api/distance`

Calculates distance and travel time between two addresses using the Google Distance Matrix API. Request body: `{ origin, destination }`. Returns `{ distance, duration }`.

## Project Structure

```
app/
  page.tsx                  — Main page with header and booking form
  layout.tsx                — Root layout with metadata
  globals.css               — Tailwind base + floating input styles
  api/
    bookings/route.ts       — Booking submission endpoint
    customers/lookup/route.ts — Customer phone lookup endpoint
    distance/route.ts       — Distance calculation endpoint
components/
  BookingForm.tsx            — Main form orchestrator (state, validation, submission)
  ServiceToggle.tsx          — One-way / Hourly toggle
  LocationTypeToggle.tsx     — Location / Airport toggle
  DateTimePicker.tsx         — Date and time inputs
  LocationPicker.tsx         — Google Places Autocomplete input
  PassengerCount.tsx         — Passenger number input
  PhoneField.tsx             — International phone input with lookup
  ContactInfo.tsx            — New customer contact fields
  GoogleMapsProvider.tsx     — Google Maps script loader
lib/
  db.ts                      — SQLite database initialization
  validation.ts              — Form validation logic
```
