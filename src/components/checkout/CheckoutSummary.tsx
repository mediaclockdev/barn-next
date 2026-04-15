"use client";

import Image from "next/image";
import { FaLock } from "react-icons/fa";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useCartStore } from "@/src/store/cartStore";

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
  } = useCartStore();
  const [productMap, setProductMap] = useState<Record<number, ProductDetails>>(
    {},
  );

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
      return {
        ...item,
        name: product?.name || "Loading...",
        price: product
          ? Number(
              product.sale_price || product.price || product.regular_price || 0,
            )
          : 0,
        image:
          product?.image ||
          product?.images?.[0]?.src ||
          "/images/shop/shop1.png",
      };
    });
  }, [cart, productMap]);

  const subTotal = hydratedCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // Use shippingCost from cartStore
  const shipping = hydratedCart.length > 0 ? shippingCost || 0 : 0;
  const finalTotal = subTotal + shipping;

  useEffect(() => {
    if (onTotalCalculated && finalTotal > 0) {
      onTotalCalculated(finalTotal);
    }
  }, [finalTotal, onTotalCalculated]);

  return (
    <div className="bg-gray-50 border border-gray-200 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden h-full lg:min-h-screen">
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
              </div>
              <div className="font-bold text-gray-900 shrink-0 text-base">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Coupon mock */}
      <div className="flex flex-wrap gap-2 border-y border-gray-200 py-6 mb-6">
        <input
          type="text"
          placeholder="Coupon code"
          className="flex-1 p-3.5 bg-white border border-gray-300 rounded-xl text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
        />
        <button className="bg-gray-300 text-gray-500 px-6 py-3.5 rounded-xl font-bold text-sm cursor-not-allowed transition-colors">
          Apply
        </button>
      </div>

      {/* Totals */}
      {requiresShippingQuote && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex flex-col gap-1 mb-6 shadow-sm animate-in fade-in slide-in-from-top-2">
          <h4 className="font-bold flex items-center gap-2">
            ⚠️ Custom Shipping Quote Required
          </h4>
          <p className="text-sm font-medium">
            Your delivery address is outside our standard delivery zones. Contact the store for a quote.
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
              ? `(${deliveryMethod === "pickup" ? "Store Pickup" : "Home Delivery"})`
              : ""}
          </span>
          <span className="font-bold text-gray-900 text-base">
            ${shipping.toFixed(2)} AUD
          </span>
        </div>
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
