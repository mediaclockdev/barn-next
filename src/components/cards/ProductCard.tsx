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
    <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
      <Link href={`/shop/${id}`}>
        <div className="aspect-square rounded mb-4 flex items-center justify-center">
          <Image src={image} height={250} width={200} alt="shop" />
        </div>

        <h3 className="text-xl line-clamp-2 font-medium mb-2">{title}</h3>

        <div className="text-yellow-500 mb-2">★★★★★</div>

        {discountedPrice ? (
          <p className="font-semibold text-sm text-text-light">
            $ <span className="line-through">{price} AUD</span>{" "}
            {discountedPrice} AUD
          </p>
        ) : (
          <p className="font-semibold text-base text-text-light">
            $ {price} AUD
          </p>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;
