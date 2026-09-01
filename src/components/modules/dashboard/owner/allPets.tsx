"use client";

import React from "react";
import Link from "next/link";
import { Plus, PawPrint, Calendar, FileText, Sparkles, Dog } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface IPet {
  id: string;
  name: string;
  breed: string;
  age: string;
  notes?: string;
  createdAt: string;
}

export default function AllPetsView({ pets = [] }: { pets: IPet[] }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            My Pets
          </h1>
          <p className="text-sm text-muted-foreground">
            View and manage all your registered pets.
          </p>
        </div>
        <Link href="/dashboard/addPets">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl gap-2 shadow-sm">
            <Plus className="size-4" />
            <span>Add New Pet</span>
          </Button>
        </Link>
      </div>

      {/* Empty State */}
      {pets.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-border bg-card/50">
          <div className="size-16 rounded-2xl bg-orange-100 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center mb-4">
            <Dog className="size-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No pets added yet</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-6">
            Register your pet profile so you can easily book walkers and sitters.
          </p>
          <Link href="/dashboard/addPets">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl gap-2">
              <Plus className="size-4" />
              <span>Add Your First Pet</span>
            </Button>
          </Link>
        </div>
      ) : (
        /* Pets Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-card border border-border rounded-2xl p-5 shadow-xs hover:border-orange-200 dark:hover:border-orange-900/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-orange-500 flex items-center justify-center font-bold">
                      <PawPrint className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg leading-tight">
                        {pet.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                        <Sparkles className="size-3 text-orange-500" />
                        <span>{pet.breed}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400">
                    {pet.age}
                  </span>
                </div>

                {pet.notes && (
                  <div className="mt-3 pt-3 border-t border-border/60">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      <FileText className="size-3" />
                      <span>Care Notes</span>
                    </div>
                    <p className="text-xs text-foreground/80 bg-muted/40 p-2.5 rounded-lg border border-border/40 line-clamp-3 leading-relaxed">
                      {pet.notes}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  Added on {new Date(pet.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}