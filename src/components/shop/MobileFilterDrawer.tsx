"use client";

import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Filters from "../filters/Filters";
import CategoryFilter from "../filters/CategoryFilter";

type Props = {
  open: boolean;
  onClose: () => void;
  isPrice: boolean;
  isCategory: boolean;
};

const MobileFiltersDrawer: React.FC<Props> = ({
  open,
  onClose,
  isPrice,
  isCategory,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-[85%] max-w-85 bg-white z-50 shadow-[8px_0_30px_rgba(0,0,0,0.12)] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
              <h3 className="text-2xl font-semibold tracking-wide">Filters</h3>

              <button
                onClick={onClose}
                className="rounded-full hover:bg-gray-100 transition cursor-pointer" 
              >
                <IoClose size={25} />
              </button>
            </div>

            {/* Filters */}
            <div className="flex-1 overflow-y-auto px-3 py-6 space-y-8">
              <Filters price={isPrice} />
              {isCategory && <CategoryFilter />}
            </div>

            {/* Buttons */}
            <div className="border-t p-4 flex gap-3 bg-white border-gray-200">
              <button
                className="flex-1 border border-gray-300 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                onClick={() => {
                  console.log("clear filters");
                }}
              >
                Clear
              </button>

              <button
                className="flex-1 bg-primary text-white py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:opacity-90 transition"
                onClick={onClose}
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileFiltersDrawer;
