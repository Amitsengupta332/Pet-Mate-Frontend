/* eslint-disable @typescript-eslint/no-explicit-any */
import HeroCarousel from "@/components/modules/Home/hero";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import WhyChooseUs from "@/components/modules/Home/WhyChooseUs";
import ServiceCard from "@/components/modules/service/ServiceCard";

import { getAllService } from "@/services/service";

export default async function Home() {
  const { data } = await getAllService();
  console.log(data);

  return (
    <div>
      <HeroCarousel />
      {/* our services */}
      {/* <ServiceCard service={}/> */}
      <div className="grid grid-cols-4 gap-5">
        {data?.map((s: any) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>

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
