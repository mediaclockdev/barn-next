import HeroContact from "@/src/components/contact/HeroContact";
import ContactSection from "@/src/components/contact/InfoContact";
import Newsletter from "@/src/components/misc/NewsLetter";
import React from "react";

const page = () => {
  return (
    <div>
      <HeroContact />
      <ContactSection />
      <Newsletter />
    </div>
  );
};

export default page;
