import Image from "next/image";
import Link from "next/link";
import React from "react";

type Prop = {
  title: string;
  price: string;
  id: number;
  image: string;
  discountedPrice?: string;
  stars?: string;
};

const ProductCard: React.FC<Prop> = ({
  title,
  price,
  id,
  discountedPrice,
  stars,
  image,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden h-full">
      <Link href={`/shop/${id}`} className="flex flex-col h-full">
        <div className="relative w-full aspect-square bg-gray-100">
          <Image src={image} alt={title} fill className="object-contain p-4" />
        </div>

        <div className="flex flex-col justify-between flex-1 p-4">
          <div>
            <h3 className="text-lg font-medium line-clamp-2 mb-2">{title}</h3>

            <div className="text-yellow-500 text-sm mb-2">★★★★★</div>
          </div>

          {discountedPrice ? (
            <p className="font-semibold text-sm text-gray-600">
              <span className="line-through mr-2">${price} AUD</span>$
              {discountedPrice} AUD
            </p>
          ) : (
            <p className="font-semibold text-gray-700">${price} AUD</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
