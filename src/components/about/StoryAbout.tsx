import TextHeader from "@/src/helper/TextHeader";
import Image from "next/image";
import React from "react";

const StoryAbout = () => {
  return (
    <section className="halfSection">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative w-full hidden lg:block lg:h-[550px] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] group">
            <Image
              src="/images/about/horse.jpg"
              alt="Horse"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[50%_20%] transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="max-w-xl flex flex-col gap-5 lg:pl-6">
            <TextHeader
              text="Our"
              highlightedText="Story"
              isGrid={true}
              btn={false}
              center={false}
            />

            <div className="flex flex-col gap-5 mt-2">
              <p className="text-gray-600 leading-[1.8] text-lg">
                Since 2010, The Barn has been dedicated to caring for the
                animals that mean the most to you. What started as a small
                passion for barnyard companions has grown into a trusted
                destination for high-quality pet and farm supplies.
              </p>

              <p className="text-gray-600 leading-[1.8] text-lg">
                We’re committed to offering carefully selected products with
                genuine care and personal service. Whether you have playful
                pups, curious cats, or hardworking horses, we’re here to support
                every step of your journey.
              </p>

              <p className="text-gray-800 font-medium leading-[1.8] text-lg border-l-4 border-primary pl-4 py-1 mt-2">
                Join The Barn family and give your animals the quality they
                deserve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryAbout;
