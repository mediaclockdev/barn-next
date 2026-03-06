import Image from "next/image";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import Button from "../ui/Button";
import { FaCircleArrowRight } from "react-icons/fa6";
import { productCardData } from "@/src/data/Data";
import ProductCard from "../cards/ProductCard";
import StayInTouch from "../misc/StayInTouch";

const ProductLayout = () => {
  return (
    <section className="min-h-dvh w-full px-4">
      <div className="container">
        {/* Product Card */}
        <div className="grid lg:grid-cols-2 gap-10 items-center  min-h-dvh">
          {/* Image */}
          <div className="p-10 border border-border-light rounded-xl ">
            <div className="relative w-full h-120 overflow-hidden rounded-xl">
              <Image
                src="/images/about/aboutBg.jpg"
                alt="About Barn Pet Stock"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <h4 className="text-4xl font-semibold mb-2">
              Barn Pet Stock and Feed
            </h4>
            <p className="text-text-light leading-relaxed mb-2">$13.50 AUD</p>
            <p className="text-text-light leading-relaxed mb-2">
              Tax Included Shipping calculated at checkout.
            </p>
            <div className="flex items-center gap-3 mb-2">
              <FaRegHeart size={16} />
              <IoShareSocialOutline size={18} />
            </div>
            <div className="text-yellow-500 mb-2">★★★★★</div>
            <Button text="Add to cart" icon={FaCircleArrowRight} />
          </div>
        </div>

        {/* Product Description  */}
        <div className=" my-16">
          <h4 className="text-4xl font-semibold mb-3">
            Product <span className="text-primary">Description</span>
          </h4>
          <p className="text-base">
            SavourLife Australian Peanut Butter Biscuits 500g. Quality dog
            treats crafted with real peanut butter. Delicious, natural biscuits
            for happy, healthy dogs.
          </p>
        </div>

        {/* You may also like  */}
        <div className=" min-h-dvh flex items-center justify-center flex-col">
          <h4 className="text-4xl font-semibold w-full text-center mb-6">
            You May <span className="text-primary">Also Like</span>
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-3">
            {productCardData.slice(0, 3).map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                price={item.price}
                image="/images/shop/shop1.png"
                title="Savourlife Australian Peanut Butter Biscuits"
                stars="★★★★"
              />
            ))}
          </div>
        </div>

        {/* Stay In Touch  */}
        <div className="my-6 max-w-4xl mx-auto min-h-[50vh] flex items-center">
          <StayInTouch />
        </div>
      </div>
    </section>
  );
};

export default ProductLayout;
