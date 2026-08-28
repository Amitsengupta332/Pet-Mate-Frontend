import ServiceCard, { ServiceData } from "@/components/modules/service/ServiceCard";
import { getAllService } from "@/services/service";

const ServicesPage = async () => {
  const { data } = await getAllService();

  return (
    <div className="py-10 bg-background min-h-[80vh]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-foreground">
            All <span className="text-orange-500">Services</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Choose from our full range of professional pet sitting and walking services.
          </p>
        </div>

        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {data.map((service: ServiceData) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-2xl border border-orange-100">
            <p className="text-muted-foreground text-sm">No services found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;