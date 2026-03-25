"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaStar, FaRegStar, FaCartPlus } from "react-icons/fa";
import Button from "../ui/Button";
import { productCardData } from "@/src/data/Data";
import ProductCard from "../cards/ProductCard";
import StayInTouch from "../misc/StayInTouch";
import BreadCrumb from "../misc/BreadCrumb";
import { useCartStore } from "@/src/store/cartStore";
import toast from "react-hot-toast";

interface ProductLayoutProps {
  id?: number | string;
  title?: string;
  price?: number;
  image?: string;
  description?: string;
  stars?: number;
}

const ProductLayout: React.FC<ProductLayoutProps> = ({
  id = 999,
  title = "Savour Life Australian Butter Biscuits",
  price = 13.5,
  image = "/images/deal/deal2.png",
  description = "SavourLife Australian Peanut Butter Biscuits 500g. Quality dog treats crafted with real peanut butter. Delicious, natural biscuits for happy, healthy dogs.",
  stars = 5,
}) => {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 20) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: Number(id),
      title,
      price,
      image,
      quantity,
    });
    toast.success(`${title} added to cart!`);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) =>
      i < stars ? (
        <FaStar key={i} className="text-yellow-400 w-5 h-5" />
      ) : (
        <FaRegStar key={i} className="text-gray-300 w-5 h-5" />
      ),
    );
  };

  return (
    <section className="section pt-2! overflow-hidden">
      <div className="container px-4 lg:px-0">
        <BreadCrumb />

        {/* Product Card */}
        <div className="grid lg:grid-cols-2 gap-10 items-start justify-center max-w-6xl mx-auto my-10">
          {/* Image Hub */}
          <div className="p-6 border border-gray-200 rounded-2xl bg-gray-50/50 flex items-center justify-center shadow-sm">
            <div className="relative w-full aspect-square overflow-hidden rounded-xl">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4 lg:py-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex">{renderStars()}</div>
              <span className="text-sm text-gray-500 font-medium ml-2">
                (12 Reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <p className="text-primary font-bold text-3xl">
                ${price.toFixed(2)}{" "}
                <span className="text-lg text-gray-400 font-semibold">AUD</span>
              </p>
            </div>

            <p className="text-sm text-gray-500">
              Tax Included. Shipping calculated at checkout.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap md:flex-nowrap gap-6 items-end mt-4">
              <div className="flex flex-col items-start gap-3 w-fit">
                <p className="font-semibold text-gray-700">Quantity</p>
                <div className="flex items-center border border-gray-300 rounded-full bg-white h-12">
                  <button
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                    className="w-12 h-full flex items-center justify-center text-xl hover:bg-gray-100 rounded-l-full disabled:opacity-50 transition cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncreaseQuantity}
                    disabled={quantity >= 20}
                    className="w-12 h-full flex items-center justify-center text-xl hover:bg-gray-100 rounded-r-full disabled:opacity-50 transition cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full flex flex-col gap-3 min-w-[200px]">
                <Button
                  text="Add to Cart"
                  icon={FaCartPlus}
                  onClick={handleAddToCart}
                  className="w-full justify-center h-12 text-lg shadow-md"
                />
              </div>
            </div>

            <div className="mt-2 w-full">
              <Button
                text="Buy It Now"
                className="w-full justify-center h-12 text-lg bg-gray-900 hover:bg-gray-800 shadow-md"
                disabled={true}
              />
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="my-20 max-w-5xl mx-auto border-t border-gray-200 pt-16">
          <h4 className="text-3xl font-bold mb-6 text-gray-900">
            Product <span className="text-primary">Description</span>
          </h4>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>

        {/* You may also like */}
        <div className="halfSection bg-gray-50/50 rounded-3xl py-12 mb-16">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 w-full">
            <h4 className="text-3xl font-bold w-full text-center mb-10">
              You May <span className="text-primary">Also Like</span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
              {productCardData.slice(0, 3).map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  price={item.price}
                  image="/images/shop/shop1.png"
                  title="Savourlife Australian Peanut Butter Biscuits"
                  stars={4}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stay In Touch */}
        <StayInTouch />
      </div>
    </section>
  );
};

export default ProductLayout;
