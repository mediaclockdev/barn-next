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
  images?: any[];
  description?: string;
  stars?: number;
  type?: string;
  attributes?: any[];
  variations?: any[];
  stockStatus?: string;
}

const ProductLayout: React.FC<ProductLayoutProps> = ({
  id = 999,
  title = "N/A",
  price = 0,
  image = "/images/deal/deal2.png",
  images,
  description = "No description available",
  stars = 0,
  type = "simple",
  attributes = [],
  variations = [],
  stockStatus = "instock",
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    images?.[0]?.src || image,
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [currentVariation, setCurrentVariation] = useState<any>(null);

  const addItem = useCartStore((state) => state.addItem);

  const displayPrice = currentVariation
    ? parseFloat(
        currentVariation.price || currentVariation.regular_price || price,
      )
    : price;
  const currentId = currentVariation ? currentVariation.id : id;
  const isOutOfStock = currentVariation
    ? currentVariation.stock_status === "outofstock"
    : stockStatus === "outofstock";

  React.useEffect(() => {
    setSelectedImage(images?.[0]?.src || image);
  }, [id, image, images]);

  // Set default attributes for variable products
  React.useEffect(() => {
    if (type === "variable" && attributes && attributes.length > 0) {
      const initialAttrs: Record<string, string> = {};
      attributes.forEach((attr) => {
        if (attr.options && attr.options.length > 0) {
          initialAttrs[attr.name] = attr.options[0];
        }
      });
      setSelectedAttributes(initialAttrs);
    }
  }, [type, attributes]);

  // Match current variation
  React.useEffect(() => {
    if (type === "variable" && variations && variations.length > 0) {
      const matched = variations.find((v) => {
        if (!v.attributes) return false;

        // Support WooCommerce Array format: [{ id: 0, name: "pa_colour", option: "red" }]
        if (Array.isArray(v.attributes)) {
          return v.attributes.every((attrItem: any) => {
            const nameKey = attrItem.name || "";
            const possibleKeys = [
              nameKey,
              nameKey.replace("pa_", ""),
              `pa_${nameKey}`,
            ].map((k) => String(k).toLowerCase());

            // Look for matching key in selectedAttributes
            const selectedEntry = Object.entries(selectedAttributes).find(
              ([k]) => possibleKeys.includes(String(k).toLowerCase()),
            );
            const selectedVal = selectedEntry ? selectedEntry[1] : "";
            const option = attrItem.option || "";

            // Normalize spaces/dashes since WooCommerce slugs down options (e.g., "Big Red" -> "big-red")
            const normSelected = String(selectedVal)
              .replace(/\s+/g, "-")
              .toLowerCase();
            const normOption = String(option)
              .replace(/\s+/g, "-")
              .toLowerCase();

            return (
              normSelected === normOption ||
              String(selectedVal).toLowerCase() === String(option).toLowerCase()
            );
          });
        }

        // Support string/object Map fallback: { "pa_colour": "red" }
        return Object.entries(v.attributes).every(([key, value]) => {
          const possibleKeys = [key, key.replace("pa_", ""), `pa_${key}`].map(
            (k) => String(k).toLowerCase(),
          );
          const selectedEntry = Object.entries(selectedAttributes).find(([k]) =>
            possibleKeys.includes(String(k).toLowerCase()),
          );
          const selectedVal = selectedEntry ? selectedEntry[1] : "";

          const normSelected = String(selectedVal)
            .replace(/\s+/g, "-")
            .toLowerCase();
          const normValue = String(value).replace(/\s+/g, "-").toLowerCase();

          return (
            normSelected === normValue ||
            String(selectedVal).toLowerCase() === String(value).toLowerCase()
          );
        });
      });

      setCurrentVariation(matched || null);

      if (matched && matched.image) {
        const imgUrl =
          typeof matched.image === "string"
            ? matched.image
            : "src" in matched.image
              ? matched.image.src
              : matched.image?.src;

        if (imgUrl) {
          setSelectedImage(imgUrl);
        } else {
          setSelectedImage(images?.[0]?.src || image);
        }
      } else {
        setSelectedImage(images?.[0]?.src || image);
      }
    }
  }, [selectedAttributes, variations, type]);

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

  const handleAddToCart = async () => {
    if (isOutOfStock) return;
    try {
      await addItem(Number(id), quantity);
      toast.success(`${title} added to cart!`);
    } catch {
      toast.error("Failed to add item to cart");
    }
  };

  const handleAttributeChange = (name: string, val: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [name]: val }));
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
          <div className="flex flex-col gap-4 relative">
            {isOutOfStock && (
              <span className="absolute top-4 left-4 bg-gray-800 text-white text-xs md:text-sm font-bold px-4 py-2 rounded-full z-10 shadow-sm tracking-wide uppercase">
                Out of Stock
              </span>
            )}
            <div
              className={`p-6 border border-gray-200 rounded-2xl bg-gray-50/50 flex flex-col items-center justify-center shadow-sm ${isOutOfStock ? "opacity-75 grayscale-30" : ""}`}
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                <Image
                  src={selectedImage}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Thumbnails */}
            {images && images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 pt-2">
                {images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setSelectedImage(img.src)}
                    className={`relative aspect-square rounded-lg border-2 overflow-hidden transition-all bg-gray-50/50 ${
                      selectedImage === img.src
                        ? "border-primary"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={`${title} thumbnail ${idx + 1}`}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4 lg:py-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {title.replace(/&amp;/g, "and")}
            </h1>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex">{renderStars()}</div>
            </div>

            <div className="flex items-baseline gap-2">
              <p className="text-primary font-bold text-3xl">
                ${displayPrice.toFixed(2)}{" "}
                <span className="text-lg text-gray-400 font-semibold">AUD</span>
              </p>
            </div>

            <p className="text-sm text-gray-500">
              Tax Included. Shipping calculated at checkout.
            </p>

            {/* Variable Product Attributes */}
            {type === "variable" && attributes && attributes.length > 0 && (
              <div className="flex flex-col gap-4 mt-2">
                {attributes.map((attr, idx) => (
                  <div key={idx} className="w-full max-w-xs">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {attr.name
                        .replace("pa_", "")
                        .replace(/-/g, " ")
                        .toUpperCase()}
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg p-2.5 bg-white text-gray-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none cursor-pointer"
                      value={selectedAttributes[attr.name] || ""}
                      onChange={(e) =>
                        handleAttributeChange(attr.name, e.target.value)
                      }
                    >
                      {attr.options.map((opt: string, j: number) => (
                        <option key={j} value={opt}>
                          {opt.replace(/&amp;/g, "and")}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap md:flex-nowrap gap-6 items-end mt-4">
              <div className="flex flex-col items-start gap-3 w-fit">
                <p className="font-semibold text-gray-700">Quantity</p>
                <div className="flex items-center border border-gray-300 rounded-full bg-white h-12">
                  <button
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="w-12 h-full flex items-center justify-center text-xl hover:bg-gray-100 rounded-l-full disabled:opacity-50 transition cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncreaseQuantity}
                    disabled={quantity >= 20 || isOutOfStock}
                    className="w-12 h-full flex items-center justify-center text-xl hover:bg-gray-100 rounded-r-full disabled:opacity-50 transition cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full flex flex-col gap-3 min-w-50">
                <Button
                  text={isOutOfStock ? "Out of Stock" : "Add to Cart"}
                  icon={isOutOfStock ? undefined : FaCartPlus}
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`w-full justify-center h-12 text-lg shadow-md ${isOutOfStock ? "bg-gray-400 cursor-not-allowed" : ""}`}
                />
              </div>
            </div>

            <div className="mt-2 w-full">
              <Button
                text="Buy It Now"
                className={`w-full justify-center h-12 text-lg shadow-md ${isOutOfStock ? "bg-gray-200 text-gray-400 cursor-not-allowed hidden" : "bg-gray-900 hover:bg-gray-800"}`}
                disabled={true}
              />
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="my-10 max-w-6xl mx-auto border-t border-gray-200 pt-8">
          <h4 className="text-4xl font-bold mb-6 text-gray-900">
            Product <span className="text-primary">Description</span>
          </h4>
          {/* <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            {description}
          </p> */}
          <div
            className="text-lg text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        {/* You may also like */}
        {/* <div className="halfSection bg-gray-50/50 rounded-3xl py-12 mb-16">
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
        </div> */}

        {/* Stay In Touch */}
        {/* <StayInTouch /> */}
      </div>
    </section>
  );
};

export default ProductLayout;
