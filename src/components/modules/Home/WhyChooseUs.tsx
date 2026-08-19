"use client";

import React from "react";
import { ShieldCheck, Heart, Award, Clock, Smartphone, Lock, PawPrint, CheckCircle2 } from "lucide-react";

const features = [
  {
    title: "100% Verified Sitters",
    description: "Every sitter undergoes strict background checks, identity verification, and manual profile reviews.",
    icon: ShieldCheck,
    iconBg: "bg-orange-100 text-orange-500 dark:bg-orange-950/40",
  },
  {
    title: "24/7 Loving Care & Support",
    description: "Our dedicated support team and trusted community ensure your pet gets continuous, safe attention.",
    icon: Heart,
    iconBg: "bg-rose-100 text-rose-500 dark:bg-rose-950/40",
  },
  {
    title: "Real-time Photo Updates",
    description: "Receive daily photos, walk maps, and status updates directly on your dashboard so you stay connected.",
    icon: Smartphone,
    iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-950/40",
  },
  {
    title: "Flexible & Secure Payments",
    description: "Book confidently with encrypted payments. Sitters receive payment only after service completion.",
    icon: Lock,
    iconBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40",
  },
  {
    title: "Pet Safety Guarantee",
    description: "If a sitter cancels last minute, our support team guarantees a verified replacement or a full refund.",
    icon: Award,
    iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-950/40",
  },
  {
    title: "Instant Search & Booking",
    description: "Filter by location, price, and real-time availability to reserve reliable pet care in seconds.",
    icon: Clock,
    iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-950/40",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full py-16 lg:py-24 bg-background">
      <div className="container px-4 md:px-8 mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-xs sm:text-sm font-semibold">
            <PawPrint className="h-4 w-4" />
            <span>Trusted By 10,000+ Owners</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Why Pet Parents Choose <span className="text-orange-500">PetMate</span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            We prioritize safety, trust, and loving companionship for your pets while giving you total peace of mind.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl hover:border-orange-200 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Icon Box */}
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-bold mb-5 transition-transform group-hover:scale-110 ${feature.iconBg}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-orange-500 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Sub-badge */}
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs font-semibold text-orange-500">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Guaranteed Feature</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}