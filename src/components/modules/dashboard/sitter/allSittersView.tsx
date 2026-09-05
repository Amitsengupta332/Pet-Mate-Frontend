"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, User, DollarSign, Briefcase, Star, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface ISitterProfile {
  id: string;
  bio: string;
  experience: string;
  hourlyRate: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
  services: {
    id: string;
    serviceType: string;
    price: number;
  }[];
  reviews: {
    id: string;
    rating: number;
  }[];
}

export default function AllSittersView({ sitters = [] }: { sitters: ISitterProfile[] }) {
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState("ALL");
  const [maxRate, setMaxRate] = useState<number | "">("");

  const filteredSitters = useMemo(() => {
    return sitters.filter((sitter) => {
      const matchesName = sitter.user?.name.toLowerCase().includes(search.toLowerCase());
      const matchesService =
        selectedService === "ALL" ||
        sitter.services?.some((s) => s.serviceType.toUpperCase() === selectedService);
      const matchesRate = maxRate === "" || sitter.hourlyRate <= Number(maxRate);

      return matchesName && matchesService && matchesRate;
    });
  }, [sitters, search, selectedService, maxRate]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Search & Filter Header */}
      <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Find a Trusted Pet Sitter</h1>
          <p className="text-sm text-muted-foreground">Browse experienced walkers and sitters in your area.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Search by Name */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by sitter name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>

          {/* Service Filter */}
          <div className="relative">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-border bg-background text-foreground text-sm font-medium focus:ring-1 focus:ring-orange-500"
            >
              <option value="ALL">All Services</option>
              <option value="WALKING">Walking</option>
              <option value="BOARDING">Boarding</option>
              <option value="DAYCARE">Daycare</option>
              <option value="SITTING">Sitting</option>
            </select>
          </div>

          {/* Max Hourly Rate */}
          <div className="relative">
            <DollarSign className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
            <Input
              type="number"
              placeholder="Max hourly rate ($)"
              value={maxRate}
              onChange={(e) => setMaxRate(e.target.value ? Number(e.target.value) : "")}
              className="pl-10 h-11 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Sitter Cards Grid */}
      {filteredSitters.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/40">
          <Filter className="size-10 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-bold text-foreground text-lg">No sitters found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your filters or search keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSitters.map((sitter) => {
            const avgRating =
              sitter.reviews?.length > 0
                ? (sitter.reviews.reduce((acc, r) => acc + r.rating, 0) / sitter.reviews.length).toFixed(1)
                : "New";

            return (
              <div
                key={sitter.id}
                className="bg-card border border-border rounded-2xl p-6 shadow-xs hover:border-orange-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="size-12 rounded-2xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center font-bold text-lg">
                        {sitter.user?.name?.[0]?.toUpperCase() || <User className="size-6" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">{sitter.user?.name}</h3>
                        <span className="text-xs text-muted-foreground">{sitter.experience} experience</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 text-amber-600 px-2.5 py-1 rounded-full text-xs font-semibold">
                      <Star className="size-3.5 fill-amber-500 text-amber-500" />
                      <span>{avgRating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-foreground/80 line-clamp-3 mb-4 leading-relaxed">
                    {sitter.bio}
                  </p>

                  {/* Offered Services */}
                  <div className="space-y-2 pt-3 border-t border-border">
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                      Offered Services
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sitter.services && sitter.services.length > 0 ? (
                        sitter.services.map((svc) => (
                          <span
                            key={svc.id}
                            className="text-[11px] font-medium bg-muted px-2.5 py-1 rounded-lg border border-border/60"
                          >
                            {svc.serviceType} (${svc.price})
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground italic">No services listed</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground block">Rate</span>
                    <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                      ${sitter.hourlyRate}
                      <span className="text-xs text-muted-foreground font-normal">/hr</span>
                    </span>
                  </div>

                  <Link href={`/sitters/${sitter.id}`}>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-semibold">
                      View Profile & Book
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}