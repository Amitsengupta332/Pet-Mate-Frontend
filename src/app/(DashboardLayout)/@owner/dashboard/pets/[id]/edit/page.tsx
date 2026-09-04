import EditPetForm from "@/components/modules/dashboard/owner/editpet";
import { getSinglePet } from "@/services/pet";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPetPage({ params }: PageProps) {
  const { id } = await params;
  const res = await getSinglePet(id);
  const pet = res?.data;

  if (!pet) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Pet not found!
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <EditPetForm pet={pet} />
    </div>
  );
}