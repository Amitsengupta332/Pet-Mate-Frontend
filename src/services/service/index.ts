/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const getAllService = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/service`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: "no-store",
      next: {
        revalidate: 5,
      },
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleService = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/service/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // টোকেন পাঠাতে হবে
      },
      next: { revalidate: 5 },
    });

    if (!res.ok) throw new Error("Failed to fetch service details");

    return await res.json();
  } catch (error: any) {
    return { success: false, data: null };
  }
};