import TextHeader from "@/src/utils/TextHeader";
import { FaTruckFast } from "react-icons/fa6";
import { FaHeadphones } from "react-icons/fa";
import { PiMedalFill } from "react-icons/pi";
import React from "react";

const CoreAbout = () => {
  const cardData = [
    {
      id: 1,
      icon: FaTruckFast,
      text: "Quick and reliable delivery to your barnyard or backyard",
    },
    {
      id: 2,
      icon: FaHeadphones,
      text: "Friendly & knowledgeable help whenever you need it",
    },
    {
      id: 3,
      icon: PiMedalFill,
      text: "Top-notch toys, food, and gear for your pets and farm",
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <TextHeader
            btn={false}
            text="Our"
            highlightedText="Core Values"
            center={true}
          />

          <p className="text-gray-600">
            Why choose The Barn? Here are a few reasons our customers love us:
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="border border-primary rounded-2xl p-10 flex flex-col items-center text-center gap-6 bg-gray-50 h-70 justify-center"
            >
              <card.icon size={60} />

              <p className="text-gray-700 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreAbout;
