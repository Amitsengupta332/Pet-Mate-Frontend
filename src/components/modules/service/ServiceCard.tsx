"use client";

import React from "react";
import Link from "next/link";
import {
  Footprints,
  Home,
  Sun,
  Clock,
  User,
  Award,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
} from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface ServiceData {
  id: string;
  serviceType: "WALKING" | "BOARDING" | "DAYCARE" | "SITTING";
  price: number;
  description?: string | null;
  sitter: {
    id: string;
    bio: string;
    experience: string;
    hourlyRate: number;
    user: {
      id: string;
      name: string;
      email: string;
    };
    // ডাইনামিক রেটিং (যদি ব্যাকএন্ড থেকে আসে)
    averageRating?: number;
    reviewCount?: number;
  };
}

interface ServiceCardProps {
  service: ServiceData;
}

const getServiceDetails = (type: ServiceData["serviceType"]) => {
  switch (type) {
    case "WALKING":
      return {
        label: "Dog Walking",
        icon: Footprints,
        badgeStyle:
          "bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-900",
      };
    case "BOARDING":
      return {
        label: "Pet Boarding",
        icon: Home,
        badgeStyle:
          "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900",
      };
    case "DAYCARE":
      return {
        label: "Pet Daycare",
        icon: Sun,
        badgeStyle:
          "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900",
      };
    case "SITTING":
      return {
        label: "House Sitting",
        icon: Clock,
        badgeStyle:
          "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900",
      };
    default:
      return {
        label: type,
        icon: Footprints,
        badgeStyle: "bg-orange-50 text-orange-600 border-orange-200",
      };
  }
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const details = getServiceDetails(service.serviceType);
  const IconComponent = details.icon;
  const sitterName = service.sitter?.user?.name || "Verified Sitter";
  const experience = service.sitter?.experience || "Certified";

  // ডাইনামিক রেটিং ও রিভিউ চেক
  const rating = service.sitter?.averageRating;
  const reviewCount = service.sitter?.reviewCount || 0;

  return (
    <Card className="group relative w-full max-w-sm overflow-hidden rounded-3xl border border-orange-100 dark:border-orange-950/60 bg-gradient-to-b from-card via-card to-orange-50/30 dark:to-orange-950/10 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/20 transition-all duration-500" />

      <CardContent className="p-6 flex flex-col gap-4 relative z-10">
        {/* Header: Service Type & Price */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${details.badgeStyle}`}
          >
            <IconComponent className="h-3.5 w-3.5" />
            <span>{details.label}</span>
          </span>

          <div className="flex items-baseline gap-0.5 bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-2xl border border-orange-200/50">
            <span className="text-xl font-black">${service.price}</span>
            <span className="text-[11px] font-semibold text-orange-500/80">
              /hr
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="font-extrabold text-xl text-foreground group-hover:text-orange-500 transition-colors leading-tight">
            {details.label} Service
          </h3>
          <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed min-h-[2.25rem]">
            {service.description ||
              "Comprehensive care and attention customized for your pet's needs."}
          </p>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-1" />

        {/* Sitter Profile Box */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/80 dark:bg-card/80 border border-orange-100/80 dark:border-orange-900/40 shadow-xs backdrop-blur-xs">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/20">
                <User className="h-5 w-5" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-card p-0.5 rounded-full">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 fill-emerald-100" />
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-foreground line-clamp-1">
                {sitterName}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                <Award className="h-3 w-3 text-orange-500 shrink-0" />
                <span>{experience} Experience</span>
              </div>
            </div>
          </div>

          {/* Dynamic Rating / Badge Logic */}
          {rating && rating > 0 ? (
            <div className="flex items-center gap-1 bg-orange-50 dark:bg-orange-950/40 px-2 py-1 rounded-xl text-xs font-bold text-orange-600 shrink-0">
              <Star className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
              <span>{rating.toFixed(1)}</span>
              {reviewCount > 0 && (
                <span className="text-[10px] text-muted-foreground font-normal">
                  ({reviewCount})
                </span>
              )}
            </div>
          ) : (
            <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 px-2 py-1 rounded-xl text-[11px] font-bold shrink-0">
              New Sitter
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0 relative z-10 flex gap-2">
        {/* View Details Button */}
        <Link href={`/services/${service.id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full h-11 border-orange-200 text-orange-600 hover:bg-orange-50 font-semibold rounded-2xl transition-all"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
