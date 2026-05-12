"use client";

import Image from "next/image";
import { FaLock } from "react-icons/fa";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useCartStore } from "@/src/store/cartStore";
import toast from "react-hot-toast";

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
  variations?: any[];
}

interface CheckoutSummaryProps {
  onTotalCalculated?: (total: number) => void;
  onPlaceOrderClick?: () => void;
  hidePlaceOrderButton?: boolean;
}

const CheckoutSummary = ({
  onTotalCalculated,
  onPlaceOrderClick,
  hidePlaceOrderButton = false,
}: CheckoutSummaryProps = {}) => {
  const {
    items: cart,
    fetchCart,
    shippingCost,
    deliveryMethod,
    requiresShippingQuote,
    applyCoupon,
    removeCoupon,
    couponCode: storeCouponCode,
    couponDiscount,
  } = useCartStore();
  const [productMap, setProductMap] = useState<Record<number, ProductDetails>>(
    {},
  );
  const [localCouponCode, setLocalCouponCode] = useState(storeCouponCode || "");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  useEffect(() => {
    setLocalCouponCode(storeCouponCode || "");
  }, [storeCouponCode]);

  const handleApplyCoupon = async () => {
    if (!localCouponCode.trim()) return;
    setIsApplyingCoupon(true);
    try {
      const currentSubTotal = hydratedCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
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
    fetchCart();
  }, [fetchCart]);

  const fetchProductDetails = useCallback(
    async (productIds: number[]) => {
      if (productIds.length === 0) return;
      const missingIds = productIds.filter((id) => !productMap[id]);
      if (missingIds.length === 0) return;

      try {
        const res = await fetch(
          `/api/products/by-ids?ids=${missingIds.join(",")}`,
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        const products: ProductDetails[] = data.products || [];
        const newMap: Record<number, ProductDetails> = {};
        products.forEach((p) => {
          newMap[p.id] = p;
        });
        setProductMap((prev) => ({ ...prev, ...newMap }));
      } catch (e) {
        console.error(e);
      }
    },
    [productMap],
  );

  useEffect(() => {
    if (cart && cart.length > 0) {
      const ids = cart.map((item) => item.product_id);
      fetchProductDetails(ids);
    }
  }, [cart, fetchProductDetails]); // Added fetchProductDetails as dependency

  const hydratedCart = useMemo(() => {
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
      let variationName = "";

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
          if (variation.attributes) {
            if (Array.isArray(variation.attributes)) {
              variationName = variation.attributes
                .map((a: any) => a.option)
                .join(" / ");
            } else {
              variationName = Object.values(variation.attributes).join(" / ");
            }
          }
        }
      }

      return {
        ...item,
        name: product?.name || "Loading...",
        variation_name: variationName,
        price: finalPrice,
        image: finalImage,
      };
    });
  }, [cart, productMap]);

  const subTotal = hydratedCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // Use shippingCost from cartStore
  const shipping = hydratedCart.length > 0 ? shippingCost || 0 : 0;
  const finalTotal = Math.max(0, subTotal + shipping - couponDiscount);

  useEffect(() => {
    if (onTotalCalculated && finalTotal > 0) {
      onTotalCalculated(finalTotal);
    }
  }, [finalTotal, onTotalCalculated]);

  return (
    <div className="bg-gray-50 border border-gray-200 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden">
      {/* Items */}
      <h3 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-200 pb-5">
        Order Summary
      </h3>

      <div className="space-y-4 mb-6">
        {hydratedCart.length === 0 ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-xl shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                </div>
                <div className="w-12 h-4 bg-gray-200 rounded shrink-0"></div>
              </div>
            ))}
          </div>
        ) : (
          hydratedCart.map((item) => (
            <div
              key={item.product_id}
              className="flex gap-4 items-center group"
            >
              <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-gray-200 bg-white group-hover:border-gray-300 transition-colors">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold shadow-sm z-10">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-bold text-gray-800 line-clamp-2">
                  {item.name.replace(/&amp;/g, "and")}
                </h5>
                {(item as any).variation_name && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {(item as any).variation_name}
                  </p>
                )}
              </div>
              <div className="font-bold text-gray-900 shrink-0 text-base">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Coupon */}
      <div className="flex flex-col gap-2 border-y border-gray-200 py-6 mb-6">
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            value={localCouponCode}
            onChange={(e) => setLocalCouponCode(e.target.value)}
            disabled={isApplyingCoupon || !!storeCouponCode}
            placeholder="Coupon code"
            className="flex-1 p-3.5 bg-white border border-gray-300 rounded-xl text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          {storeCouponCode ? (
            <button
              onClick={() => removeCoupon()}
              className="bg-red-600 text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors cursor-pointer"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={handleApplyCoupon}
              disabled={
                hydratedCart.length === 0 ||
                isApplyingCoupon ||
                !localCouponCode.trim()
              }
              className="bg-gray-900 text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isApplyingCoupon ? "Applying..." : "Apply"}
            </button>
          )}
        </div>
      </div>

      {/* Totals */}
      {requiresShippingQuote && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex flex-col gap-1 mb-6 shadow-sm animate-in fade-in slide-in-from-top-2">
          <h4 className="font-bold flex items-center gap-2">
            ⚠️ Custom Shipping Quote Required
          </h4>
          <p className="text-sm font-medium">
            Your delivery address is outside our standard delivery zones.
            Contact the store for a quote.
          </p>
        </div>
      )}
      <div className="space-y-4 text-sm text-gray-600 mb-8 font-medium">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-bold text-gray-900 text-base">
            ${subTotal.toFixed(2)} AUD
          </span>
        </div>
        <div className="flex justify-between">
          <span>
            Shipping{" "}
            {deliveryMethod
              ? `(${deliveryMethod === "pickup" ? "Store Pickup" : deliveryMethod === "auspost" ? "Australia Post" : "Local Delivery"})`
              : ""}
          </span>
          <span className="font-bold text-gray-900 text-base">
            ${shipping.toFixed(2)} AUD
          </span>
        </div>
        {couponDiscount > 0 && (
          <div className="flex justify-between text-red-500">
            <span>Discount</span>
            <span className="font-bold text-base">
              -${couponDiscount.toFixed(2)} AUD
            </span>
          </div>
        )}
        <div className="flex justify-between items-end mt-4 pt-5 border-t border-gray-200">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <div className="text-right">
            <span className="text-4xl font-black text-primary">
              ${finalTotal.toFixed(2)}
            </span>
            <span className="text-sm font-semibold text-gray-400 ml-1">
              AUD
            </span>
          </div>
        </div>
      </div>

      {!hidePlaceOrderButton && (
        <button
          onClick={onPlaceOrderClick}
          className="w-full bg-primary text-white py-3 flex items-center justify-center gap-2 rounded-lg font-bold text-lg hover:-translate-y-1 shadow-[0_8px_20px_rgb(14,165,233,0.25)] hover:shadow-[0_12px_25px_rgb(14,165,233,0.35)] transition-all cursor-pointer"
        >
          <FaLock /> Place Order
        </button>
      )}
    </div>
  );
};

export default CheckoutSummary;
