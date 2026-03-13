import Image from "next/image";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import Button from "../ui/Button";
import { FaCircleArrowRight } from "react-icons/fa6";
import { productCardData } from "@/src/data/Data";
import ProductCard from "../cards/ProductCard";
import StayInTouch from "../misc/StayInTouch";
import BreadCrumb from "../misc/BreadCrumb";

const ProductLayout = () => {
  return (
    <section className="section !pt-2 overflow-hidden">
      <div className="container px-4 lg:px-0">
        <BreadCrumb />

        {/* Product Card */}
        <div className="grid lg:grid-cols-2 gap-10 items-start justify-center max-w-6xl mx-auto my-10">
          {/* Image */}
          <div className="p-4 border border-text-muted rounded-xl">
            <div className="relative w-full h-100 lg:h-120 overflow-hidden rounded-xl">
              <Image
                src="/images/deal/deal2.png"
                alt="About Barn Pet Stock"
                fill
                className="object-contain lg:object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3">
            <h4 className="text-4xl font-semibold ">
              Savour Life Australian Butter Biscuits
            </h4>
            <p className="text-text-light font-medium">$13.50 AUD</p>
            <p className="text-text-light">
              Tax Included Shipping calculated at checkout.
            </p>
            <div className="flex items-center gap-3">
              <FaRegHeart size={17} />
              <IoShareSocialOutline size={20} />
            </div>
            <p className="text-yellow-500 text-xl">★★★★★</p>
            <div className="flex gap-8 items-end">
              <div className="flex flex-col items-center gap-2">
                <p className="font-medium w-full text-start">Quantity</p>
                <div>
                  <button className="px-3 py-1 bg-[#D9D9D9] rounded-sm cursor-pointer">
                    -
                  </button>
                  <button className="px-3 py-1">1</button>
                  <button className="px-3 py-1 bg-[#D9D9D9] rounded-sm cursor-pointer">
                    +
                  </button>
                </div>
              </div>
              <Button text="Add to cart" icon={FaCircleArrowRight} />
            </div>
            <div className="mt-3 max-w-sm">
              <Button
                text="Buy With Shop"
                icon={FaCircleArrowRight}
                className="w-full justify-center"
              />
            </div>
          </div>
        </div>

        {/* Product Description  */}
        <div className="my-16 max-w-5xl mx-auto">
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
        <div className="halfSection">
          <div className="max-w-5xl mx-auto">
            <h4 className="text-4xl font-semibold w-full text-center mb-6">
              You May <span className="text-primary">Also Like</span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 pt-3">
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
        </div>

        {/* Stay In Touch  */}
        <StayInTouch />
      </div>
    </section>
  );
};

export default ProductLayout;
