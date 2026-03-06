"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleUp } from "react-icons/fa6";

const Filters = () => {
  const [openAvailability, setOpenAvailability] = useState(true);

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
              <FaAngleUp size={13} className="text-text-muted" />
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
                <div className="space-y-2 text-sm px-2 pt-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    In Stock
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Out Of Stock
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Filters;
