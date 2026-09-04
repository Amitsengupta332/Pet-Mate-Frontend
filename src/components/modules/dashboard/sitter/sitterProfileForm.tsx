/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  User,
  Briefcase,
  DollarSign,
  FileText,
  Loader2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { saveSitterProfile } from "@/services/sitter";

const profileSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  experience: z.string().min(2, "Experience is required (e.g. 3 years)"),
  hourlyRate: z.coerce.number().min(1, "Hourly rate must be at least $1"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function SitterProfileForm({ profile }: { profile: any }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isExisting = Boolean(profile?.id);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: profile?.bio || "",
      experience: profile?.experience || "",
      hourlyRate: profile?.hourlyRate || 20,
    },
  });

  async function onSubmit(data: ProfileFormData) {
    setIsLoading(true);
    try {
      const res = await saveSitterProfile({ ...data, isUpdate: isExisting });
      if (res?.success || res?.data) {
        toast.success(
          isExisting
            ? "Profile updated successfully!"
            : "Profile created successfully!",
        );
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to save profile");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
          <div className="size-12 rounded-2xl bg-orange-100 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center font-bold shrink-0">
            <User className="size-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {isExisting ? "Edit Sitter Profile" : "Setup Sitter Profile"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Provide information so pet owners can know you better.
            </p>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="experience"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="exp"
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Experience *
                    </FieldLabel>
                    <div className="relative mt-1">
                      <Briefcase className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                      <Input
                        {...field}
                        id="exp"
                        placeholder="e.g. 3 years"
                        className="pl-10 h-11 rounded-xl"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="hourlyRate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="rate"
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Base Hourly Rate ($) *
                    </FieldLabel>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                      <Input
                        {...field}
                        id="rate"
                        type="number"
                        placeholder="25"
                        className="pl-10 h-11 rounded-xl"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="bio"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="bio"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    About / Bio *
                  </FieldLabel>
                  <div className="relative mt-1">
                    <FileText className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                    <Textarea
                      {...field}
                      id="bio"
                      rows={4}
                      placeholder="Tell owners about your love for animals, routine, and care methods..."
                      className="pl-10 rounded-xl resize-none"
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Saving Profile...</span>
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                <span>{isExisting ? "Update Profile" : "Create Profile"}</span>
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
