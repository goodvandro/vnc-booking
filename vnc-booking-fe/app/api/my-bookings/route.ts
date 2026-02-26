import { strapiAPI } from "@/lib/strapi-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch both types of bookings
    const [carBookingsRes, guestHouseBookingsRes] = await Promise.all([
      strapiAPI.getCarRentalBookings(),
      strapiAPI.getGuestHouseBookings(),
    ]);

    const STRAPI_URL = (
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
    ).replace(/\/$/, "");

    // Filter by email and add image URLs
    const carBookings = (carBookingsRes?.data || [])
      .filter((b: any) => b.email?.toLowerCase() === email.toLowerCase())
      .map((b: any) => ({
        ...b,
        type: "car" as const,
        car: b.car
          ? {
              ...b.car,
              images: b.car.images?.map((img: any) => ({
                ...img,
                url: `${STRAPI_URL}${img.url}`,
              })),
            }
          : null,
      }));

    const guestHouseBookings = (guestHouseBookingsRes?.data || [])
      .filter((b: any) => b.email?.toLowerCase() === email.toLowerCase())
      .map((b: any) => ({
        ...b,
        type: "guest_house" as const,
        guest_house: b.guest_house
          ? {
              ...b.guest_house,
              images: b.guest_house.images?.map((img: any) => ({
                ...img,
                url: `${STRAPI_URL}${img.url}`,
              })),
            }
          : null,
      }));

    // Combine and sort by creation date (newest first)
    const allBookings = [...carBookings, ...guestHouseBookings].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ data: allBookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
