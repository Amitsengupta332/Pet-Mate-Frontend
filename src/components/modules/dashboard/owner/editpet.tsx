/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Dog, PawPrint, Sparkles, FileText, ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { updatePet } from "@/services/pet";

const petSchema = z.object({
  name: z.string().min(2, "Pet name must be at least 2 characters"),
  breed: z.string().min(2, "Breed is required"),
  age: z.string().min(1, "Age is required"),
  notes: z.string().optional(),
});

type PetFormData = z.infer<typeof petSchema>;

export default function EditPetForm({ pet }: { pet: any }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: pet?.name || "",
      breed: pet?.breed || "",
      age: pet?.age || "",
      notes: pet?.notes || "",
    },
  });

  async function onSubmit(data: PetFormData) {
    setIsLoading(true);
    try {
      const res = await updatePet(pet.id, data);
      if (res?.success || res?.data) {
        toast.success("Pet updated successfully! 🐾");
        router.push("/dashboard/pets");
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update pet");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-4">
      <Link
        href="/dashboard/pets"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="size-4" />
        <span>Back to My Pets</span>
      </Link>

      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
          <div className="size-12 rounded-2xl bg-orange-100 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center font-bold shrink-0">
            <Dog className="size-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Edit Pet Profile
            </h1>
            <p className="text-sm text-muted-foreground">
              Update details for {pet?.name}
            </p>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup className="space-y-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="pet-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Pet Name *
                  </FieldLabel>
                  <div className="relative mt-1">
                    <PawPrint className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                    <Input {...field} id="pet-name" className="pl-10 h-11 rounded-xl" aria-invalid={fieldState.invalid} />
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="breed"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="pet-breed" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Breed / Species *
                    </FieldLabel>
                    <div className="relative mt-1">
                      <Sparkles className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                      <Input {...field} id="pet-breed" className="pl-10 h-11 rounded-xl" aria-invalid={fieldState.invalid} />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="age"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="pet-age" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Age *
                    </FieldLabel>
                    <Input {...field} id="pet-age" className="mt-1 h-11 rounded-xl" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="notes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="pet-notes" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Care Instructions (Optional)
                  </FieldLabel>
                  <div className="relative mt-1">
                    <FileText className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                    <Textarea {...field} id="pet-notes" rows={3} className="pl-10 rounded-xl resize-none" />
                  </div>
                </Field>
              )}
            />
          </FieldGroup>

          <Button type="submit" disabled={isLoading} className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
            {isLoading ? <><Loader2 className="size-4 animate-spin" /><span>Saving...</span></> : <span>Update Pet</span>}
          </Button>
        </form>
      </div>
    </div>
  );
}