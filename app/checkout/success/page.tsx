import { Suspense } from "react";
import SuccessClient from "@/src/components/checkout/SuccessClient";

export const metadata = {
  title: "Order Confirmed - Barn",
};

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">
            Verifying secure transaction...
          </p>
        </div>
      }
    >
      <SuccessClient />
    </Suspense>
  );
}
