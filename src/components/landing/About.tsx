import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Button from "../ui/Button";
import TextHeader from "@/src/utils/TextHeader";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section className="halfSection">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center bg-white rounded-3xl p-6 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          {/* Left Image */}
          <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-2xl shadow-lg group">
            <Image
              src="/images/about/aboutbg.jpg"
              alt="About Barn Pet Stock"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-full flex justify-center md:justify-start">
              <TextHeader
                text="About"
                highlightedText="Us"
                btn={false}
                center={false}
                isGrid={true}
              />
            </div>

            <div className="z-10 mt-2">
              <h4 className="text-2xl md:text-3xl font-bold mb-5 text-gray-900">
                Barn Pet Stock and Feed
              </h4>

              <p className="text-gray-600 leading-relaxed mb-8 text-base md:text-lg max-w-lg">
                The Barn Pet Stock and Feed is a family-run business operating
                out of Heathcote since 2019. We strive to provide excellent
                customer service and be an active part of the Heathcote
                community. If we don’t have a product you need, feel free to ask
                — we’ll do our best to source it for you. Feel free to visit us,
                say hello, and meet our dogs and cats. We look forward to seeing
                you in store!
              </p>

              <div className="w-full flex items-center justify-center md:justify-start">
                <Link href="/about-us">
                  <Button text="Learn More" icon={FaArrowRight} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
