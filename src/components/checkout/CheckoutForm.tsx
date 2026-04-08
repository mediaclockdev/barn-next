"use client";
import {
  PaymentElement,
  useStripe,
  useElements,
  ExpressCheckoutElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CheckoutFormProps {
  submitTrigger: number;
}

const expressCheckoutOptions = {
  paymentMethods: {
    googlePay: "always" as const,
    applePay: "always" as const,
  },
};

const CheckoutForm = ({ submitTrigger }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (submitTrigger > 0) {
      handlePaymentSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitTrigger]);

  const handlePaymentSubmit = async () => {
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      toast.error(error.message || "Payment failed");
    }

    setIsProcessing(false);
  };

  const handleExpressCheckout = async (event: any) => {
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "Express checkout failed");
      toast.error(error.message || "Payment failed");
    }

    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Express and Payment element wrapper */}
      <div className="bg-white border border-gray-200 shadow-[0_4px_24px_rgb(0,0,0,0.04)] rounded-2xl p-2 sm:p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Payment</h3>
        <p className="text-gray-500 text-sm mb-6 font-medium">
          All transactions are secure and fully encrypted.
        </p>

        <div>
          <div className="border border-primary bg-sky-50/50 p-5 px-3 rounded-2xl relative shadow-inner">
            <ExpressCheckoutElement onConfirm={handleExpressCheckout} />

            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm text-gray-500">or pay with card</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <PaymentElement />
          </div>
          {errorMessage && (
            <div className="mt-4 text-red-500 text-sm font-medium">
              {errorMessage}
            </div>
          )}
          {isProcessing && (
            <div className="mt-4 text-primary text-sm font-medium flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing payment securely...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
