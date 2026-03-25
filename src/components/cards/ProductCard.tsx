"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../ui/Button";
import { FaStar, FaRegStar, FaCartPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCartStore } from "@/src/store/cartStore";
import toast from "react-hot-toast";

interface Prop {
  title: string;
  price: string | number;
  id: number | string;
  image: string;
  discountedPrice?: string | number;
  stars?: number;
  slug?: string;
}

const ProductCard: React.FC<Prop> = ({
  title,
  price,
  id,
  discountedPrice,
  stars = 5,
  image,
  slug,
}) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    addItem({
      id: Number(id),
      title,
      price: parseFloat(String(discountedPrice || price)),
      image,
      quantity: 1,
    });
    toast.success(`${title} added to cart!`);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) =>
      i < stars ? (
        <FaStar key={i} className="text-yellow-400 w-3.5 h-3.5" />
      ) : (
        <FaRegStar key={i} className="text-gray-300 w-3.5 h-3.5" />
      )
    );
  };

  const productLink = `/shop/${slug || id}`;

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100">
      {discountedPrice && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm tracking-wide">
          SALE
        </span>
      )}
      
      <Link href={productLink} className="flex flex-col flex-1 relative">
        {/* Image Hub */}
        <motion.div initial="hidden" whileHover="show" className="relative w-full aspect-square bg-gray-50/50 overflow-hidden border-b border-gray-100">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-6 md:p-8 transition-transform duration-500 group-hover:scale-110"
          />

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 bottom-4 hidden md:flex justify-center px-4"
          >
            <Button text="Add To Cart" icon={FaCartPlus} onClick={handleAddToCart} className="w-full justify-center shadow-md bg-opacity-95 bg-primary" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 p-4 md:p-5">
          <div>
            <div className="flex items-center gap-1 mb-2">
              {renderStars()}
            </div>
            <h3 className="text-sm md:text-base font-semibold text-gray-800 line-clamp-2 transition-colors group-hover:text-primary">
              {title}
            </h3>
          </div>

          <div className="mt-3 text-left">
            {discountedPrice ? (
              <p className="flex items-baseline gap-2 flex-wrap">
                <span className="text-gray-400 line-through text-xs md:text-sm font-medium">
                  ${Number(price).toFixed(2)}
                </span>
                <span className="text-primary font-bold text-base md:text-lg">
                  ${Number(discountedPrice).toFixed(2)} <span className="text-xs font-semibold">AUD</span>
                </span>
              </p>
            ) : (
              <p className="font-bold text-gray-800 text-base md:text-lg">
                ${Number(price).toFixed(2)} <span className="text-xs text-gray-500 font-semibold">AUD</span>
              </p>
            )}
          </div>

          <div className="mt-4 md:hidden">
            <Button text="Add" icon={FaCartPlus} onClick={handleAddToCart} className="w-full justify-center py-2 text-sm" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
