"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, PawPrint, Star, ShieldCheck, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop",
    alt: "Happy Dog with Sitter",
    badgeTitle: "100% Verified",
    badgeSub: "Background Checked",
    badgeIcon: PawPrint,
    badgeBg: "bg-orange-100 text-orange-500",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1200&auto=format&fit=crop",
    alt: "Dog Walking Service",
    badgeTitle: "Reliable Walkers",
    badgeSub: "Daily Activity Logs",
    badgeIcon: ShieldCheck,
    badgeBg: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop",
    alt: "Cat and Dog Boarding",
    badgeTitle: "Instant Booking",
    badgeSub: "Real-time Availability",
    badgeIcon: Calendar,
    badgeBg: "bg-green-100 text-green-600",
  },
];

export default function HeroSection() {
  const router = useRouter();
  const [service, setService] = useState("");

  const handleSearch = () => {
    if (service) {
      router.push(`/sitters?service=${service}`);
    } else {
      router.push("/sitters");
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-orange-50/50 via-background to-background py-10 lg:py-16 overflow-hidden">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-xs sm:text-sm font-medium w-fit mx-auto lg:mx-0">
              <ShieldCheck className="h-4 w-4" />
              <span>Verified & Trusted Pet Sitters</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Loving Care for Your{" "}
              <span className="text-orange-500">Furry Friends</span> While
              You’re Away.
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Book trusted local pet sitters, dog walkers, and boarding
              facilities in seconds.
            </p>

            {/* Quick Search Widget - Only Existing Backend Service Types */}
            <div className="mt-2 p-3 sm:p-4 bg-card rounded-2xl border shadow-xl flex flex-col sm:flex-row gap-3 items-center max-w-lg">
              {/* Service Select */}
              <div className="flex items-center gap-2.5 px-3 py-2 border sm:border-0 rounded-xl sm:rounded-none w-full sm:flex-1">
                <PawPrint className="h-5 w-5 text-orange-500 shrink-0" />
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="bg-transparent text-sm outline-none w-full text-foreground cursor-pointer font-medium"
                >
                  <option value="">All Services</option>
                  <option value="WALKING">Dog Walking</option>
                  <option value="BOARDING">Pet Boarding</option>
                  <option value="DAYCARE">Pet Daycare</option>
                  <option value="SITTING">House Sitting</option>
                </select>
              </div>

              {/* Action Button */}
              <div className="w-full sm:w-auto">
                <Button
                  onClick={handleSearch}
                  className="w-full sm:w-auto px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-5 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-orange-500/20 transition-all cursor-pointer"
                >
                  <Search className="h-4 w-4" />
                  <span>Find Sitters</span>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-foreground">10k+</span>
                <span className="text-xs text-muted-foreground leading-tight">
                  Happy
                  <br />
                  Pets Served
                </span>
              </div>
              <div className="h-8 w-[1px] bg-border hidden sm:block" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-foreground">4.9</span>
                <div className="flex flex-col">
                  <div className="flex text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    500+ Reviews
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Carousel */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-md lg:max-w-none">
              <Carousel className="w-full">
                <CarouselContent>
                  {slides.map((slide) => {
                    const IconComponent = slide.badgeIcon;
                    return (
                      <CarouselItem key={slide.id}>
                        <div className="relative h-[380px] sm:h-[450px] rounded-3xl overflow-hidden border-4 border-background shadow-2xl">
                          <Image
                            src={slide.image}
                            alt={slide.alt}
                            fill
                            className="object-cover"
                            priority={slide.id === 1}
                          />
                          <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-border flex items-center gap-3">
                            <div
                              className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${slide.badgeBg}`}
                            >
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-foreground">
                                {slide.badgeTitle}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                {slide.badgeSub}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="left-3 bg-background/80 hover:bg-background" />
                <CarouselNext className="right-3 bg-background/80 hover:bg-background" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
