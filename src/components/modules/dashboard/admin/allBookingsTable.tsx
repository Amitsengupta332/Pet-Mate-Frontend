import React from "react";
import { Calendar, PawPrint } from "lucide-react";

export interface IAdminBooking {
  id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  owner?: { name: string; email: string };
  pet?: { name: string; breed: string };
  service?: { serviceType: string; price: number };
}

export default function AllBookingsTable({ bookings = [] }: { bookings: IAdminBooking[] }) {
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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">All Bookings</h1>
        <p className="text-sm text-muted-foreground">
          Real-time overview of all pet sitting bookings placed on PetMate.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground uppercase tracking-wider text-xs border-b border-border">
              <tr>
                <th className="px-5 py-3.5">Pet & Owner</th>
                <th className="px-5 py-3.5">Service</th>
                <th className="px-5 py-3.5">Schedule</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-foreground">{b.pet?.name || "Pet"}</div>
                    <div className="text-xs text-muted-foreground">{b.owner?.name} ({b.owner?.email})</div>
                  </td>
                  <td className="px-5 py-4 font-medium text-foreground">
                    {b.service?.serviceType || "Pet Care"}
                  </td>
                  <td className="px-5 py-4 text-xs text-muted-foreground">
                    <div>Start: {new Date(b.startDate).toLocaleDateString()}</div>
                    <div>End: {new Date(b.endDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-5 py-4 font-bold text-foreground">
                    ${b.totalPrice}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusBadge(b.status)}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}