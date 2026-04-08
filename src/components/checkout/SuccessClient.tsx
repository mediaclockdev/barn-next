"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/src/store/cartStore";
import Link from "next/link";
import { FaCheckCircle, FaShoppingBag } from "react-icons/fa";
import { motion } from "framer-motion";

const SuccessClient = () => {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");
  const clearCart = useCartStore((state) => state.clearCart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // When the success page loads with a valid Stripe payment intent, we consider the order securely placed
    // and empty the user's cart automatically.
    if (paymentIntent) {
      clearCart();
    }
  }, [paymentIntent, clearCart]);

  if (!mounted) return null;

  return (
    <div className="min-h-[70vh] bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-xl w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-4 sm:p-8 text-center border top-0 border-gray-100 overflow-hidden relative"
      >
        {/* Top Decorative Edge */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-emerald-400 to-emerald-600"></div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="flex justify-center mb-6"
        >
          <FaCheckCircle className="text-7xl text-emerald-500 mb-2 drop-shadow-sm" />
        </motion.div>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Order Confirmed!
        </h1>
        <p className="text-lg text-gray-600 mb-8 font-medium">
          Thank you for your purchase. We&apos;ve safely received your order and
          payment.
        </p>

        {paymentIntent && (
          <div className="bg-gray-50 rounded-xl p-4 mb-10 border border-gray-100 text-left">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Transaction Ref
            </span>
            <span className="font-mono text-gray-700 text-sm break-all font-medium">
              {paymentIntent}
            </span>
          </div>
        )}

        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white w-full py-4 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          <FaShoppingBag /> Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
};

export default SuccessClient;
