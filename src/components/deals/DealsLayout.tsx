"use client";

import { dealsCardData } from "@/src/data/Data";
import TextHeader from "@/src/utils/TextHeader";
import ProductCard from "../cards/ProductCard";
import Filters from "../filters/Filters";
import SortBy from "../filters/SortBy";
import BreadCrumb from "../misc/BreadCrumb";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import MobileFiltersDrawer from "../shop/MobileFilterDrawer";

const DealsLayout = () => {
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <section className="section !pt-2">
      <div className="container">
        <BreadCrumb />

        <TextHeader
          text="Hot Deals"
          highlightedText="For You"
          btn={false}
          center={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] lg:gap-10">
          <div className="lg:hidden mb-6">
            <div className="flex border rounded-xl overflow-hidden bg-white shadow-sm">
              <button
                onClick={() => setOpenFilters(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-base font-medium hover:bg-gray-50 transition"
              >
                <FiFilter size={16} />
                Filters
              </button>

              <div className="w-px bg-gray-200" />

              <div className="flex-1">
                <SortBy />
              </div>
            </div>
          </div>

          <aside className="rounded-lg h-fit hidden lg:block">
            <Filters price={true} />
          </aside>

          <div>
            <div className="hidden lg:block">
              <SortBy />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
              {dealsCardData.map((item) => {
                return (
                  <ProductCard
                    key={item.id}
                    image={item.image}
                    id={item.id}
                    price={item.price}
                    title={item.title}
                    stars="★★★★★"
                    discountedPrice={item.discountedPrice}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="relative">
          <MobileFiltersDrawer
            open={openFilters}
            onClose={() => setOpenFilters(false)}
            isCategory={false}
            isPrice={true}
          />
        </div>
      </div>
    </section>
  );
};

export default DealsLayout;
