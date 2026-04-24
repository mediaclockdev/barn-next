import CoreAbout from "@/src/components/about/CoreAbout";
import HeroAbout from "@/src/components/about/HeroAbout";
import StoryAbout from "@/src/components/about/StoryAbout";
import TopBanner from "@/src/components/ui/TopBanner";
import React from "react";

const page = () => {
  return (
    <div>
      <TopBanner />
      <HeroAbout />
      <StoryAbout />
      <CoreAbout />
    </div>
  );
};

export default page;
