"use client";
import Image from "next/image";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useCartStore } from "@/src/store/cartStore";
import { FaTimesCircle, FaArrowLeft, FaTag, FaLock } from "react-icons/fa";
import Button from "../ui/Button";
import { FiPlus, FiMinus } from "react-icons/fi";
import { productCardData } from "@/src/data/Data";
import ProductCard from "../cards/ProductCard";
import StayInTouch from "../misc/StayInTouch";
import Link from "next/link";
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
}

interface HydratedCartItem {
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
  slug: string;
}

const AddToCart = () => {
  const [mounted, setMounted] = useState(false);
  const [productMap, setProductMap] = useState<Record<number, ProductDetails>>(
    {},
  );
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const {
    items: cart,
    updateQuantity,
    removeItem,
    fetchCart,
    isLoading,
  } = useCartStore();

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
        if (!res.ok) throw new Error("Failed to fetch product details");

        const products: ProductDetails[] = await res.json();
        console.log("Products ", products);
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

  useEffect(() => {
    if (cart && cart.length > 0) {
      const ids = cart.map((item) => item.product_id);
      fetchProductDetails(ids);
    }
  }, [cart]); // eslint-disable-line react-hooks/exhaustive-deps

  const hydratedCart: HydratedCartItem[] = useMemo(() => {
    if (!cart) return [];
    return cart.map((item) => {
      const product = productMap[item.product_id];
      return {
        product_id: item.product_id,
        quantity: item.quantity,
        name: product?.name || "Loading...",
        price: product
          ? Number(
              product.sale_price || product.price || product.regular_price || 0,
            )
          : 0,
        image: product?.images?.[0]?.src || product?.image || "/images/shop/shop1.png",
        slug: product?.slug || String(item.product_id),
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
  ) => {
    try {
      await updateQuantity(product_id, newQuantity);
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (product_id: number) => {
    try {
      await removeItem(product_id);
      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  if (!mounted) {
    return (
      <div className="halfSection">
        <div className="container min-h-[50vh] flex items-center justify-center">
          <p className="text-xl">Loading Cart...</p>
        </div>
      </div>
    );
  }

  const showLoading = isLoading || isFetchingProducts;

  return (
    <div className="halfSection relative">
      {/* Loading Overlay */}
      {showLoading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-lg font-bold text-sky-600 animate-pulse">
            Syncing Cart...
          </div>
        </div>
      )}

      <div className="container">
        <div>
          <h2 className="text-4xl font-bold mb-6">Cart</h2>

          {hydratedCart.length === 0 ? (
            <div className="text-center py-12 bg-blue-50/30 rounded-lg border border-sky-200 mb-8 mt-4">
              <h3 className="text-2xl font-semibold mb-3">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-6 text-base">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <Link href="/shop" className="inline-flex justify-center">
                <Button text="Return to Shop" icon={FaArrowLeft} />
              </Link>
            </div>
          ) : (
            <>
              {/* Mobile Layout */}
              <div className="md:hidden space-y-4">
                {hydratedCart.map((item) => (
                  <div
                    key={(item.product_id + 1) * 23.34}
                    className="border border-sky-300 rounded-lg p-4"
                  >
                    <div className="flex gap-4">
                      <Link href={`/shop/${item.slug}`}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded"
                        />
                      </Link>

                      <div className="flex-1">
                        <Link href={`/shop/${item.slug}`}>
                          <h4 className="font-semibold hover:text-primary transition-colors">
                            {item.name}
                          </h4>
                        </Link>

                        <p className="text-sm text-gray-600">
                          Price: ${item.price.toFixed(2)}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.product_id,
                                  item.quantity - 1,
                                )
                              }
                              disabled={item.quantity <= 1 || isLoading}
                              className="w-6 h-6 border border-sky-300 rounded flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <FiMinus />
                            </button>

                            <span className="w-6 text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.product_id,
                                  item.quantity + 1,
                                )
                              }
                              disabled={item.quantity >= 20 || isLoading}
                              className="w-6 h-6 border border-sky-300 rounded flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <FiPlus />
                            </button>
                          </div>

                          <span className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>

                          <FaTimesCircle
                            size={18}
                            className="text-red-500 cursor-pointer hover:text-red-600"
                            onClick={() => handleRemoveItem(item.product_id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table Layout */}
              <div className="hidden md:block overflow-x-auto border border-sky-300">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr className="border-b border-sky-300">
                      <th className="p-3 text-xl"></th>
                      <th className="p-3 text-xl">Product</th>
                      <th className="p-3 text-left text-xl">Description</th>
                      <th className="p-3 text-xl">Price</th>
                      <th className="p-3 text-xl">Quantity</th>
                      <th className="p-3 text-xl">Subtotal</th>
                    </tr>
                  </thead>

                  <tbody>
                    {hydratedCart.map((item) => (
                      <tr
                        key={(item.product_id + 1) * 23.34}
                        className="border-b border-sky-200"
                      >
                        <td className="p-2 text-red-500 cursor-pointer ">
                          <div className="flex items-center justify-center w-full">
                            <FaTimesCircle
                              size={20}
                              className="hover:text-red-700"
                              onClick={() => handleRemoveItem(item.product_id)}
                            />
                          </div>
                        </td>
                        <td className="p-3 flex items-center justify-center">
                          <Link href={`/shop/${item.slug}`}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              height={50}
                              width={50}
                              className="rounded"
                            />
                          </Link>
                        </td>
                        <td className="p-3 text-base">
                          <Link
                            href={`/shop/${item.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {item.name}
                          </Link>
                        </td>
                        <td className="text-center text-base">
                          ${item.price.toFixed(2)} AUD
                        </td>
                        <td className="p-3 text-center text-base">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.product_id,
                                  item.quantity - 1,
                                )
                              }
                              disabled={item.quantity <= 1 || isLoading}
                              className="w-8 h-8 border border-sky-300 rounded flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-sky-50"
                            >
                              <FiMinus />
                            </button>

                            <span className="w-6 text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.product_id,
                                  item.quantity + 1,
                                )
                              }
                              disabled={item.quantity >= 20 || isLoading}
                              className="w-8 h-8 border border-sky-300 rounded flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-sky-50"
                            >
                              <FiPlus />
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-center text-base">
                          ${(item.price * item.quantity).toFixed(2)} AUD
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <div className="my-5">
          <Button
            text="Apply Coupon"
            icon={FaTag}
            disabled={hydratedCart.length === 0}
          />
        </div>

        <div className="mt-8 flex justify-center">
          <div className="w-120">
            <h3 className="text-4xl font-bold text-center mb-6">Cart Totals</h3>

            {/* Table */}
            <div className="border border-sky-300 text-base">
              {/* Row */}
              <div className="grid grid-cols-2">
                <div className="border-r border-b border-sky-300 p-3 font-semibold text-center text-lg">
                  Subtotal
                </div>

                <div className="border-b border-sky-300 p-3 text-center">
                  ${subTotal.toFixed(2)} AUD
                </div>
              </div>

              {/* Row */}
              <div className="grid grid-cols-2">
                <div className="border-r border-b border-sky-300 p-3 font-semibold text-center text-lg">
                  Shipping
                </div>

                <div className="border-b border-sky-300 p-3 text-center">
                  Calculate Shipping
                </div>
              </div>

              {/* Row */}
              <div className="grid grid-cols-2">
                <div className="border-r border-sky-300 p-3 text-lg font-semibold text-center">
                  Total
                </div>

                <div className="p-3 font-semibold text-center">
                  ${subTotal.toFixed(2)} AUD
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="mt-6">
              <Button
                text="Proceed To Checkout"
                icon={FaLock}
                className="w-full justify-center"
                disabled={hydratedCart.length === 0}
              />
            </div>

            <div className="flex mt-4 gap-5 flex-wrap p-2 lg:p-5 items-center justify-center">
              <Image
                src={"/images/payment/pay1.svg"}
                alt="Gpay"
                width={65}
                height={100}
              />

              <Image
                src={"/images/payment/paypal.svg"}
                alt="PayPal"
                width={100}
                height={100}
              />

              <Image
                src={"/images/payment/pay4.svg"}
                alt="Shop"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>

        <div>
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
                    price={Number(item.price)}
                    image="/images/shop/shop1.png"
                    title="Savourlife Australian Peanut Butter Biscuits"
                    stars={4}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stay In Touch  */}
          <StayInTouch />
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
