import { FaArrowCircleRight } from "react-icons/fa";
import Button from "../ui/Button";

const StayInTouch = () => {
  return (
    <section className="halfSection">
      <div className="container bg-gray-200 p-5 py-12 pb-16 rounded-lg">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Stay in Touch</h2>

          <p className="text-text-light mb-12">
            Stay updated with the latest offers, news, and updates from us.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3  w-full flex-wrap">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-md text-black bg-white outline-none max-w-md"
            />

            <Button text="Subscribe" icon={FaArrowCircleRight} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayInTouch;
