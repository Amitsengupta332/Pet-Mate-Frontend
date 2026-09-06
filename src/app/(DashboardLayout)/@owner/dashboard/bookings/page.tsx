import OwnerBookingsView from "@/components/modules/dashboard/owner/ownerBookings";
import { getMyBookings } from "@/services/booking";

export default async function OwnerBookingsPage() {
  const res = await getMyBookings();
  const bookings = res?.data || [];

  return (
    <div className="p-4 sm:p-6">
      <OwnerBookingsView bookings={bookings} />
    </div>
  );
}