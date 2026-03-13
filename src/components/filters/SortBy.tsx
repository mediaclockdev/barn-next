import Image from "next/image";
import React from "react";
import { FaAngleDown } from "react-icons/fa6";

const SortBy = () => {
  return (
    <div className="bg-primary-light px-6 py-3 rounded mb-8 flex justify-center items-center relative">
      <div className="absolute right-10 bottom-1/2 hidden lg:block">
        <Image alt="Cat" src={"/images/catdog.png"} width={200} height={200} />
      </div>
      <div className="flex items-center gap-3 text-sm">
        <span className="text-base">Sort By:</span>

        <div className="relative">
          <select className="border pl-3 pr-10 py-1 rounded bg-white appearance-none cursor-pointer">
            <option>Featured</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
          </select>

          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none">
            <FaAngleDown size={13} className="" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SortBy;
