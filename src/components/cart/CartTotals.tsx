"use client";

import Image from "next/image";
import Button from "../ui/Button";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

interface CartTotalsProps {
  subTotal: number;
  isCartEmpty: boolean;
}

const CartTotals: React.FC<CartTotalsProps> = ({ subTotal, isCartEmpty }) => {
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery" | "">("");
  const [postalCode, setPostalCode] = useState("");
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  const handleCalculateShipping = () => {
    if (!postalCode.trim()) {
      toast.error("Please enter a valid postal code");
      return;
    }
    // Mock Zone logic based on postal code starter
    const numCode = parseInt(postalCode);
    if (isNaN(numCode)) {
      toast.error("Postal code must be numeric");
      return;
    }

    if (postalCode.startsWith("2")) {
      setShippingCost(10.0);
      toast.success("Zone 1 Shipping Applied");
    } else if (postalCode.startsWith("3")) {
      setShippingCost(20.0);
      toast.success("Zone 2 Shipping Applied");
    } else {
      setShippingCost(30.0);
      toast.success("Zone 3 Shipping Applied");
    }
  };

  const handleMethodChange = (val: "pickup" | "delivery") => {
    setDeliveryMethod(val);
    if (val === "pickup") {
      setShippingCost(0);
    } else {
      setShippingCost(null);
    }
  };

  const finalTotal = subTotal + (shippingCost || 0);
  const checkoutDisabled = isCartEmpty || deliveryMethod === "" || (deliveryMethod === "delivery" && shippingCost === null);

  return (
    <div className="w-full max-w-[480px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-sky-400 to-primary"></div>
      
      <h3 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-5">Order Summary</h3>

      <div className="flex flex-col">
        {/* Subtotal */}
        <div className="flex justify-between items-center py-4 border-b border-gray-50">
          <span className="text-gray-600 font-medium">Subtotal</span>
          <span className="text-gray-900 font-bold">${subTotal.toFixed(2)} AUD</span>
        </div>

        {/* Shipping Method Selector */}
        <div className="py-5 border-b border-gray-50">
          <span className="text-gray-600 font-medium block mb-3">Delivery Method</span>
          <div className="flex bg-gray-50 p-1.5 rounded-xl border border-gray-100">
            <button 
              onClick={() => handleMethodChange("pickup")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${deliveryMethod === "pickup" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-800"}`}
            >
              Store Pickup
            </button>
            <button 
              onClick={() => handleMethodChange("delivery")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${deliveryMethod === "delivery" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-800"}`}
            >
              Home Delivery
            </button>
          </div>
        </div>

        {/* Postal Code Input (if Delivery) */}
        {deliveryMethod === "delivery" && (
          <div className="py-4 border-b border-gray-50 transition-all duration-300 ease-in-out">
            <span className="text-gray-600 font-medium block mb-2 text-sm">Calculate Shipping Rate</span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Postal Code (e.g., 2000)"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
              />
              <button
                onClick={handleCalculateShipping}
                className="bg-gray-900 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm active:scale-95"
              >
                Calculate
              </button>
            </div>
          </div>
        )}

        {/* Shipping Cost */}
        <div className="flex justify-between items-center py-4 border-b border-gray-50">
          <span className="text-gray-600 font-medium">Shipping Cost</span>
          <span className="font-bold">
            {deliveryMethod === "" ? (
              <span className="text-gray-400 font-normal text-sm italic">Select method</span>
            ) : deliveryMethod === "pickup" ? (
              <span className="text-emerald-500">Free</span>
            ) : shippingCost !== null ? (
              <span className="text-gray-900">${shippingCost.toFixed(2)} AUD</span>
            ) : (
              <span className="text-amber-500 text-sm">Calculation Needed</span>
            )}
          </span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-end py-6 mt-2">
          <span className="text-xl font-bold text-gray-900">Total</span>
          <div className="text-right">
            <span className="text-4xl font-black text-primary tracking-tight">${finalTotal.toFixed(2)}</span>
            <span className="text-gray-400 font-semibold ml-1 text-base">AUD</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-4 relative">
        <Button
          text={checkoutDisabled ? "Missing Information" : "Proceed to Checkout"}
          icon={FaLock}
          className={`w-full justify-center py-[18px] text-lg rounded-[17px] font-bold shadow-[0_8px_20px_rgb(14,165,233,0.25)] transition-all duration-300 ${checkoutDisabled ? "bg-gray-200 text-gray-400 shadow-none hover:bg-gray-200 cursor-not-allowed pointer-events-none" : "hover:-translate-y-1 hover:shadow-[0_12px_25px_rgb(14,165,233,0.35)]"}`}
          disabled={checkoutDisabled}
        />
        {checkoutDisabled && !isCartEmpty && (
          <p className="text-amber-600 text-center mt-4 text-sm font-medium bg-amber-50 py-2 rounded-lg border border-amber-100">
            Please pick a delivery method & calculate shipping.
          </p>
        )}
      </div>

      {/* Trust & Payment Icons */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-center text-xs text-gray-400 font-medium mb-4 uppercase tracking-widest">Guaranteed Safe Checkout</p>
        <div className="flex gap-4 flex-wrap items-center justify-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <Image
            src={"/images/payment/pay1.svg"}
            alt="Gpay"
            width={55}
            height={25}
            className="object-contain"
          />
          <Image
            src={"/images/payment/paypal.svg"}
            alt="PayPal"
            width={85}
            height={25}
            className="object-contain hover:scale-105 transition-transform"
          />
          <Image
            src={"/images/payment/pay4.svg"}
            alt="ShopPay"
            width={85}
            height={25}
            className="object-contain hover:scale-105 transition-transform"
          />
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
