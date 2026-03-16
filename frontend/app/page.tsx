import PopularSection from "@/components/sections/home/PopularSection";
import SpecialOfferSection from "@/components/sections/home/SpecialOffer";
import TasteSection from "@/components/sections/home/TasteSection";
import TodaysSection from "@/components/sections/home/TodaysSection";
import WhyChooseSection from "@/components/sections/home/Why-Choose-Section";

export default function Home() {
  return (
    <>
      <WhyChooseSection />
      <SpecialOfferSection />
      <TodaysSection/> 
      <TasteSection/>
      <PopularSection/>
    </>
  );
}
