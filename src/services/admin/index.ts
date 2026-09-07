/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

// ১. প্ল্যাটফর্মের সব ইউজার ফেচ করা
export const getAllUsers = async () => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    if (!token) return { success: false, data: [] };

    const cleanToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`, {
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
      message: error?.message || "Failed to fetch users",
    };
  }
};

// ২. ইউজারের স্ট্যাটাস পরিবর্তন করা (ACTIVE বা SUSPENDED)
export const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "SUSPENDED",
) => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    if (!token) return { success: false, message: "Unauthorized" };

    const cleanToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: cleanToken,
        },
        body: JSON.stringify({ status }),
      },
    );

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update user status",
    };
  }
};

// ৩. প্ল্যাটফর্মের সব বুকিং ফেচ করা
export const getAllBookingsAdmin = async () => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    if (!token) return { success: false, data: [] };

    const cleanToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/bookings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: cleanToken,
        },
        cache: "no-store",
      },
    );

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error?.message || "Failed to fetch bookings",
    };
  }
};
