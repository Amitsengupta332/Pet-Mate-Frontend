"use client";

import React from "react";
import Link from "next/link";
import { Search, CalendarCheck, HeartHandshake, ShieldCheck, ArrowRight, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    stepNumber: "01",
    title: "Search & Compare",
    description: "Browse verified local sitters, dog walkers, and boarding facilities near you by location and service type.",
    icon: Search,
    iconBg: "bg-orange-100 text-orange-500 dark:bg-orange-950/40",
  },
  {
    stepNumber: "02",
    title: "Book & Connect",
    description: "Choose your preferred dates, select your pet, and send a direct booking request to your chosen sitter.",
    icon: CalendarCheck,
    iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-950/40",
  },
  {
    stepNumber: "03",
    title: "Relax & Track",
    description: "Enjoy total peace of mind with background-checked sitters, activity updates, and loving care for your pet.",
    icon: HeartHandshake,
    iconBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-16 lg:py-24 bg-linear-to-b from-background via-orange-50/30 to-background">
      <div className="container px-4 md:px-8 mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-xs sm:text-sm font-semibold">
            <PawPrint className="h-4 w-4" />
            <span>Simple 3-Step Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            How <span className="text-orange-500">PetMate</span> Works
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Getting loving, trusted care for your pets is quick and hassle-free. Here is how you can get started in minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.stepNumber}
                className="relative bg-card border border-border/80 rounded-3xl p-8 shadow-lg hover:shadow-xl hover:border-orange-200 transition-all group flex flex-col justify-between"
              >
                {/* Step Number Badge */}
                <div className="absolute top-6 right-6 text-3xl font-black text-muted-foreground/20 group-hover:text-orange-500/20 transition-colors">
                  {item.stepNumber}
                </div>

                <div>
                  {/* Icon Box */}
                  <div className={`h-14 w-100% max-w-14 rounded-2xl flex items-center justify-center font-bold mb-6 transition-transform group-hover:scale-110 ${item.iconBg}`}>
                    <IconComponent className="h-7 w-7" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-orange-500 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Sub-badge */}
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-orange-500" />
                  <span>Verified & Safe</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Call-to-Action */}
        <div className="mt-14 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/sitters">
            <Button className="h-12 px-7 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 group">
              <span>Find a Sitter Now</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="/register">
            <Button variant="outline" className="h-12 px-7 rounded-2xl font-semibold">
              Become a Sitter
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}