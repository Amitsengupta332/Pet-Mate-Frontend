"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, X, CheckCircle2, PawPrint, Loader2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateBookingStatus } from "@/services/booking";

export interface ISitterBooking {
  id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  notes?: string;
  owner?: {
    name: string;
    email: string;
  };
  pet?: {
    name: string;
    breed: string;
  };
  service?: {
    serviceType: string;
    price: number;
  };
}

export default function SitterBookingsView({ bookings = [] }: { bookings: ISitterBooking[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusChange = async (
    bookingId: string,
    status: "CONFIRMED" | "CANCELLED" | "COMPLETED"
  ) => {
    setLoadingId(bookingId);
    try {
      const res = await updateBookingStatus(bookingId, status);
      if (res?.success) {
        toast.success(`Booking marked as ${status}!`);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update booking status");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400";
      case "COMPLETED":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400";
      case "CANCELLED":
        return "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400";
      default:
        return "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-border">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Manage Requests</h1>
        <p className="text-sm text-muted-foreground">
          Review, accept, or update booking requests from pet owners.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-border rounded-2xl bg-card/40">
          <Calendar className="size-10 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-bold text-foreground text-lg">No Booking Requests</h3>
          <p className="text-sm text-muted-foreground mt-1">
            You don’t have any booking requests right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-card border border-border p-5 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="size-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center font-bold">
                      <PawPrint className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">
                        {b.pet?.name} ({b.pet?.breed})
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        Owner: {b.owner?.name} ({b.owner?.email})
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusBadge(
                      b.status
                    )}`}
                  >
                    {b.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-muted-foreground pt-3 border-t border-border">
                  <div className="flex items-center justify-between text-foreground font-medium">
                    <span>Service:</span>
                    <span>{b.service?.serviceType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Start:</span>
                    <span>{new Date(b.startDate).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>End:</span>
                    <span>{new Date(b.endDate).toLocaleString()}</span>
                  </div>
                  {b.notes && (
                    <div className="pt-2 text-foreground/80 italic">
                      &ldquo;{b.notes}&rdquo;
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="font-bold text-base text-foreground">
                  Earnings: <span className="text-emerald-600">${b.totalPrice}</span>
                </span>

                <div className="flex items-center gap-2">
                  {/* PENDING State: Accept or Decline */}
                  {b.status === "PENDING" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(b.id, "CONFIRMED")}
                        disabled={loadingId === b.id}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs gap-1"
                      >
                        {loadingId === b.id ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          <Check className="size-3.5" />
                        )}
                        <span>Accept</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(b.id, "CANCELLED")}
                        disabled={loadingId === b.id}
                        className="text-red-500 hover:bg-red-50 border-red-200 rounded-xl text-xs gap-1"
                      >
                        <X className="size-3.5" />
                        <span>Decline</span>
                      </Button>
                    </>
                  )}

                  {/* CONFIRMED State: Mark as Completed */}
                  {b.status === "CONFIRMED" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(b.id, "COMPLETED")}
                      disabled={loadingId === b.id}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs gap-1.5"
                    >
                      {loadingId === b.id ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="size-3.5" />
                      )}
                      <span>Mark Complete</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}