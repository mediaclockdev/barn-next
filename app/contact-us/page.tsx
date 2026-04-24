import HeroContact from "@/src/components/contact/HeroContact";
import ContactSection from "@/src/components/contact/InfoContact";
import TopBanner from "@/src/components/ui/TopBanner";
import React from "react";

const page = () => {
  return (
    <div>
      <TopBanner />
      <HeroContact />
      <ContactSection />
    </div>
  );
};

export default page;
