import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Button from "../ui/Button";
import TextHeader from "@/src/helper/TextHeader";
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
                isGrid={true}
                center={true}
                lgCenter={false}
              />
            </div>

            <div className="z-10 mt-2">
              <div className="text-gray-600 leading-relaxed mb-8 text-base md:text-lg max-w-lg flex flex-col gap-4">
                <p>
                  The Barn Pet Stock and Feed is a family‑run business proudly
                  operating in Heathcote since 2019. We’re committed to
                  providing excellent customer service and becoming a valued
                  part of the local community.
                </p>
                <p>
                  We stock a wide range of products for farms, horses, and pets.
                  If there’s something you need that we don’t currently have,
                  just ask — we’re always happy to try and source it for you.
                </p>
                <p>
                  Feel free to drop in, say hello, and meet the dogs and cats.
                  We hope to see you in store soon.
                </p>
              </div>

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
