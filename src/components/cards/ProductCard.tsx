"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../ui/Button";
import { FaArrowCircleRight } from "react-icons/fa";
import { motion } from "framer-motion";

interface Prop {
  title: string;
  price: string;
  id: number;
  image: string;
  discountedPrice?: string;
  stars?: string;
}

const ProductCard: React.FC<Prop> = ({
  title,
  price,
  id,
  discountedPrice,
  stars,
  image,
}) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden h-full">
      <Link href={`/shop/${id}`} className="flex flex-col h-full relative">
        {/* Image */}
        <motion.div initial="hidden" whileHover="show">
          <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width:768px) 100vw, 25vw"
              className="object-contain p-4 md:p-6 transition-transform duration-300 group-hover:scale-105"
            />

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-0 bottom-4 hidden md:flex justify-center"
            >
              <Button text="Add To Cart" icon={FaArrowCircleRight} />
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between flex-1 p-3 md:p-4">
            <div>
              <h3 className="text-sm md:text-base lg:text-lg font-medium line-clamp-2 mb-1 md:mb-2">
                {title}
              </h3>

              <div className="text-yellow-500 text-sm mb-2">★★★★★</div>
            </div>

            {discountedPrice ? (
              <p className="text-primary font-bold text-base md:text-lg">
                <span className="text-gray-400 line-through mr-2 text-xs md:text-sm">
                  ${price} AUD
                </span>
                ${discountedPrice} AUD
              </p>
            ) : (
              <p className="font-semibold text-gray-700 text-sm md:text-base">
                ${price} AUD
              </p>
            )}

            <div className="mt-3 md:hidden">
              <Button text="Cart" icon={FaArrowCircleRight} />
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default ProductCard;
