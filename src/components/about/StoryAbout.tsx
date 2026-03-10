import TextHeader from "@/src/utils/TextHeader";
import Image from "next/image";
import React from "react";

const StoryAbout = () => {
  return (
    <section className="min-h-screen flex items-center justify-center ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center lg:items-start">
        {/* Image */}
        <div className="relative w-full h-125">
          <Image
            src="/images/about/horse.jpg"
            alt="Horse"
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        {/* Content */}
        <div className="max-w-xl flex flex-col gap-4">
          <TextHeader text="Our" highlightedText="Story" isGrid={true} btn={false} />

          <p className=" text-gray-600 leading-relaxed text-lg">
            Since 2010, The Barn has been dedicated to caring for the animals
            that mean the most to you. What started as a small passion for
            barnyard companions has grown into a trusted destination for
            high-quality pet and farm supplies.
          </p>

          <p className=" text-gray-600 leading-relaxed text-lg">
            We’re committed to offering carefully selected products with genuine
            care and personal service. Whether you have playful pups, curious
            cats, or hardworking horses, we’re here to support every step of
            your journey.
          </p>

          <p className=" text-gray-600 leading-relaxed text-lg">
            Join The Barn family and give your animals the quality they deserve.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StoryAbout;
