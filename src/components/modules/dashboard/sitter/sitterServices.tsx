"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Briefcase, Trash2, Loader2, DollarSign, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createService, deleteService } from "@/services/sitter";

interface ServiceItem {
  id: string;
  serviceType: string;
  price: number;
  description?: string;
}

const SERVICE_OPTIONS = ["WALKING", "BOARDING", "DAYCARE", "SITTING"];

export default function SitterServicesView({ services = [] }: { services: ServiceItem[] }) {
  const router = useRouter();
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [serviceType, setServiceType] = useState("WALKING");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!price || Number(price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createService({
        serviceType,
        price: Number(price),
        description,
      });

      if (res?.success || res?.data) {
        toast.success("Service added successfully! 🐾");
        setPrice("");
        setDescription("");
        setShowAddForm(false);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to add service");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteService = (service: ServiceItem) => {
    toast(`Delete ${service.serviceType}?`, {
      description: "Are you sure you want to remove this service offering?",
      action: {
        label: "Delete",
        onClick: async () => {
          setDeletingId(service.id);
          try {
            const res = await deleteService(service.id);
            if (res?.success) {
              toast.success("Service removed successfully!");
              router.refresh();
            } else {
              toast.error(res?.message || "Failed to delete service");
            }
          } catch {
            toast.error("Something went wrong!");
          } finally {
            setDeletingId(null);
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">My Services & Rates</h1>
          <p className="text-sm text-muted-foreground">Manage your offered pet care services and pricing.</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl gap-2 shadow-sm"
        >
          <Plus className="size-4" />
          <span>{showAddForm ? "Close Form" : "Add Service"}</span>
        </Button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreateService} className="bg-card border border-border p-5 sm:p-6 rounded-2xl shadow-xs space-y-4">
          <h3 className="font-bold text-foreground text-lg">Add New Offered Service</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                Service Type *
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-border bg-background text-foreground text-sm font-medium"
              >
                {SERVICE_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                Price Rate ($) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="e.g. 25"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="pl-9 h-11 rounded-xl"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
              Description (Optional)
            </label>
            <Textarea
              placeholder="Provide specific notes about what this service entails..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="rounded-xl resize-none"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : "Save Service"}
          </Button>
        </form>
      )}

      {services.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-border bg-card/50">
          <div className="size-16 rounded-2xl bg-orange-100 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center mb-4">
            <Briefcase className="size-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No services listed yet</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-6">
            You must add at least one service (e.g. Walking, Boarding) so pet owners can book you.
          </p>
          <Button onClick={() => setShowAddForm(true)} className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl gap-2">
            <Plus className="size-4" />
            <span>Add Service Offering</span>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-orange-500 flex items-center justify-center font-bold">
                      <Briefcase className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">{item.serviceType}</h4>
                      <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                        ${item.price} / session
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteService(item)}
                    disabled={deletingId === item.id}
                    className="h-8 w-8 text-red-500 hover:bg-red-50"
                  >
                    {deletingId === item.id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                  </Button>
                </div>

                {item.description && (
                  <p className="text-xs text-foreground/80 bg-muted/40 p-2.5 rounded-lg border border-border/40 mt-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}