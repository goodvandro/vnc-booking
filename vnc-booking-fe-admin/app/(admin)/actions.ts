"use server"

import { revalidatePath } from "next/cache"
import { strapiAPI } from "@/lib/strapi-api"

export async function getGuestHouseBookings() {
  try {
    const res = await strapiAPI.getGuestHouseBookings()
    return res?.data || []
  } catch (e) {
    console.error("Failed to fetch guest house bookings:", e)
    return []
  }
}

export async function getCarRentalBookings() {
  try {
    const res = await strapiAPI.getCarRentalBookings()
    return res?.data || []
  } catch (e) {
    console.error("Failed to fetch car rental bookings:", e)
    return []
  }
}

export async function getBookingById(id: string) {
  // Try car rental first, then guest house
  try {
    const res = await strapiAPI.getCarRentalBooking(id)
    if (res?.data) return { ...res.data, type: "car" }
  } catch {}
  try {
    const res = await strapiAPI.getGuestHouseBooking(id)
    if (res?.data) return { ...res.data, type: "guestHouse" }
  } catch {}
  return null
}

export async function updateBookingStatus(bookingId: string, status: string) {
  try {
    // Try updating as car rental first
    await strapiAPI.updateCarRentalBookingStatus(bookingId, status)
  } catch {
    try {
      // If not car rental, try guest house
      await strapiAPI.updateGuestHouseBookingStatus(bookingId, status)
    } catch (e) {
      console.error("Failed to update booking status:", e)
      return { success: false }
    }
  }

  revalidatePath("/")
  revalidatePath("/guest-house-bookings")
  revalidatePath("/car-rental-bookings")

  return { success: true }
}

export async function getDashboardStats() {
  try {
    const [carRentalRes, guestHouseRes, carsRes, guestHousesRes] = await Promise.all([
      strapiAPI.getCarRentalBookings(),
      strapiAPI.getGuestHouseBookings(),
      strapiAPI.getCars(),
      strapiAPI.getGuestHouses(),
    ])

    const carRentalBookings = carRentalRes?.data || []
    const guestHouseBookings = guestHouseRes?.data || []
    const allBookings = [...carRentalBookings, ...guestHouseBookings]
    const cars = carsRes?.data || []
    const guestHouses = guestHousesRes?.data || []

    return {
      totalBookings: allBookings.length,
      guestHouseBookings: guestHouseBookings.length,
      carRentalBookings: carRentalBookings.length,
      pendingBookings: allBookings.filter((b: any) => b.bookingStatus === "pending").length,
      confirmedBookings: allBookings.filter((b: any) => b.bookingStatus === "confirmed").length,
      cancelledBookings: allBookings.filter((b: any) => b.bookingStatus === "cancelled").length,
      completedBookings: allBookings.filter((b: any) => b.bookingStatus === "completed").length,
      totalRevenue: allBookings.reduce((sum: number, b: any) => sum + (b.totalPrice || 0), 0),
      totalCars: cars.length,
      totalGuestHouses: guestHouses.length,
    }
  } catch (e) {
    console.error("Failed to fetch dashboard stats:", e)
    return {
      totalBookings: 0,
      guestHouseBookings: 0,
      carRentalBookings: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
      cancelledBookings: 0,
      completedBookings: 0,
      totalRevenue: 0,
      totalCars: 0,
      totalGuestHouses: 0,
    }
  }
}
