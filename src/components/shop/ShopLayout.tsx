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
import MobileSort from "../filters/MobileSortBy";
import { WooCommerceProduct } from "@/src/utils/woocommerce";
import Pagination from "../misc/Pagination";

interface ShopLayoutProps {
  products?: WooCommerceProduct[];
  currentPage?: number;
  totalPages?: number;
}

const ShopLayout = ({ products, currentPage = 1, totalPages = 1 }: ShopLayoutProps) => {
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <section className="section pt-2!">
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
          <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
            {/* Filter Button */}
            <button
              onClick={() => setOpenFilters(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold"
            >
              <FiFilter size={16} />
              Filters
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-200" />

            {/* Sort */}
            <div className="flex-1">
              <MobileSort />
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
              {products && products.length > 0 ? (
                products.map((item) => (
                  <ProductCard
                    key={item.id}
                    image={item.images?.[0]?.src || "/images/shop/shop1.png"}
                    id={item.id}
                    price={parseFloat(item.price || item.regular_price || "0")}
                    title={item.name}
                    stars={parseInt(item.average_rating) || 5}
                  />
                ))
              ) : (
                productCardData.map((item) => (
                  <ProductCard
                    key={item.id}
                    image={item.image}
                    id={item.id}
                    price={item.price}
                    title={item.title}
                    stars={5}
                  />
                ))
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            )}
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
