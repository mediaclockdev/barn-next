import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../ui/Button";
import { FaArrowCircleRight } from "react-icons/fa";

type Prop = {
  id: number;
  name: string;
  image: string;
  to: string;
};

const CategoryCard: React.FC<Prop> = ({ id, name, image, to }) => {
  return (
    <div className="rounded-xl bg-bg-light flex flex-col items-center justify-center p-3 pb-7 cursor-pointer">
      <div className="relative w-40 h-37.5 mb-4">
        <Image src={image} alt="image" fill className="object-contain" />
      </div>
      <div>
        <h4 className="text-center mb-2 font-semibold text-xl">{name}</h4>
        {/* <Link href={to}> */}
          <Button text="Shop Now" icon={FaArrowCircleRight} />
        {/* </Link> */}
      </div>
    </div>
  );
};

export default CategoryCard;
