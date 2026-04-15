import CoreAbout from "@/src/components/about/CoreAbout";
import HeroAbout from "@/src/components/about/HeroAbout";
import StoryAbout from "@/src/components/about/StoryAbout";
import React from "react";

const page = () => {
  return (
    <div>
      <HeroAbout />
      <StoryAbout />
      <CoreAbout />
    </div>
  );
};

export default page;
