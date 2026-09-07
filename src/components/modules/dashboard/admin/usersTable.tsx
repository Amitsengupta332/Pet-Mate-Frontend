"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShieldAlert, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateUserStatus } from "@/services/admin";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "SITTER" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
  createdAt: string;
}

export default function UsersTable({ users = [] }: { users: IUser[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleToggleStatus = async (user: IUser) => {
    const newStatus = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    setLoadingId(user.id);
    try {
      const res = await updateUserStatus(user.id, newStatus);
      if (res?.success || res?.data) {
        toast.success(`User marked as ${newStatus}!`);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-border">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          User Management
        </h1>
        <p className="text-sm text-muted-foreground">
          View all registered pet owners and sitters, manage account status.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground uppercase tracking-wider text-xs border-b border-border">
              <tr>
                <th className="px-5 py-3.5">User</th>
                <th className="px-5 py-3.5">Role</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Joined</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-foreground">
                      {u.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {u.email}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-muted uppercase tracking-wider">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        u.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                          : "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-muted-foreground">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {u.role !== "ADMIN" && (
                      <Button
                        size="sm"
                        variant={u.status === "ACTIVE" ? "outline" : "default"}
                        onClick={() => handleToggleStatus(u)}
                        disabled={loadingId === u.id}
                        className={`rounded-xl text-xs gap-1.5 cursor-pointer ${
                          u.status === "ACTIVE"
                            ? "text-red-600 hover:bg-red-50 border-red-200"
                            : "bg-emerald-600 hover:bg-emerald-700 text-white"
                        }`}
                      >
                        {loadingId === u.id ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : u.status === "ACTIVE" ? (
                          <ShieldAlert className="size-3.5" />
                        ) : (
                          <ShieldCheck className="size-3.5" />
                        )}
                        <span>
                          {u.status === "ACTIVE" ? "Suspend" : "Activate"}
                        </span>
                      </Button>
                    )}
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
