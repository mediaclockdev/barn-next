"use client";

import { FaApplePay, FaCreditCard } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const CheckoutForm = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Express Checkout */}
      <div className="bg-white border text-center border-gray-200 shadow-[0_4px_24px_rgb(0,0,0,0.04)] rounded-2xl relative p-3">
        <h4 className="text-gray-500 font-semibold mb-4 text-xs uppercase tracking-widest">
          Express Checkout
        </h4>
        <div className="flex gap-4 items-center justify-center px-2">
          <button className="flex-1 py-3 bg-black text-white rounded-xl shadow-sm hover:-translate-y-1 transition flex items-center justify-center text-3xl h-14">
            <FaApplePay />
          </button>
          <button className="flex-1 py-3 bg-gray-100 border border-gray-200 rounded-xl hover:-translate-y-1 transition shadow-sm flex items-center justify-center text-2xl h-14">
            <FcGoogle />{" "}
            <span className="text-gray-700 font-medium ml-1 text-base">
              Pay
            </span>
          </button>
        </div>
        <div className="flex items-center text-center mt-8">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="mx-4 text-gray-400 font-semibold text-xs tracking-wider">
            OR CONTINUE BELOW
          </span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white border border-gray-200 shadow-[0_4px_24px_rgb(0,0,0,0.04)] rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-5">
          Contact Information
        </h3>
        <input
          type="email"
          placeholder="Email address"
          className="w-full p-4 mb-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
        />
        <label className="flex items-center gap-2 cursor-pointer mt-1">
          <input
            type="checkbox"
            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
          />
          <span className="text-sm font-medium text-gray-600">
            Email me with news and offers
          </span>
        </label>
      </div>

      {/* Shipping Address */}
      <div className="bg-white border border-gray-200 shadow-[0_4px_24px_rgb(0,0,0,0.04)] rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-5">
          Delivery Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="First name"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
          <input
            type="text"
            placeholder="Last name"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
        </div>

        <input
          type="text"
          placeholder="Address"
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all mb-4"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="City / Suburb"
            className="w-full sm:col-span-1 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
          <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer">
            <option>State</option>
            <option>NSW</option>
            <option>VIC</option>
            <option>QLD</option>
            <option>WA</option>
          </select>
          <input
            type="text"
            placeholder="Postal Code"
            className="w-full sm:col-span-1 col-span-2 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
        </div>

        <input
          type="tel"
          placeholder="Phone"
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
        />
      </div>

      {/* Payment */}
      <div className="bg-white border border-gray-200 shadow-[0_4px_24px_rgb(0,0,0,0.04)] rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Payment</h3>
        <p className="text-gray-500 text-sm mb-6 font-medium">
          All transactions are secure and fully encrypted.
        </p>

        <div className="border border-primary bg-sky-50 p-5 rounded-2xl relative shadow-inner">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                checked
                readOnly
                className="w-5 h-5 text-primary accent-primary"
              />
              <span className="font-semibold text-gray-900 text-lg">
                Credit Card
              </span>
            </div>
            <FaCreditCard className="text-gray-400 text-2xl" />
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Card number"
              className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Expiration (MM / YY)"
                className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <input
                type="text"
                placeholder="Security code"
                className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <input
              type="text"
              placeholder="Name on card"
              className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
