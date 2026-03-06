"use client";
import { categoriesFilterData } from "@/src/data/Data";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";

const CategoryFilter = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const toggleCategory = (title: string) => {
    setOpenCategory((prev) => (prev === title ? null : title));
  };

  const toggleCheckbox = (item: string) => {
    setSelected((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <div>
      <h3 className="text-xl font-medium bg-primary-light p-3 text-center mb-6">
        Categories:
      </h3>

      <div className="space-y-2">
        {categoriesFilterData.map((category) => {
          const isOpen = openCategory === category.title;

          return (
            <div key={category.title} className="px-2">
              {/* Category Button */}
              <button
                className="w-full flex justify-between items-center text-left bg-primary-light hover:bg-primary/20 px-4 py-3 rounded cursor-pointer"
                onClick={() => toggleCategory(category.title)}
              >
                {category.title}

                <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                  <FaAngleDown size={13} className="text-text-muted" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-3 space-y-2 bg-gray-100 rounded mt-1">
                      {category.items.map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            onChange={() => toggleCheckbox(item)}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
