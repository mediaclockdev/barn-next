"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const Filters = ({ price = false }: { price: boolean }) => {
  const [openAvailability, setOpenAvailability] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentStockStatus = searchParams.get("stock_status") || "";
  const currentSort = searchParams.get("orderby") || "";

  const handleStockChange = (status: "instock" | "outofstock") => {
    const params = new URLSearchParams(searchParams);
    if (params.get("stock_status") === status) {
      params.delete("stock_status");
    } else {
      params.set("stock_status", status);
    }
    params.delete("page"); // reset page when filter changes
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePriceSortChange = (sort: "price_desc" | "price_asc") => {
    const params = new URLSearchParams(searchParams);
    if (params.get("orderby") === sort) {
      params.delete("orderby");
    } else {
      params.set("orderby", sort);
    }
    params.delete("page"); // reset page when sort changes
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="bg-primary-light">
        <h3 className="text-xl py-3 text-center font-medium mb-6">Filters:</h3>
      </div>

      {/* Availability */}
      <div className="mb-8">
        <div className="px-2">
          <button
            onClick={() => setOpenAvailability(!openAvailability)}
            className="w-full flex justify-between items-center bg-primary-light py-3 px-4 cursor-pointer"
          >
            Availability
            <motion.span
              animate={{
                rotate: openAvailability ? 180 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <FaAngleDown size={13} className="text-text-muted" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {openAvailability && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="px-4 py-3 space-y-2 bg-gray-100 rounded mt-1">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={currentStockStatus === "instock"}
                      onChange={() => handleStockChange("instock")}
                    />
                    In Stock
                  </label>

                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={currentStockStatus === "outofstock"}
                      onChange={() => handleStockChange("outofstock")}
                    />
                    Out Of Stock
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Price */}
      {price && (
        <div className="mb-8">
          <div className="px-2">
            <button
              onClick={() => setOpenPrice(!openPrice)}
              className="w-full flex justify-between items-center bg-primary-light py-3 px-4 cursor-pointer"
            >
              Price
              <motion.span
                animate={{
                  rotate: openPrice ? 180 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <FaAngleDown size={13} className="text-text-muted" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {openPrice && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-3 space-y-2 bg-gray-100 rounded mt-1">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={currentSort === "price_desc"}
                        onChange={() => handlePriceSortChange("price_desc")}
                      />
                      High To Low
                    </label>

                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={currentSort === "price_asc"}
                        onChange={() => handlePriceSortChange("price_asc")}
                      />
                      Low To High
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
