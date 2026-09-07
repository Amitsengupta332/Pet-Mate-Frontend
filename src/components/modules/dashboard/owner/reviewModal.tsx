"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Star, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/services/review";

export default function ReviewModal({
  bookingId,
  isOpen,
  onClose,
}: {
  bookingId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please provide a short feedback comment");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createReview({
        bookingId,
        rating,
        comment,
      });

      if (res?.success || res?.data) {
        toast.success("Thank you for your feedback! ⭐");
        onClose();
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to submit review");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-card border border-border w-full max-w-md rounded-3xl p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Rate Your Sitter</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full size-8">
            <X className="size-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center justify-center gap-2 py-2">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`size-8 cursor-pointer transition-colors ${
                      (hoverRating || rating) >= star
                        ? "fill-amber-500 text-amber-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-semibold text-muted-foreground">
              {rating === 5 ? "Excellent! 🐾" : `${rating} out of 5 stars`}
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
              Your Review *
            </label>
            <Textarea
              rows={3}
              placeholder="How was the service? Did your pet enjoy the care?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="rounded-xl resize-none text-xs"
              required
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl"
            >
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : "Submit Review"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl h-11"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}