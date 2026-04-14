"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  CheckoutAddressForm,
  CheckoutAddressFormRef,
} from "./CheckoutAddressForm";
import CheckoutSummary from "./CheckoutSummary";
import toast from "react-hot-toast";
import { useCartStore } from "@/src/store/cartStore";
import useAuthStore from "@/src/store/authStore";
import { useRouter } from "next/navigation";

const PayPalCheckoutWrapper = () => {
  const deliveryMethod = useCartStore((state) => state.deliveryMethod);
  const shippingCost = useCartStore((state) => state.shippingCost);
  
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const addressFormRef = useRef<CheckoutAddressFormRef>(null);
  const wcOrderIdRef = useRef<number | null>(null);

  // Using 'test' triggers the sandbox if no env var is set.
  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
    currency: "AUD",
    intent: "capture",
  };

  const handleTotalCalculated = (newTotal: number) => {
    if (newTotal > 0 && newTotal !== total) {
      setTotal(newTotal);
    }
  };

  // Pre-validate form when user clicks PayPal button
  const handleOnClick = (data: any, actions: any) => {
    const validData = addressFormRef.current?.validateAndGetValues();
    if (!validData) {
      toast.error("Please fill all required fields correctly.");
      const firstErrorElement = document.querySelector("input.border-red-500");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return actions.reject();
    }
    return actions.resolve();
  };

  // Create order in PayPal
  // We don't create WooCommerce order until PayPal is captured successful
  const handleCreateOrder = async (data: any, actions: any) => {
    // Grab the address data we validated earlier
    const addressData = addressFormRef.current?.validateAndGetValues();
    const items = useCartStore.getState().items;
    const isPickup = useCartStore.getState().deliveryMethod === "pickup";
    const user = useAuthStore.getState().user;
    const userId = user?.id || (user as any)?.user_id || (user as any)?.wp_id || 0;

    const toastId = toast.loading("Securing your order...");

    try {
      const orderRes = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...addressData,
          customer_id: userId,
          cartItems: items,
          payment_method: "paypal",
          shippingCost: useCartStore.getState().shippingCost,
          deliveryMethod: useCartStore.getState().deliveryMethod,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.message || "Failed to create order");
      }

      wcOrderIdRef.current = orderData.order_id;
      toast.dismiss(toastId);

      return actions.order.create({
        application_context: {
          shipping_preference: isPickup ? "NO_SHIPPING" : "SET_PROVIDED_ADDRESS",
        },
        payer: addressData
          ? {
              name: {
                given_name: addressData.shipping.first_name,
                surname: addressData.shipping.last_name,
              },
              email_address: addressData.email,
              ...(addressData.shipping.address_1
                ? {
                    address: {
                      address_line_1: addressData.shipping.address_1,
                      admin_area_2: addressData.shipping.city,
                      admin_area_1: addressData.shipping.state,
                      postal_code: addressData.shipping.postcode,
                      country_code: addressData.shipping.country || "AU",
                    },
                  }
                : addressData.billing?.address_1
                  ? {
                      address: {
                        address_line_1: addressData.billing.address_1,
                        admin_area_2: addressData.billing.city,
                        admin_area_1: addressData.billing.state,
                        postal_code: addressData.billing.postcode,
                        country_code: addressData.billing.country || "AU",
                      },
                    }
                  : {}),
            }
          : undefined,
        purchase_units: [
          {
            reference_id: orderData.order_id.toString(),
            custom_id: orderData.order_id.toString(),
            amount: {
              value: total.toFixed(2),
              currency_code: "AUD",
            },
            shipping:
              !isPickup && addressData && addressData.shipping.address_1
                ? {
                    name: {
                      full_name: `${addressData.shipping.first_name} ${addressData.shipping.last_name}`,
                    },
                    address: {
                      address_line_1: addressData.shipping.address_1,
                      admin_area_2: addressData.shipping.city,
                      admin_area_1: addressData.shipping.state,
                      postal_code: addressData.shipping.postcode,
                      country_code: addressData.shipping.country || "AU",
                    },
                  }
                : undefined,
          },
        ],
      });
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err.message || "Failed to initialize order.");
      return Promise.reject(err);
    }
  };

  // Capture order in PayPal and handle success in WooCommerce
  const handleApprove = async (data: any, actions: any) => {
    const details = await actions.order.capture();

    if (!wcOrderIdRef.current) {
      toast.error("Lost connection to WooCommerce order.");
      return;
    }

    // Loading toast
    const toastId = toast.loading("Finalizing your order...");

    try {
      const confirmRes = await fetch("/api/orders/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: wcOrderIdRef.current,
          transaction_id: details.id,
        }),
      });

      const confirmData = await confirmRes.json();

      if (!confirmRes.ok) {
        throw new Error(confirmData.message || "Failed to finalize order");
      }

      toast.success("Payment successful!");
      router.push(`/checkout/success?order_id=${wcOrderIdRef.current}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to finalize order.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const isShippingResolved =
    deliveryMethod === "pickup" ||
    (deliveryMethod === "delivery" && shippingCost !== null);

  useEffect(() => {
    setMounted(true);
    if (useCartStore.getState().items.length === 0) {
      router.push("/cart");
    }
  }, [router]);

  if (!mounted) {
    return (
      <div className="flex-1 w-full max-w-360 mx-auto flex flex-col-reverse lg:flex-row shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white overflow-hidden lg:rounded-b-3xl">
        <div className="flex-1 xl:pr-16 bg-white min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col gap-8 animate-pulse">
          <div className="bg-gray-100 h-24 rounded-2xl w-full"></div>
          <div className="bg-gray-100 h-96 rounded-2xl w-full"></div>
          <div className="bg-gray-100 h-40 rounded-2xl w-full"></div>
        </div>
        <div className="w-full lg:w-120 xl:w-135 shrink-0 border-l border-gray-200 bg-gray-50 p-6 sm:p-8 animate-pulse">
          <div className="h-8 bg-gray-200 w-1/2 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-20 bg-gray-200 rounded-xl w-full"></div>
            <div className="h-20 bg-gray-200 rounded-xl w-full"></div>
            <div className="h-20 bg-gray-200 rounded-xl w-full"></div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-360 mx-auto flex flex-col-reverse lg:flex-row shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white overflow-hidden lg:rounded-b-3xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 xl:pr-16 bg-white min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col gap-8"
      >
        <CheckoutAddressForm ref={addressFormRef} />

        <div className="bg-white border border-gray-200 shadow-[0_4px_24px_rgb(0,0,0,0.04)] rounded-2xl p-2 sm:p-4 mt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Payment</h3>
          <p className="text-gray-500 text-sm mb-6 font-medium">
            All transactions are secure and fully encrypted.
          </p>
          <div className="border border-primary bg-sky-50/50 p-5 px-3 rounded-2xl relative shadow-inner z-0 min-h-[150px] flex flex-col justify-center">
            {
              isShippingResolved ? (
                total > 0 && (
                  <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                      style={{ layout: "vertical", shape: "rect", color: "gold" }}
                      createOrder={handleCreateOrder}
                      onApprove={handleApprove}
                      onClick={handleOnClick}
                    />
                  </PayPalScriptProvider>
                )
              ) : (
                <div className="text-center py-4">
                  <p className="text-primary font-bold text-sm">
                    Please finish entering your address and calculate shipping
                    before payment.
                  </p>
                </div>
              )
            }
          </div>
        </div>
      </motion.div>

      <div className="w-full lg:w-120 xl:w-135 shrink-0 border-l border-gray-200 bg-gray-50">
        <div className="lg:sticky lg:top-0 h-full">
          <CheckoutSummary
            onTotalCalculated={handleTotalCalculated}
            hidePlaceOrderButton={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PayPalCheckoutWrapper;
