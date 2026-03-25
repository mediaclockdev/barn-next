import HeroContact from "@/src/components/contact/HeroContact";
import ContactSection from "@/src/components/contact/InfoContact";
import StayInTouch from "@/src/components/misc/StayInTouch";
import React from "react";

const page = () => {
  return (
    <div>
      <HeroContact />
      <ContactSection />
      <StayInTouch />
    </div>
  );
};

export default page ;
