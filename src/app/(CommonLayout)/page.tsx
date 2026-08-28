/* eslint-disable @typescript-eslint/no-explicit-any */
import HeroCarousel from "@/components/modules/Home/hero";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import WhyChooseUs from "@/components/modules/Home/WhyChooseUs";
import ServiceCard, { ServiceData } from "@/components/modules/service/ServiceCard";

import { getAllService } from "@/services/service";

export default async function Home() {
  const { data } = await getAllService();
  // console.log(data);

  return (
    <div>
      <HeroCarousel />
      {/* our services */}
      {/* <ServiceCard service={}/> */}
      {/* <div className="grid grid-cols-4 gap-5">
        {data?.slice(0, 4).map((s: any) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div> */}

      {/* Featured Services Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-3xl font-extrabold text-foreground">
              Our Featured <span className="text-orange-500">Services</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Explore top-rated pet care services provided by trusted local
              sitters.
            </p>
          </div>

          {data && data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {data.slice(0, 4).map((service: ServiceData) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground py-8">
              No services available right now.
            </p>
          )}
        </div>
      </section>

      {/* TODO:  //?later add new section */}

      {/* 
      TODO:
      section add later 
      1.our service
      2.Top-Rated Sitter
      3.Testimonial - add in below why choose us
      4.
       */}

      <HowItWorks />
      <WhyChooseUs />
    </div>
  );
}
