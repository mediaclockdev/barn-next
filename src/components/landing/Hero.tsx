import Image from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";
import Button from "../ui/Button";

const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center justify-center w-full overflow-hidden ">
      <div className="relative w-full">
        <div className="container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left z-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-16 text-gray-900">
              From <span className="text-primary">Barn</span> To{" "}
              <span className="text-primary">Backyard</span>
              <br />
              We Got You <span className="text-primary">Covered</span>
            </h1>

            <p className="my-6 text-text-light font-medium max-w-md mx-auto lg:mx-0">
              This is your one stop shop for your farming, animal feed and rural
              needs.
            </p>

            <Button text="Explore More" icon={FaArrowCircleRight} />
          </div>

          {/* Right Image */}
          <div className="flex-1 relative">
            <Image
              src="/images/hero/hero.png" // your hero image
              alt="Hero"
              width={700}
              height={500}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Torn Bottom Effect */}
        <div className="absolute bottom-0 left-0 w-full z-1">
          <Image
            src="/images/hero/torn1.png" // your torn image
            alt="Torn Effect"
            width={1920}
            height={200}
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
