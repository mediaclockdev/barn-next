import CoreAbout from "@/src/components/about/CoreAbout";
import CustomerAbout from "@/src/components/about/CustomerAbout";
import HeroAbout from "@/src/components/about/HeroAbout";
import StoryAbout from "@/src/components/about/StoryAbout";
import Newsletter from "@/src/components/misc/NewsLetter";
import StayInTouch from "@/src/components/misc/StayInTouch";
import React from "react";

const page = () => {
  return (
    <div>
      <HeroAbout />
      <StoryAbout />
      <CoreAbout />
      <CustomerAbout />
      {/* <StayInTouch /> */}
      <Newsletter />
    </div>
  );
};

export default page;
