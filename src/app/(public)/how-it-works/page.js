import EMDRheroSection from "@/components/publicComponents/EMDRheroSection";
import HowEMDRWorks from "@/components/publicComponents/HowEMDRWorks";
import NeuroscienceSection from "@/components/publicComponents/NeuroscienceSection";
import TraumaHealingSection from "@/components/publicComponents/TraumaHealingSection";
import React from "react";

const Page = () => {
  return (
    <div>
      <EMDRheroSection />
      <HowEMDRWorks
      />
      <TraumaHealingSection />
      <NeuroscienceSection />
    </div>
  );
};

export default Page;
