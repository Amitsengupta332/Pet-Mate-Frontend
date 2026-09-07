/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

// ১. নতুন রিভিউ তৈরি করা (Create Review)
export const createReview = async (payload: {
  bookingId: string;
  rating: number;
  comment: string;
}) => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    if (!token) return { success: false, message: "Unauthorized" };

    const cleanToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cleanToken,
      },
      body: JSON.stringify({
        bookingId: payload.bookingId,
        rating: Number(payload.rating),
        comment: payload.comment,
      }),
    });

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to submit review",
    };
  }
};

// ২. নির্দিষ্ট সিটারের সমস্ত রিভিউ আনা (Get Sitter Reviews)
export const getSitterReviews = async (sitterProfileId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/sitter/${sitterProfileId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error?.message || "Failed to fetch reviews",
    };
  }
};

// ৩. রিভিউ আপডেট করা (Update Review)
export const updateReview = async (
  reviewId: string,
  payload: {
    rating?: number;
    comment?: string;
  },
) => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    if (!token) return { success: false, message: "Unauthorized" };

    const cleanToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${reviewId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: cleanToken,
        },
        body: JSON.stringify({
          rating: payload.rating ? Number(payload.rating) : undefined,
          comment: payload.comment,
        }),
      },
    );

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update review",
    };
  }
};

// ৪. রিভিউ মুছে ফেলা (Delete Review)
export const deleteReview = async (reviewId: string) => {
  try {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    if (!token) return { success: false, message: "Unauthorized" };

    const cleanToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: cleanToken,
        },
      },
    );

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to delete review",
    };
  }
};
