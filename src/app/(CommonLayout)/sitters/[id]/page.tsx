/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import { ArrowLeft, User, Star, Award } from "lucide-react";
import { getSingleSitter } from "@/services/sitter";
import { getMyPets } from "@/services/pet";
import BookingWidget from "@/components/modules/dashboard/sitter/bookingWidget";
 

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SitterDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const [sitterRes, petsRes] = await Promise.all([
    getSingleSitter(id),
    getMyPets(),
  ]);

  const sitter = sitterRes?.data;
  const pets = petsRes?.data || [];

  if (!sitter) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">Sitter profile not found!</h2>
        <Link href="/sitters" className="text-orange-500 text-sm underline mt-2 block">
          Back to Browse Sitters
        </Link>
      </div>
    );
  }

  const avgRating =
    sitter.reviews?.length > 0
      ? (sitter.reviews.reduce((acc: any, r: any) => acc + r.rating, 0) / sitter.reviews.length).toFixed(1)
      : "New";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/sitters"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        <span>Back to Sitters</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Sitter Bio, Services & Reviews */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-xs space-y-4">
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-2xl bg-orange-100 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center font-bold text-2xl">
                {sitter.user?.name?.[0]?.toUpperCase() || <User className="size-8" />}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{sitter.user?.name}</h1>
                <p className="text-xs text-muted-foreground">{sitter.user?.email}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-600 px-2 py-0.5 rounded-md text-xs font-semibold">
                    <Star className="size-3 fill-amber-500 text-amber-500" />
                    <span>{avgRating} ({sitter.reviews?.length || 0} reviews)</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium">
                    <Award className="size-3 text-orange-500" />
                    <span>{sitter.experience}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                About Me
              </h3>
              <p className="text-sm text-foreground/85 leading-relaxed">{sitter.bio}</p>
            </div>
          </div>

          {/* Services List */}
          <div className="bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-foreground">Offered Services & Pricing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sitter.services?.map((svc: any) => (
                <div key={svc.id} className="p-4 rounded-2xl border border-border bg-muted/20 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-foreground text-sm">{svc.serviceType}</span>
                    <span className="text-sm font-bold text-orange-500">${svc.price}/hr</span>
                  </div>
                  {svc.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{svc.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-foreground">Client Reviews</h3>
            {sitter.reviews?.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">No reviews yet for this sitter.</p>
            ) : (
              <div className="space-y-3">
                {sitter.reviews?.map((rev: any) => (
                  <div key={rev.id} className="p-3.5 rounded-xl border border-border bg-muted/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground">{rev.owner?.name || "Pet Owner"}</span>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="size-3 fill-amber-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Booking Widget */}
        <div className="lg:col-span-5">
          <BookingWidget
            sitterUserId={sitter.user.id}
            services={sitter.services || []}
            pets={pets}
          />
        </div>
      </div>
    </div>
  );
}