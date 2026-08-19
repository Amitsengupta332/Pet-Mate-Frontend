/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Dog,
  ArrowRight,
  ShieldCheck,
  PawPrint,
  HeartHandshake,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { registerUser } from "@/services/auth";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  role: z.enum(["owner", "sitter"], {
    required_error: "Please select a role",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "owner",
      password: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      const registerData = {
        ...data,
        role: data.role.toUpperCase(), // Prisma Enum-এর জন্য বড় হাতের অক্ষরে রূপান্তর
      };

      const res = await registerUser(registerData);

      if (res?.success) {
        toast.success(res.message || "Registration Successful!");
      } else {
        toast.error(res?.message || "Registration failed!");
      }
      console.log(res);
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    }
  }

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center bg-gradient-to-br from-orange-50/40 via-background to-orange-100/30 p-4 lg:p-8">
      <div className="w-full max-w-4xl bg-card rounded-3xl border border-orange-100 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Branding & Visual Banner */}
        <div className="hidden lg:flex lg:col-span-5 relative bg-gradient-to-tr from-orange-500 via-orange-500 to-amber-500 p-8 flex-col justify-between text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <Image
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800&auto=format&fit=crop"
              alt="Pet walking background"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Dog className="h-6 w-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight">
              PetMate
            </span>
          </div>

          <div className="relative z-10 my-auto py-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium mb-4">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Join 10k+ Pet Lovers</span>
            </div>
            <h2 className="text-3xl font-extrabold leading-tight mb-3">
              Start your journey with PetMate today!
            </h2>
            <p className="text-orange-100 text-sm leading-relaxed">
              Find reliable pet sitters or offer your care services to pet
              parents nearby.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-white text-orange-500 flex items-center justify-center font-bold shrink-0">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold">Flexible Roles</p>
              <p className="text-[10px] text-orange-100">
                Pet Owners & Certified Sitters
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          <div className="mb-6 text-center lg:text-left">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-orange-100 text-orange-500 mb-3 lg:hidden">
              <Dog className="h-6 w-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Create an Account
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Join PetMate to manage or provide pet care services
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup className="space-y-3">
              {/* Full Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="register-name"
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Full Name
                    </FieldLabel>
                    <div className="relative mt-1">
                      <User className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        id="register-name"
                        placeholder="John Doe"
                        className="pl-10 h-11 rounded-xl border-border focus-visible:ring-orange-500"
                        aria-invalid={fieldState.invalid}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Email Address */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="register-email"
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Email Address
                    </FieldLabel>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        id="register-email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10 h-11 rounded-xl border-border focus-visible:ring-orange-500"
                        aria-invalid={fieldState.invalid}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Role Selection */}
              <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      I want to register as
                    </FieldLabel>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      <button
                        type="button"
                        onClick={() => field.onChange("owner")}
                        className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
                          field.value === "owner"
                            ? "border-orange-500 bg-orange-50 text-orange-600 dark:bg-orange-950/30"
                            : "border-border hover:bg-accent text-muted-foreground"
                        }`}
                      >
                        <PawPrint className="h-4 w-4" />
                        <span>Pet Owner</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => field.onChange("sitter")}
                        className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
                          field.value === "sitter"
                            ? "border-orange-500 bg-orange-50 text-orange-600 dark:bg-orange-950/30"
                            : "border-border hover:bg-accent text-muted-foreground"
                        }`}
                      >
                        <HeartHandshake className="h-4 w-4" />
                        <span>Pet Sitter</span>
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="register-password"
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Password
                    </FieldLabel>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-11 rounded-xl border-border focus-visible:ring-orange-500"
                        aria-invalid={fieldState.invalid}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              type="submit"
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 group mt-2"
            >
              <span>Create Account</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-orange-500 hover:text-orange-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}