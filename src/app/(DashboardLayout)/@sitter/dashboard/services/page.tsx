import SitterServicesView from "@/components/modules/dashboard/sitter/sitterServices";
import { getMySitterProfile } from "@/services/sitter";

export default async function SitterServicesPage() {
  const res = await getMySitterProfile();
  const services = res?.data?.sitterProfile?.services || [];

  return (
    <div className="p-4 sm:p-6">
      <SitterServicesView services={services} />
    </div>
  );
}