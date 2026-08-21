/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    console.log(result);

    const storeCookie = await cookies();
    if (result?.success && result?.data?.token) {
      storeCookie.set("token", result.data.token, {
        secure: true,
        httpOnly: true,
      });
    }

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error?.message || "Something went wrong!",
    };
  }
};

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),  
      },
    );
    const result = await res.json();
    console.log("register", result);

    const storeCookie = await cookies();
    if (result?.success && result?.data?.token) {
      storeCookie.set("token", result.data.token, {
        secure: true,
        httpOnly: true,
      });
    }

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error?.message || "Something went wrong!",
    };
  }
};

export const getUser = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  let decodedData = null;
  if (token) {
    decodedData = await jwtDecode(token);
    return decodedData;
  } else {
    return null;
  }
};

export const logoutUser = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
};
