import SitterBookingsView from "@/components/modules/dashboard/sitter/sitterBookings";
import { getMyBookings } from "@/services/booking";

export default async function SitterBookingsPage() {
  const res = await getMyBookings();
  const bookings = res?.data || [];

  return (
    <div className="p-4 sm:p-6">
      <SitterBookingsView bookings={bookings} />
    </div>
  );
}