"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import CheckoutForm from "./CheckoutForm";
import CheckoutSummary from "./CheckoutSummary";
import {
  CheckoutAddressForm,
  CheckoutAddressFormRef,
} from "./CheckoutAddressForm";
import toast from "react-hot-toast";

// Note: Ensure NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is in your .env.local
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

const appearance = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#0f172a",
  },
};

const StripeCheckoutWrapper = () => {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const fetchedIntentForTotal = useRef<number | null>(null);

  // We expose a generic form submit trigger so CheckoutSummary can trigger the form
  const [submitTrigger, setSubmitTrigger] = useState<number>(0);
  const addressFormRef = useRef<CheckoutAddressFormRef>(null);
  const [validatedData, setValidatedData] = useState<any>(null);

  const handleTotalCalculated = (newTotal: number) => {
    // Only set if diff. Prevents loops.
    if (newTotal > 0 && newTotal !== total) {
      setTotal(newTotal);
    }
  };

  const handlePlaceOrderClick = () => {
    const data = addressFormRef.current?.validateAndGetValues();
    if (!data) {
      toast.error("Please fill all required fields correctly.");
      const firstErrorElement = document.querySelector("input.border-red-500");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    setValidatedData(data);
    setSubmitTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    // Fetch a new payment intent whenever the total changes
    if (total > 0 && fetchedIntentForTotal.current !== total) {
      fetchedIntentForTotal.current = total;
      const fetchPaymentIntent = async () => {
        try {
          const res = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: total }),
          });
          const data = await res.json();
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        } catch (error) {
          console.error("Failed to initialize Stripe Payment Intent", error);
        }
      };

      fetchPaymentIntent();
    }
  }, [total]);

  const elementsOptions = useMemo(() => {
    return { clientSecret, appearance };
  }, [clientSecret]);

  return (
    <div className="flex-1 w-full max-w-360 mx-auto flex flex-col-reverse lg:flex-row shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white overflow-hidden lg:rounded-b-3xl">
      {/* If clientSecret is missing but cart has a total, meaning we hold off till created */}
      {!clientSecret && (
        <div className="flex-1 xl:pr-16 bg-white min-h-[50vh] p-4 flex flex-col pt-8">
          <div className="bg-white border border-gray-100 shadow-[0_4px_24px_rgb(0,0,0,0.02)] rounded-3xl p-6 sm:p-8 animate-pulse">
            <div className="h-6 bg-gray-200 rounded-md w-32 mb-4"></div>
            <div className="h-4 bg-gray-100 rounded-md w-48 mb-6"></div>

            <div className="border border-primary/20 bg-sky-50/30 p-5 rounded-2xl h-64 mt-4 relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <span className="text-sm font-medium text-primary/70">
                  Connecting securely to Stripe...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {clientSecret && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 xl:pr-16 bg-white min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col gap-8"
        >
          <CheckoutAddressForm ref={addressFormRef} />

          <Elements options={elementsOptions} stripe={stripePromise}>
            <CheckoutForm
              submitTrigger={submitTrigger}
              checkoutData={validatedData}
            />
          </Elements>
        </motion.div>
      )}

      {/* Right Col: Summary Sidebar */}
      {/* We keep this outside the Elements provider because Elements wrapper 
          prevents CheckoutSummary from updating the total that triggers re-fetch (to avoid complex dependency loops) 
          BUT it's fine, we pass the trigger function to it */}
      <div className="w-full lg:w-120 xl:w-135 shrink-0 border-l border-gray-200 bg-gray-50">
        <div className="lg:sticky lg:top-0 h-full">
          <CheckoutSummary
            onTotalCalculated={handleTotalCalculated}
            onPlaceOrderClick={handlePlaceOrderClick}
          />
        </div>
      </div>
    </div>
  );
};

export default StripeCheckoutWrapper;
