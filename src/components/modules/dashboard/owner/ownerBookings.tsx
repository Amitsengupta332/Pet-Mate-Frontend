"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Calendar, PawPrint, XCircle, Loader2, Star, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cancelBooking } from "@/services/booking";
import { deleteReview } from "@/services/review";
import ReviewModal from "./reviewModal";

export interface IBooking {
  id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  notes?: string;
  pet?: {
    name: string;
    breed: string;
  };
  service?: {
    serviceType: string;
    price: number;
  };
  review?: {
    id: string;
    rating: number;
    comment: string;
  } | null;
}

export default function OwnerBookingsView({ bookings = [] }: { bookings: IBooking[] }) {
  const router = useRouter();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);

  // মোডাল স্টেট
  const [activeModalBookingId, setActiveModalBookingId] = useState<string | null>(null);
  const [editingReviewData, setEditingReviewData] = useState<{
    id: string;
    rating: number;
    comment: string;
  } | null>(null);

  // বুকিং ক্যান্সেল হ্যান্ডলার
  const handleCancel = (bookingId: string) => {
    toast("Cancel this booking?", {
      description: "Are you sure you want to cancel this pending booking?",
      action: {
        label: "Confirm Cancel",
        onClick: async () => {
          setCancellingId(bookingId);
          try {
            const res = await cancelBooking(bookingId);
            if (res?.success) {
              toast.success("Booking cancelled successfully!");
              router.refresh();
            } else {
              toast.error(res?.message || "Failed to cancel");
            }
          } catch {
            toast.error("Something went wrong!");
          } finally {
            setCancellingId(null);
          }
        },
      },
      cancel: { label: "Back", onClick: () => {} },
    });
  };

  // রিভিউ ডিলিট হ্যান্ডলার (Sonner Toast)
  const handleDeleteReview = (reviewId: string) => {
    toast("Delete this review?", {
      description: "Are you sure you want to remove your rating and feedback?",
      action: {
        label: "Delete",
        onClick: async () => {
          setDeletingReviewId(reviewId);
          try {
            const res = await deleteReview(reviewId);
            if (res?.success) {
              toast.success("Review deleted successfully!");
              router.refresh();
            } else {
              toast.error(res?.message || "Failed to delete review");
            }
          } catch {
            toast.error("Something went wrong!");
          } finally {
            setDeletingReviewId(null);
          }
        },
      },
      cancel: { label: "Cancel", onClick: () => {} },
    });
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">My Bookings</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage your scheduled pet care services.
          </p>
        </div>
        <Link href="/sitters">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-xs">
            Find More Sitters
          </Button>
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-border rounded-2xl bg-card/40">
          <Calendar className="size-10 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-bold text-foreground text-lg">No Bookings Yet</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            You have not booked any pet sitters yet.
          </p>
          <Link href="/sitters">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
              Browse Sitters
            </Button>
          </Link>
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
                  <div className="flex items-center gap-2">
                    <div className="size-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                      <PawPrint className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">
                        {b.pet?.name || "Pet"}
                      </h4>
                      <span className="text-xs text-muted-foreground">{b.pet?.breed}</span>
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
                    <span>{b.service?.serviceType || "Pet Care"}</span>
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
                    <div className="pt-1.5 text-foreground/80 italic">
                      &ldquo;{b.notes}&rdquo;
                    </div>
                  )}
                </div>

                {/* রিভিউ অংশ: রিভিউ দেওয়া থাকলে কার্ডে দেখাবে */}
                {b.review && (
                  <div className="mt-3 p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: b.review.rating }).map((_, i) => (
                          <Star key={i} className="size-3.5 fill-amber-500" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingReviewData(b.review!);
                            setActiveModalBookingId(b.id);
                          }}
                          className="text-xs text-blue-600 hover:underline flex items-center gap-0.5 p-1"
                        >
                          <Edit2 className="size-3" /> Edit
                        </button>
                        <button
                          type="button"
                          disabled={deletingReviewId === b.review.id}
                          onClick={() => handleDeleteReview(b.review!.id)}
                          className="text-xs text-red-600 hover:underline flex items-center gap-0.5 p-1"
                        >
                          {deletingReviewId === b.review.id ? (
                            <Loader2 className="size-3 animate-spin" />
                          ) : (
                            <Trash2 className="size-3" />
                          )}
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-foreground/80 italic">&ldquo;{b.review.comment}&rdquo;</p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="font-bold text-base text-foreground">
                  Total: <span className="text-orange-600">${b.totalPrice}</span>
                </span>

                <div className="flex items-center gap-2">
                  {b.status === "PENDING" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancel(b.id)}
                      disabled={cancellingId === b.id}
                      className="text-red-500 hover:text-red-600 border-red-200 hover:bg-red-50 rounded-xl text-xs gap-1.5"
                    >
                      {cancellingId === b.id ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <XCircle className="size-3.5" />
                      )}
                      <span>Cancel Request</span>
                    </Button>
                  )}

                  {/* যদি COMPLETED হয় এবং এখনো রিভিউ দেওয়া না হয়ে থাকে */}
                  {b.status === "COMPLETED" && !b.review && (
                    <Button
                      size="sm"
                      onClick={() => {
                        setEditingReviewData(null);
                        setActiveModalBookingId(b.id);
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs gap-1.5 shadow-xs"
                    >
                      <Star className="size-3.5 fill-white" />
                      <span>Leave Review</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {activeModalBookingId && (
        <ReviewModal
          bookingId={activeModalBookingId}
          existingReview={editingReviewData}
          isOpen={Boolean(activeModalBookingId)}
          onClose={() => {
            setActiveModalBookingId(null);
            setEditingReviewData(null);
          }}
        />
      )}
    </div>
  );
}