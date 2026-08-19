import HeroCarousel from "@/components/modules/Home/hero";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import WhyChooseUs from "@/components/modules/Home/WhyChooseUs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <HeroCarousel />

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
