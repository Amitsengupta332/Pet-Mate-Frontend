"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dog,
  Heart,
  ShieldCheck,
  PawPrint,
  Users,
  Award,
  Target,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Happy Pets Served", value: "10,000+", icon: PawPrint },
  { label: "Verified Sitters", value: "1,500+", icon: ShieldCheck },
  { label: "Cities Covered", value: "50+", icon: Users },
  { label: "5-Star Reviews", value: "99.8%", icon: Award },
];

const values = [
  {
    title: "Safety First",
    description:
      "Every sitter on our platform undergoes rigorous background checks and identity verification before accepting bookings.",
    icon: ShieldCheck,
    bg: "bg-orange-100 text-orange-500 dark:bg-orange-950/40",
  },
  {
    title: "Unconditional Love",
    description:
      "We treat your pets like family. Our sitters provide personal care, daily updates, and endless affection.",
    icon: Heart,
    bg: "bg-rose-100 text-rose-500 dark:bg-rose-950/40",
  },
  {
    title: "Community Driven",
    description:
      "Building a supportive, transparent network of local pet lovers and responsible pet parents.",
    icon: Users,
    bg: "bg-blue-100 text-blue-600 dark:bg-blue-950/40",
  },
];

export default function AboutUs() {
  return (
    <div className="w-full bg-background min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-orange-50/50 via-background to-background overflow-hidden">
        <div className="container px-4 md:px-8 mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-xs sm:text-sm font-semibold mb-6">
            <Dog className="h-4 w-4" />
            <span>About PetMate</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight mb-6">
            Connecting Pets with{" "}
            <span className="text-orange-500">Loving Caregivers</span> Nearby.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            PetMate was built out of a simple idea: every pet deserves loving,
            trustworthy care when their owners are away. We make finding
            reliable local pet sitters effortless and secure.
          </p>
        </div>
      </section>

      {/* 2. Story Section */}
      <section className="py-12 lg:py-16 border-y border-border/60">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Banner */}
            <div className="lg:col-span-6 relative h-[350px] sm:h-[450px] rounded-3xl overflow-hidden border-4 border-background shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop"
                alt="Happy dog with pet sitter"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-lg font-bold">Trusted by Thousands</p>
                <p className="text-xs text-orange-100">
                  Peace of mind for every pet parent.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-orange-500 font-semibold text-sm">
                <Target className="h-4 w-4" />
                <span>Our Mission</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                Making Pet Care Safe, Transparent & Stress-Free
              </h2>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Whether you need a daily dog walker, house sitter, or overnight
                boarding, PetMate links you directly with experienced carers in
                your neighborhood.
              </p>

              <ul className="space-y-3 pt-2 text-sm text-foreground font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 shrink-0" />
                  <span>Comprehensive background checks for all sitters</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 shrink-0" />
                  <span>Real-time booking management & photo updates</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 shrink-0" />
                  <span>24/7 dedicated customer support team</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="py-12 bg-orange-500 text-white">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-1">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-extrabold">
                    {item.value}
                  </span>
                  <span className="text-xs sm:text-sm text-orange-100 font-medium">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Our Core Values */}
      <section className="py-16 lg:py-24">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
              The Principles That Guide Us
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              We built PetMate around core values that put safety, quality, and
              animal well-being at the heart of everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val) => {
              const IconComp = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-card border border-border/80 rounded-3xl p-8 shadow-md hover:shadow-xl hover:border-orange-200 transition-all duration-300"
                >
                  <div
                    className={`h-12 w-12 rounded-2xl flex items-center justify-center font-bold mb-5 ${val.bg}`}
                  >
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {val.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="pb-16 lg:pb-24">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                Ready to give your pet the best care?
              </h2>
              <p className="text-orange-100 text-sm sm:text-base">
                Join thousands of happy pet parents and verified sitters today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <Link href="/sitters">
                <Button className="w-full sm:w-auto h-12 bg-white text-orange-600 hover:bg-orange-50 font-bold rounded-2xl px-6 flex items-center justify-center gap-2">
                  <span>Find a Sitter</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-12 bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold rounded-2xl px-6 transition-all"
                >
                  Become a Sitter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
