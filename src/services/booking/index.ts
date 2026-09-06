/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const createBooking = async (payload: {
  sitterId: string;
  petId: string;
  serviceId: string;
  startDate: string;
  endDate: string;
  notes?: string;
}) => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    if (!token) {
      return { success: false, message: "Please login as a Pet Owner to book" };
    }

    const cleanToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cleanToken,
      },
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to create booking",
    };
  }
};

// ওনারের নিজস্ব বুকিং লিস্ট আনা
export const getMyBookings = async () => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    if (!token) return { success: false, data: [] };

    const cleanToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/booking`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: cleanToken,
      },
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error?.message || "Failed to fetch bookings",
    };
  }
};

// পেন্ডিং বুকিং ক্যান্সেল করা
export const cancelBooking = async (bookingId: string) => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    if (!token) return { success: false, message: "Unauthorized" };

    const cleanToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/booking/${bookingId}/cancel`,
      {
        method: "PATCH",
        headers: {
          Authorization: cleanToken,
        },
      },
    );

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to cancel booking",
    };
  }
};
