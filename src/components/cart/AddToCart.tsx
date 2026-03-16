"use client";
import Image from "next/image";
import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Button from "../ui/Button";
import { FiPlus, FiMinus } from "react-icons/fi";
import BreadCrumb from "../misc/BreadCrumb";
import { productCardData } from "@/src/data/Data";
import ProductCard from "../cards/ProductCard";
import StayInTouch from "../misc/StayInTouch";

const initialCart = [
  {
    id: 1,
    name: "Savour Life Australian Butter Biscuits",
    price: 13.5,
    image: "/images/shop/shop1.png",
    quantity: 1,
  },
  {
    id: 2,
    name: "Healthy Dog Treats",
    price: 9.99,
    image: "/images/shop/shop2.png",
    quantity: 2,
  },
];

const AddToCart = () => {
  const [cart, setCart] = useState(initialCart);

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, value: number) => {
    if (value < 1 || value > 20) return;
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: value } : item,
      ),
    );
  };

  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="halfSection">
      <div className="container">
        <div>
          <h2 className="text-4xl font-bold mb-6">Cart</h2>

          <div className="md:hidden space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border border-sky-300 rounded-lg p-4"
              >
                <div className="flex gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>

                    <p className="text-sm text-gray-600">
                      Price: ${item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="w-6 h-6 border border-sky-300 rounded flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiMinus />
                        </button>

                        <span className="w-6 text-center">{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= 20}
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
                        className="text-red-500 cursor-pointer"
                        onClick={() => removeItem(item.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
                {cart.map((item) => (
                  <tr key={item.id} className="border-b border-sky-200">
                    <td className="p-2 text-red-500 cursor-pointer ">
                      <div className="flex items-center justify-center w-full">
                        <FaTimesCircle
                          size={20}
                          onClick={() => removeItem(item.id)}
                        />
                      </div>
                    </td>
                    <td className="p-3 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        height={50}
                        width={50}
                      />
                    </td>
                    <td className="p-3 text-base">{item.name}</td>
                    <td className="text-center text-base">
                      ${item.price.toFixed(2)} AUD
                    </td>
                    <td className="p-3 text-center text-base">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 border border-sky-300 rounded flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiMinus />
                        </button>

                        <span className="w-6 text-center">{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= 20}
                          className="w-8 h-8 border border-sky-300 rounded flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>

        <div className="my-5">
          <Button text="Apply Coupon" icon={FaArrowRight} />
        </div>

        <div className="my-16 flex justify-center">
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
                icon={FaArrowRight}
                className="w-full justify-center"
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
                    price={item.price}
                    image="/images/shop/shop1.png"
                    title="Savourlife Australian Peanut Butter Biscuits"
                    stars="★★★★"
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
