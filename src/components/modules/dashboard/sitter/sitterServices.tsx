"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Briefcase, Trash2, Edit3, Loader2, DollarSign, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createService, updateService, deleteService } from "@/services/sitter";

export interface ServiceItem {
  id: string;
  serviceType: string;
  price: number;
  description?: string;
}

const SERVICE_OPTIONS = ["WALKING", "BOARDING", "DAYCARE", "SITTING"];

export default function SitterServicesView({ services = [] }: { services: ServiceItem[] }) {
  const router = useRouter();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [serviceType, setServiceType] = useState("WALKING");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Open Edit Mode
  const handleStartEdit = (service: ServiceItem) => {
    setEditingService(service);
    setServiceType(service.serviceType);
    setPrice(String(service.price));
    setDescription(service.description || "");
    setShowAddForm(false);
  };

  // Close Forms
  const handleResetForm = () => {
    setShowAddForm(false);
    setEditingService(null);
    setServiceType("WALKING");
    setPrice("");
    setDescription("");
  };

  // Submit Handler (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!price || Number(price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingService) {
        // Update Action
        const res = await updateService(editingService.id, {
          serviceType,
          price: Number(price),
          description,
        });

        if (res?.success || res?.data) {
          toast.success("Service updated successfully! 🐾");
          handleResetForm();
          router.refresh();
        } else {
          toast.error(res?.message || "Failed to update service");
        }
      } else {
        // Create Action
        const res = await createService({
          serviceType,
          price: Number(price),
          description,
        });

        if (res?.success || res?.data) {
          toast.success("Service created successfully! 🐾");
          handleResetForm();
          router.refresh();
        } else {
          toast.error(res?.message || "Failed to create service");
        }
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Handler with Sonner Toast
  const handleDeleteService = (service: ServiceItem) => {
    toast(`Delete ${service.serviceType}?`, {
      description: "Are you sure? This service offering will be permanently removed.",
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
        {!editingService && (
          <Button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingService(null);
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl gap-2 shadow-sm"
          >
            <Plus className="size-4" />
            <span>{showAddForm ? "Close Form" : "Add Service"}</span>
          </Button>
        )}
      </div>

      {/* Add / Edit Form Modal-like Section */}
      {(showAddForm || editingService) && (
        <form
          onSubmit={handleSubmit}
          className="bg-card border-2 border-orange-200 dark:border-orange-950/60 p-5 sm:p-6 rounded-2xl shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-foreground text-lg">
              {editingService ? "Edit Service Offering" : "Add New Offered Service"}
            </h3>
            <Button type="button" variant="ghost" size="icon" onClick={handleResetForm} className="size-8">
              <X className="size-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                Service Type *
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-border bg-background text-foreground text-sm font-medium focus:ring-1 focus:ring-orange-500"
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
                <DollarSign className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
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

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting} className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl">
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : editingService ? (
                "Update Service"
              ) : (
                "Save Service"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={handleResetForm} className="rounded-xl">
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Services List View */}
      {services.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-border bg-card/50">
          <div className="size-16 rounded-2xl bg-orange-100 dark:bg-orange-950/40 text-orange-500 flex items-center justify-center mb-4">
            <Briefcase className="size-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No services listed yet</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-6">
            You must add at least one service so pet owners can book you.
          </p>
          <Button onClick={() => setShowAddForm(true)} className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl gap-2">
            <Plus className="size-4" />
            <span>Add Service Offering</span>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-orange-200 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-orange-500 flex items-center justify-center font-bold">
                      <Briefcase className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">{item.serviceType}</h4>
                      <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                        ${item.price} / hour
                      </span>
                    </div>
                  </div>

                  {/* Actions: Edit & Delete */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleStartEdit(item)}
                      className="h-8 w-8 text-blue-500 hover:bg-blue-50"
                    >
                      <Edit3 className="size-4" />
                    </Button>
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
                </div>

                {item.description && (
                  <p className="text-xs text-foreground/80 bg-muted/40 p-2.5 rounded-lg border border-border/40 mt-2 line-clamp-3">
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