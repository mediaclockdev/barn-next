import { FaArrowCircleRight, FaArrowRight } from "react-icons/fa";
import Button from "../ui/Button";

const StayInTouch = () => {
  return (
    <div className="py-16 max-w-5xl mx-auto min-h-[50vh] xl:min-h-[30vh] flex justify-center items-center px-4">
      <div className="w-full">
        <h2 className="text-4xl font-semibold mb-6">
          Let’s Stay In <span className="text-sky-500">Touch</span>
        </h2>

        <div className="flex items-center gap-3 mb-3 text-gray-700">
          <p className="font-medium">Enter Your Email Id</p>
          <FaArrowRight />
        </div>

        <input
          type="email"
          placeholder="john.doe@xyz.com"
          className="w-full border border-sky-400 rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-sky-400 bg-transparent max-w-md"
        />

        <div className="my-5">
          <Button text="Subscribe" icon={FaArrowCircleRight} />
        </div>
      </div>
    </div>
  );
};

export default StayInTouch;
