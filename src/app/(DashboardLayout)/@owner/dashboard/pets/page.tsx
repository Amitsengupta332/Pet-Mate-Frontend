import AllPetsView from "@/components/modules/dashboard/owner/allPets";
import { getMyPets } from "@/services/pet";

export default async function AllPetsPage() {
  const res = await getMyPets();
  const pets = res?.data || [];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <AllPetsView pets={pets} />
    </div>
  );
}