import Image from "next/image";
import Button from "../ui/Button";
import { FaArrowCircleRight } from "react-icons/fa";
import Link from "next/link";

type Props = {
  id: number;
  name: string;
  url: string;
  weight: number;
  price: number;
  actualPrice: number;
};

const OnSaleCard: React.FC<Props> = ({
  name,
  url,
  weight,
  price,
  actualPrice,
}) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 flex flex-col overflow-hidden h-full">
      {/* SALE BADGE */}
      <span className="absolute top-2 left-2 bg-primary text-white text-base font-semibold h-12 w-12 flex items-center justify-center rounded-full z-10">
        Sale
      </span>

      {/* IMAGE */}
      <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-6">
        <Image
          src={url}
          alt={name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-5 text-center bg-gray-200">
        <h4 className="font-semibold text-lg line-clamp-2 mb-1">{name}</h4>

        <p className="text-base text-text font-medium mb-2">{weight} kg Pack</p>

        <div className="mb-4">
          <span className="text-text-muted line-through mr-2 text-sm">
            ${price} AUD
          </span>

          <span className="text-primary font-bold text-lg">
            ${actualPrice} AUD
          </span>
        </div>

        <div className="mx-auto">
          <Link href={"/cart"}>
            <Button text="Add To Cart" icon={FaArrowCircleRight} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OnSaleCard;
