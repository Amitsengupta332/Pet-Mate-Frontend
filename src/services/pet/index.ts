/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const getMyPets = async () => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;

    if (!token) {
      return { success: false, data: [] };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pet`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error?.message || "Failed to fetch pets",
    };
  }
};
export const createPet = async (petData: {
  name: string;
  breed: string;
  age: string;
  notes?: string;
}) => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "You are not authenticated! Please login first.",
      };
    }

    // প্রিজমার জন্য ক্লিন পেলোড তৈরি (কোনো undefined ফিল্ড যাবে না)
    const payload = {
      name: petData.name.trim(),
      breed: petData.breed.trim(),
      age: String(petData.age).trim(),
      notes: petData.notes?.trim() || "No special instructions",
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong!",
    };
  }
};
