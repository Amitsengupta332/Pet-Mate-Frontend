/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

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
