"use client";

import { useState } from "react";
import { productCardData } from "@/src/data/Data";
import TextHeader from "@/src/utils/TextHeader";
import ProductCard from "../cards/ProductCard";
import SortBy from "../filters/SortBy";
import CategoryFilter from "../filters/CategoryFilter";
import Filters from "../filters/Filters";
import BreadCrumb from "../misc/BreadCrumb";
import MobileFiltersDrawer from "./MobileFilterDrawer";
import { FiFilter } from "react-icons/fi";

const ShopLayout = () => {
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <section className="section !pt-2">
      <div className="container">
        <BreadCrumb />

        <TextHeader
          text="Our"
          highlightedText="Products"
          btn={false}
          center={true}
          isGrid={false}
        />

        {/* Mobile Controls */}
        <div className="lg:hidden mb-6">
          <div className="flex border rounded-xl overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => setOpenFilters(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-base font-medium hover:bg-gray-50 transition"
            >
              <FiFilter size={18} />
              Filters
            </button>

            <div className="w-px bg-gray-200" />

            <div className="flex-1">
              <SortBy />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] lg:gap-10">
          {/* Sidebar (Desktop Only) */}
          <aside className="hidden lg:block rounded-lg h-fit">
            <Filters price={false} />
            <CategoryFilter />
          </aside>

          {/* Products */}
          <div>
            <div className="hidden lg:block">
              <SortBy />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
              {productCardData.map((item) => (
                <ProductCard
                  key={item.id}
                  image={item.image}
                  id={item.id}
                  price={item.price}
                  title={item.title}
                  stars="★★★★★"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <MobileFiltersDrawer
            open={openFilters}
            onClose={() => setOpenFilters(false)}
            isCategory={true}
            isPrice={false}
          />
        </div>
      </div>
    </section>
  );
};

export default ShopLayout;
