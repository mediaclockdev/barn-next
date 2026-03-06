import Image from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";
import Button from "../ui/Button";
import TextHeader from "@/src/utils/TextHeader";

const AboutSection = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 items-center bg-gray-100 rounded-2xl p-6 md:p-10 shadow-sm">
          {/* Left Image */}
          <div className="relative w-full h-87.5 md:h-105 overflow-hidden rounded-xl">
            <Image
              src="/images/about/aboutbg.jpg"
              alt="About Barn Pet Stock"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="">
            <TextHeader
              text="About"
              highlightedText="Us"
              btn={false}
              center={true}
              isGrid={true}
            />

            <div className=" z-10">
              <h4 className="text-3xl font-semibold mb-4 text-center">
                Barn Pet Stock and Feed
              </h4>

              <p className="text-gray-600 leading-relaxed mb-6 text-center">
                The Barn Pet Stock and Feed is a family-run business operating
                out of Heathcote since 2019. We strive to provide excellent
                customer service and be an active part of the Heathcote
                community. If we don’t have a product you need, feel free to ask
                — we’ll do our best to source it for you. Feel free to visit us,
                say hello, and meet our dogs and cats. We look forward to seeing
                you in store!
              </p>

              <div className="w-full flex items-center justify-center">
                <Button text="Learn More" icon={FaArrowCircleRight} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
