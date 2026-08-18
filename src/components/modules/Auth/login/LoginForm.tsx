"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Eye, EyeOff, Lock, Mail, Dog, ArrowRight, ShieldCheck, PawPrint } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormData) {
    toast.success("Welcome back!", {
      description: `Logged in as ${data.email}`,
    });
  }

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center bg-gradient-to-br from-orange-50/40 via-background to-orange-100/30 p-4 lg:p-8">
      <div className="w-full max-w-4xl bg-card rounded-3xl border border-orange-100 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">

        {/* Left Side: Branding & Visual Banner */}
        <div className="hidden lg:flex lg:col-span-5 relative bg-gradient-to-tr from-orange-500 via-orange-500 to-amber-500 p-8 flex-col justify-between text-white overflow-hidden">
          {/* Background Pet Image Overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <Image
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop"
              alt="Pet care background"
              fill
              className="object-cover"
            />
          </div>

          {/* Top Brand */}
          <div className="relative z-10 flex items-center gap-2">
            <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Dog className="h-6 w-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight">PetMate</span>
          </div>

          {/* Middle Content */}
          <div className="relative z-10 my-auto py-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium mb-4">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Trusted Care Community</span>
            </div>
            <h2 className="text-3xl font-extrabold leading-tight mb-3">
              Welcome back to your pet’s favorite place!
            </h2>
            <p className="text-orange-100 text-sm leading-relaxed">
              Connect with verified sitters, track bookings, and keep your furry friends happy.
            </p>
          </div>

          {/* Bottom Floating Badge */}
          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-white text-orange-500 flex items-center justify-center font-bold shrink-0">
              <PawPrint className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold">10,000+ Happy Pets</p>
              <p className="text-[10px] text-orange-100">Safe & Loving Environment</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          {/* Header */}
          <div className="mb-8 text-center lg:text-left">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-orange-100 text-orange-500 mb-3 lg:hidden">
              <Dog className="h-6 w-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Sign in to PetMate
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FieldGroup>
              {/* Email Field */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Email Address
                    </FieldLabel>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        id="login-email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10 h-11 rounded-xl border-border focus-visible:ring-orange-500"
                        aria-invalid={fieldState.invalid}
                        autoComplete="email"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center justify-between mt-1">
                      <FieldLabel htmlFor="login-password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Password
                      </FieldLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-orange-500 hover:text-orange-600 font-medium hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-11 rounded-xl border-border focus-visible:ring-orange-500"
                        aria-invalid={fieldState.invalid}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-orange-500 hover:text-orange-600 font-semibold hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}