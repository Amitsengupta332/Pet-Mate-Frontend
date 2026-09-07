import AllBookingsTable from "@/components/modules/dashboard/admin/allBookingsTable";
import { getAllBookingsAdmin } from "@/services/admin";

export default async function AdminBookingsPage() {
  const res = await getAllBookingsAdmin();
  const bookings = res?.data || [];

  return (
    <div className="p-4 sm:p-6">
      <AllBookingsTable bookings={bookings} />
    </div>
  );
}