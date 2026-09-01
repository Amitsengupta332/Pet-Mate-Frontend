/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const getProfile = async (id: string) => {

    const token = await cookies()
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization : 
      },
      // cache: "no-store",
      next: {
        revalidate: 3600,
      },
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
