import React from "react";
import { Footprints, Home, Sun, Clock } from "lucide-react";

const categories = [
  {
    name: "Dog Walking",
    type: "WALKING",
    description: "Daily outdoor dog walking and physical exercise sessions.",
    icon: Footprints,
    bg: "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
  },
  {
    name: "Pet Boarding",
    type: "BOARDING",
    description: "Overnight pet care at the sitter's verified home location.",
    icon: Home,
    bg: "bg-purple-100 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
  },
  {
    name: "Pet Daycare",
    type: "DAYCARE",
    description: "Daytime supervision, play, and scheduled feeding for pets.",
    icon: Sun,
    bg: "bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
  },
  {
    name: "House Sitting",
    type: "SITTING",
    description: "Sitter stays at the owner's home to care for pets and the house.",
    icon: Clock,
    bg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
];

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="pb-6 border-b border-border">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Service Categories</h1>
        <p className="text-sm text-muted-foreground">
          Platform-supported pet care service types available for sitters and owners.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.type}
              className="bg-card border border-border p-5 rounded-2xl shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className={`size-12 rounded-xl flex items-center justify-center font-bold ${item.bg}`}>
                  <Icon className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base">{item.name}</h3>
                  <span className="text-[11px] font-mono uppercase bg-muted px-2 py-0.5 rounded text-muted-foreground">
                    {item.type}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-emerald-600 font-semibold">Active Status</span>
                <span className="text-muted-foreground">Enum Type</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}