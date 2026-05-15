"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useCartStore } from "@/src/store/cartStore";
import { FaArrowLeft, FaTag } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "../ui/Button";
import Link from "next/link";
import toast from "react-hot-toast";
import CartMobileItem from "./CartMobileItem";
import CartDesktopTable from "./CartDesktopTable";
import CartTotals from "./CartTotals";
import ProductCard from "../cards/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface ProductDetails {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  image: string;
  images: Array<{ id: number; src: string; name: string; alt: string }>;
  manage_stock: boolean;
  stock_quantity: number | null;
  stock_status?: string;
  variations?: any[];
  related_ids?: number[];
  average_rating?: string;
  type?: string;
}

interface HydratedCartItem {
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
  slug: string;
  maxQuantity?: number;
  variation_id?: number;
  variation_name?: string;
}

const AddToCart = () => {
  const [mounted, setMounted] = useState(false);
  const [productMap, setProductMap] = useState<Record<number, ProductDetails>>(
    {},
  );
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [isFetchingRelated, setIsFetchingRelated] = useState(false);
  const {
    items: cart,
    updateQuantity,
    removeItem,
    fetchCart,
    isLoading,
    applyCoupon,
    couponCode: storeCouponCode,
    removeCoupon,
    setShippingInfo,
  } = useCartStore();

  const [localCouponCode, setLocalCouponCode] = useState(storeCouponCode || "");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Clear shipping info whenever the cart items change.
  // This prevents stale shipping costs (e.g. from a previous checkout attempt)
  // from showing up in the cart summary when the contents have changed.
  useEffect(() => {
    setShippingInfo("", null, false);
  }, [cart, setShippingInfo]);

  useEffect(() => {
    setLocalCouponCode(storeCouponCode || "");
  }, [storeCouponCode]);

  const handleApplyCoupon = async () => {
    if (!localCouponCode.trim()) return;
    setIsApplyingCoupon(true);
    try {
      const currentSubTotal = hydratedCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      await applyCoupon(localCouponCode, currentSubTotal);
      toast.success("Coupon applied successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to apply coupon");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchCart();
  }, [fetchCart]);

  const fetchProductDetails = useCallback(
    async (productIds: number[]) => {
      if (productIds.length === 0) return;

      // Only fetch IDs we haven't already fetched
      const missingIds = productIds.filter((id) => !productMap[id]);
      if (missingIds.length === 0) return;

      setIsFetchingProducts(true);
      try {
        const res = await fetch(
          `/api/products/by-ids?ids=${missingIds.join(",")}`,
        );
        if (!res.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await res.json();
        const products: ProductDetails[] = data.products || [];

        const newMap: Record<number, ProductDetails> = {};
        products.forEach((p) => {
          newMap[p.id] = p;
        });

        setProductMap((prev) => ({ ...prev, ...newMap }));
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setIsFetchingProducts(false);
      }
    },
    [productMap],
  );

  const cartProductIdsString = useMemo(() => {
    if (!cart || cart.length === 0) return "";
    return Array.from(new Set(cart.map((item) => item.product_id)))
      .sort()
      .join(",");
  }, [cart]);

  useEffect(() => {
    if (cartProductIdsString) {
      const ids = cartProductIdsString.split(",").map(Number);
      fetchProductDetails(ids);
    }
  }, [cartProductIdsString, fetchProductDetails]);

  useEffect(() => {
    if (!cartProductIdsString) {
      setRelatedProducts([]);
      return;
    }

    const fetchRelated = async () => {
      setIsFetchingRelated(true);
      try {
        const res = await fetch(
          `/api/products/recommended?ids=${cartProductIdsString}`,
        );
        if (res.ok) {
          const data = await res.json();
          setRelatedProducts(data.products || []);
        }
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      } finally {
        setIsFetchingRelated(false);
      }
    };

    fetchRelated();
  }, [cartProductIdsString]);

  const hydratedCart: HydratedCartItem[] = useMemo(() => {
    if (!cart) return [];

    return cart.map((item) => {
      const product = productMap[item.product_id];

      let finalPrice = product
        ? Number(
            product.sale_price || product.price || product.regular_price || 0,
          )
        : 0;
      let finalImage =
        product?.image ||
        product?.images?.[0]?.src ||
        "/images/placeholder.svg";
      let finalMaxQuantity = product
        ? product.stock_quantity !== null &&
          product.stock_quantity !== undefined
          ? product.stock_quantity
          : 99
        : 99;
      let variationName = "";

      // Check if we have variation details
      if (product && item.variation_id && product.variations) {
        const variation = product.variations.find(
          (v: any) => v.id === item.variation_id,
        );
        if (variation) {
          finalPrice = Number(
            variation.price || variation.regular_price || finalPrice,
          );
          if (variation.image?.src || typeof variation.image === "string") {
            finalImage = variation.image?.src || variation.image;
          }
          if (
            variation.stock_quantity !== null &&
            variation.stock_quantity !== undefined
          ) {
            finalMaxQuantity = variation.stock_quantity;
          } else if (
            variation.stock_qty !== null &&
            variation.stock_qty !== undefined
          ) {
            finalMaxQuantity = variation.stock_qty;
          }

          if (variation.attributes) {
            const formatValue = (val: string) =>
              val
                .replace(/[-_]/g, " ")
                .replace(/\b([a-zA-Z])/g, (c) => c.toUpperCase());

            if (Array.isArray(variation.attributes)) {
              variationName = variation.attributes
                .map((a: any) => formatValue(a.option))
                .join(" / ");
            } else {
              variationName = Object.values(variation.attributes)
                .map((v) => formatValue(v as string))
                .join(" / ");
            }
          }
        }
      }

      return {
        product_id: item.product_id,
        variation_id: item.variation_id,
        quantity: item.quantity,
        name: product?.name || "Loading...",
        variation_name: variationName,
        price: finalPrice,
        image: finalImage,
        slug: product?.slug || String(item.product_id),
        maxQuantity: finalMaxQuantity,
      };
    });
  }, [cart, productMap]);

  const subTotal = useMemo(() => {
    return hydratedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  }, [hydratedCart]);

  const handleUpdateQuantity = async (
    product_id: number,
    newQuantity: number,
    variation_id: number = 0,
  ) => {
    try {
      await updateQuantity(product_id, newQuantity, variation_id);
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (
    product_id: number,
    variation_id: number = 0,
  ) => {
    try {
      await removeItem(product_id, variation_id);
      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  if (!mounted || isFetchingProducts) {
    return (
      <div className="halfSection pt-2! relative">
        <div className="container">
          <h2 className="text-4xl font-bold mb-6">Cart</h2>
          <div className="animate-pulse flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Column Mock */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {/* Table Header mock */}
                <div className="hidden md:flex h-12 bg-gray-100 rounded-xl border border-gray-200 w-full mb-2"></div>

                {/* List items mock */}
                <div className="h-28 bg-gray-100 rounded-xl border border-gray-200 w-full"></div>
                <div className="h-28 bg-gray-100 rounded-xl border border-gray-200 w-full"></div>
              </div>

              {/* Coupon mock */}
              <div className="mt-2 h-12 bg-gray-100 rounded-lg border border-gray-200 w-full max-w-sm"></div>
            </div>

            {/* Right Column Mock */}
            <div className="w-full lg:w-1/3">
              <div className="h-80 bg-gray-100 rounded-3xl border border-gray-200 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="halfSection pt-2! relative">
      <div className="container">
        <h2 className="text-4xl font-bold mb-6">Cart</h2>

        {hydratedCart.length === 0 ? (
          <div className="text-center py-12 bg-blue-50/30 rounded-lg border border-sky-200 mb-8 mt-4">
            <h3 className="text-2xl font-semibold mb-3">Your cart is empty</h3>
            <p className="text-gray-600 mb-6 text-base">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link href="/shop" className="inline-flex justify-center">
              <Button text="Return to Shop" icon={FaArrowLeft} />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Column: Cart Items & Coupon */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6">
              {/* Mobile Layout */}
              <div className="md:hidden space-y-4">
                {hydratedCart.map((item) => (
                  <CartMobileItem
                    key={`${item.product_id}-${item.variation_id || 0}`}
                    item={item}
                    isLoading={isLoading}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                  />
                ))}
              </div>

              {/* Desktop Table Layout */}
              <CartDesktopTable
                hydratedCart={hydratedCart}
                isLoading={isLoading}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />

              {/* Coupon Section */}
              <div className="mt-2">
                <div className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-sm">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaTag className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={localCouponCode}
                      onChange={(e) => setLocalCouponCode(e.target.value)}
                      placeholder="Coupon code"
                      disabled={isApplyingCoupon || !!storeCouponCode}
                      className="w-full pl-10 p-3 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                  {storeCouponCode ? (
                    <button
                      onClick={() => removeCoupon()}
                      className="w-full cursor-pointer sm:w-auto bg-red-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors shadow-sm whitespace-nowrap"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      disabled={
                        hydratedCart.length === 0 ||
                        isApplyingCoupon ||
                        !localCouponCode.trim()
                      }
                      onClick={handleApplyCoupon}
                      className="w-full cursor-pointer sm:w-auto bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {isApplyingCoupon ? "Applying..." : "Apply Coupon"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="w-full lg:w-1/3 sticky top-24">
              <CartTotals
                subTotal={subTotal}
                isCartEmpty={hydratedCart.length === 0}
              />
            </div>
          </div>
        )}

        {/* You May Also Like — same design as Shop/Deals pages */}
        {relatedProducts.length > 0 && (
          <div className="bg-gray-50/50 rounded-3xl mt-4 pt-4">
            <div className="max-w-6xl mx-auto w-full">
              <h4 className="text-3xl font-bold w-full text-center mb-4 lg:mb-6">
                You May <span className="text-primary">Also Like</span>
              </h4>

              {/* Mobile Slider */}
              <div className="block md:hidden relative">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={16}
                  modules={[Pagination, Navigation]}
                  pagination={{ clickable: true }}
                  navigation={{
                    prevEl: ".cart-related-prev",
                    nextEl: ".cart-related-next",
                  }}
                  className="pb-5 relative group"
                >
                  {relatedProducts.slice(0, 6).map((item) => (
                    <SwiperSlide key={item.id}>
                      <ProductCard
                        image={
                          item.images?.[0]?.src || "/images/placeholder.svg"
                        }
                        images={item.images}
                        id={item.id}
                        price={parseFloat(
                          item.regular_price || item.price || "0",
                        )}
                        discountedPrice={
                          item.sale_price
                            ? parseFloat(item.sale_price)
                            : undefined
                        }
                        title={item.name}
                        stars={parseInt(item.average_rating) || 5}
                        type={item.type}
                        slug={item.slug}
                        stockStatus={item.stock_status}
                        stockQuantity={item.stock_quantity}
                      />
                    </SwiperSlide>
                  ))}

                  <button
                    className="cart-related-prev absolute left-0 top-1/2 -translate-y-1/2 bg-primary text-white hover:bg-primary-dark rounded-r-xl py-4 px-1.5 shadow-lg z-20 disabled:opacity-50 cursor-pointer transition-colors"
                    aria-label="Previous slide"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <button
                    className="cart-related-next absolute right-0 top-1/2 -translate-y-1/2 bg-primary text-white hover:bg-primary-dark rounded-l-xl py-4 px-1.5 shadow-lg z-20 disabled:opacity-50 cursor-pointer transition-colors"
                    aria-label="Next slide"
                  >
                    <FiChevronRight size={24} />
                  </button>
                </Swiper>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
                {relatedProducts.slice(0, 4).map((item) => (
                  <ProductCard
                    key={item.id}
                    image={item.images?.[0]?.src || "/images/placeholder.svg"}
                    images={item.images}
                    id={item.id}
                    price={parseFloat(item.regular_price || item.price || "0")}
                    discountedPrice={
                      item.sale_price ? parseFloat(item.sale_price) : undefined
                    }
                    title={item.name}
                    stars={parseInt(item.average_rating) || 5}
                    type={item.type}
                    slug={item.slug}
                    stockStatus={item.stock_status}
                    stockQuantity={item.stock_quantity}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
