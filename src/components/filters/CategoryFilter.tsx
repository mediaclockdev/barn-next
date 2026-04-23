"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// Fallback empty structure
const fallbackCategories = [
  {
    category: "General",
    slug: "general",
    filters: [],
  },
];

const formatName = (name: string) => {
  if (!name) return "";
  // Remove " - L1", "- L2", etc.
  let clean = name.replace(/\s*-\s*L\d+/gi, "").trim();
  // Capitalize first letter of each word
  return clean
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
};

const CategoryFilter = ({
  categories = fallbackCategories,
}: {
  categories?: any[];
}) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentCategories = searchParams.get("category")?.split("|") || [];

  const toggleCategory = (categoryName: string) => {
    setOpenCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  const handleCategoryChange = (id: string) => {
    const params = new URLSearchParams(searchParams);
    let cats = [...currentCategories];

    if (cats.includes(id)) {
      cats = cats.filter((c) => c !== id);
    } else {
      cats.push(id);
    }

    if (cats.length > 0) {
      params.set("category", cats.join("|"));
    } else {
      params.delete("category");
    }

    params.delete("page"); // reset page when filter changes

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  // Ensure there's something to render
  const mappedCategories =
    categories?.length > 0 ? categories : fallbackCategories;

  return (
    <div>
      <div className="flex justify-between items-center bg-primary-light px-4 py-3 mb-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-800">Categories:</h3>
        {currentCategories.length > 0 && (
          <button
            onClick={handleResetFilters}
            className="text-[#42A1E8] hover:bg-white/90 p-1.5 px-2 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-bold shadow-sm bg-white cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-2">
        {mappedCategories.map((category) => {
          const isOpen = openCategory === category?.category;
          const displayName = formatName(category?.category);

          return (
            <div key={category?.category || category?.slug} className="px-2">
              {/* Category Button */}
              <button
                className="w-full flex justify-between items-center text-left bg-primary-light hover:bg-primary/20 px-4 py-3 rounded cursor-pointer"
                onClick={() => toggleCategory(category?.category)}
              >
                {displayName}

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
                    {category?.filters && category?.filters?.length > 0 && (
                      <div className="px-4 py-3 space-y-4 bg-gray-100 rounded mt-1">
                        {category?.filters?.map(
                          (filterGroup: any, idx: number) => (
                            <div key={idx} className="space-y-2">
                              {/* Filter items */}
                              {filterGroup?.items?.map((item: any) => {
                                const stringId = item?.id?.toString();
                                return (
                                  <label
                                    key={item?.id}
                                    className="flex items-center justify-between gap-2 text-sm cursor-pointer hover:bg-gray-200/50 p-1 rounded transition-colors"
                                  >
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        className="cursor-pointer"
                                        checked={currentCategories.includes(
                                          stringId,
                                        )}
                                        onChange={() =>
                                          handleCategoryChange(stringId)
                                        }
                                      />
                                      <span>{formatName(item.name)}</span>
                                    </div>
                                    {/* <span className="text-xs text-gray-500 font-medium">
                                      ({item?.count})
                                    </span> */}
                                  </label>
                                );
                              })}
                            </div>
                          ),
                        )}
                      </div>
                    )}
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
