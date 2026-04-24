import TextHeader from "@/src/helper/TextHeader";
import Image from "next/image";
import React from "react";

const StoryAbout = () => {
  return (
    <section className="halfSection pb-4!">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center">
          <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-2xl group">
            <Image
              src="/images/about/about2.jpg"
              alt="aboutStory"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="max-w-xl flex flex-col lg:gap-5 lg:pl-6">
            <TextHeader
              text="Our"
              highlightedText="Story"
              isGrid={true}
              btn={false}
              center={true}
            />

            <div className="flex flex-col gap-5 mt-2">
              <p className="text-gray-600 text-lg">
                The Barn Pet Stock and Feed is a family‑run business proudly
                operating in Heathcote since 2019. We’re committed to providing
                excellent customer service and becoming a valued part of the
                local community.
              </p>
              <p className="text-gray-600 text-lg">
                We stock a wide range of products for farms, horses, and pets.
                If there’s something you need that we don’t currently have, just
                ask — we’re always happy to try and source it for you.
              </p>

              <p className="text-gray-800 font-medium  text-lg border-l-4 border-primary pl-4 py-1 mt-2">
                Feel free to drop in, say hello, and meet the dogs and cats. We
                hope to see you in store soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryAbout;
