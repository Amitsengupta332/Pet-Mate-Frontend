"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/services/booking";

interface IService {
  id: string;
  serviceType: string;
  price: number;
}

interface IPet {
  id: string;
  name: string;
  breed: string;
}

export default function BookingWidget({
  sitterUserId,
  services = [],
  pets = [],
}: {
  sitterUserId: string;
  services: IService[];
  pets: IPet[];
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedPet, setSelectedPet] = useState(pets[0]?.id || "");
  const [selectedService, setSelectedService] = useState(services[0]?.id || "");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");

  const estimatedPrice = useMemo(() => {
    if (!startDate || !endDate || !selectedService) return 0;
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    if (end <= start) return 0;

    const hours = (end - start) / (1000 * 60 * 60);
    const service = services.find((s) => s.id === selectedService);
    return service ? Math.round(hours * service.price) : 0;
  }, [startDate, endDate, selectedService, services]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPet) {
      toast.error("Please select a pet");
      return;
    }
    if (!selectedService) {
      toast.error("Please select a service");
      return;
    }
    if (!startDate || !endDate) {
      toast.error("Please pick start and end dates");
      return;
    }
    if (new Date(endDate).getTime() <= new Date(startDate).getTime()) {
      toast.error("End time must be after start time");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createBooking({
        sitterId: sitterUserId,
        petId: selectedPet,
        serviceId: selectedService,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        notes,
      });

      if (res?.success || res?.data) {
        toast.success("Booking request sent successfully! 🐾");
        router.push("/dashboard/bookings");
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to book service");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-sm space-y-5 sticky top-24">
      <div>
        <h3 className="text-xl font-bold text-foreground">Book This Sitter</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Select your pet and schedule to request care.
        </p>
      </div>

      <form onSubmit={handleBooking} className="space-y-4">
        {/* Pet Selection */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
            Select Your Pet *
          </label>
          {pets.length === 0 ? (
            <div className="p-3 bg-muted/50 rounded-xl border border-dashed border-border text-center space-y-2">
              <p className="text-xs text-muted-foreground">You have no registered pets.</p>
              <Link href="/dashboard/addPets">
                <Button size="sm" variant="outline" className="h-8 text-xs gap-1">
                  <Plus className="size-3" />
                  <span>Add a Pet First</span>
                </Button>
              </Link>
            </div>
          ) : (
            <select
              value={selectedPet}
              onChange={(e) => setSelectedPet(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-border bg-background text-foreground text-sm font-medium"
              required
            >
              {pets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.breed})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Service Selection */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
            Select Service *
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full h-11 px-3 rounded-xl border border-border bg-background text-foreground text-sm font-medium"
            required
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.serviceType} — ${s.price}/hr
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
            Start Date & Time *
          </label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full h-11 px-3 rounded-xl border border-border bg-background text-foreground text-sm"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
            End Date & Time *
          </label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full h-11 px-3 rounded-xl border border-border bg-background text-foreground text-sm"
            required
          />
        </div>

        {/* Care Notes */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
            Special Instructions
          </label>
          <Textarea
            rows={2}
            placeholder="Feeding schedules, walking preferences, or habits..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="rounded-xl resize-none text-xs"
          />
        </div>

        {/* Estimated Price */}
        {estimatedPrice > 0 && (
          <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-xl flex items-center justify-between text-orange-600 dark:text-orange-400">
            <span className="text-xs font-semibold">Total Estimated Price:</span>
            <span className="text-lg font-bold">${estimatedPrice}</span>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || pets.length === 0}
          className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Submitting Request...</span>
            </>
          ) : (
            <span>Send Booking Request</span>
          )}
        </Button>
      </form>
    </div>
  );
}