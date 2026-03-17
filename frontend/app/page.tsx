import PopularSection from "@/components/sections/home/PopularSection";
import PromoBanners from "@/components/sections/home/PromoBanners";
import DeliverySection from "@/components/sections/home/DeliverySection";
import ChefsSection from "@/components/sections/home/ChefsSection";
import ReservationSection from "@/components/sections/home/ReservationSection";
import BlogSection from "@/components/sections/home/BlogSection";
import SpecialOfferSection from "@/components/sections/home/SpecialOffer";
import TasteSection from "@/components/sections/home/TasteSection";
import TodaysSection from "@/components/sections/home/TodaysSection";
import WhyChooseSection from "@/components/sections/home/Why-Choose-Section";

export default function Home() {
  return (
    <>
      <WhyChooseSection />
      <SpecialOfferSection />
      <TodaysSection />
      <TasteSection />
      <PopularSection />
      <PromoBanners />
      <DeliverySection />
      <ChefsSection />
      <ReservationSection />
      <BlogSection />
    </>
  );
}
