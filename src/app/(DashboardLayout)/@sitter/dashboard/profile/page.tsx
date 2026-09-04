import SitterProfileForm from "@/components/modules/dashboard/sitter/sitterProfileForm";
import { getMySitterProfile } from "@/services/sitter";

export default async function SitterProfilePage() {
  const res = await getMySitterProfile();
  const profile = res?.data?.sitterProfile || null;

  return (
    <div className="p-4 sm:p-6">
      <SitterProfileForm profile={profile} />
    </div>
  );
}