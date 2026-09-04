/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

// ১. সিটারের নিজস্ব প্রোফাইল ও সার্ভিস ফেচ করা
export const getMySitterProfile = async () => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    if (!token) return { success: false, data: null };

    // Bearer ছাড়া ক্লিন টোকেন পাঠানো হচ্ছে
    const cleanToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: cleanToken,
      },
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    return { success: false, data: null, message: error?.message };
  }
};

// ২. সিটার প্রোফাইল তৈরি বা আপডেট করা
export const saveSitterProfile = async (payload: {
  bio: string;
  experience: string;
  hourlyRate: number;
  isUpdate?: boolean;
}) => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    if (!token) return { success: false, message: "Unauthorized" };

    const cleanToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    const url = payload.isUpdate
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/sitter/profile`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/sitter`;

    const res = await fetch(url, {
      method: payload.isUpdate ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cleanToken,
      },
      body: JSON.stringify({
        bio: payload.bio,
        experience: payload.experience,
        hourlyRate: parseInt(String(payload.hourlyRate), 10),
      }),
    });

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to save profile" };
  }
};

// ৩. নতুন সার্ভিস তৈরি করা
export const createService = async (payload: {
  serviceType: string;
  price: number;
  description?: string;
}) => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    if (!token) return { success: false, message: "Unauthorized" };

    const cleanToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cleanToken,
      },
      body: JSON.stringify({
        serviceType: payload.serviceType,
        price: Number(payload.price),
        description: payload.description || "",
      }),
    });

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to create service" };
  }
};

// ৪. সার্ভিস ডিলিট করা
export const deleteService = async (serviceId: string) => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    if (!token) return { success: false, message: "Unauthorized" };

    const cleanToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/service/${serviceId}`, {
      method: "DELETE",
      headers: {
        Authorization: cleanToken,
      },
    });

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to delete service" };
  }
};