"use client";

import { productCardData } from "@/src/data/Data";
import TextHeader from "@/src/utils/TextHeader";
import ProductCard from "../cards/ProductCard";

const ShopLayout = () => {
  return (
    <section className="w-full bg-gray-100 py-10 min-h-dvh">
      <div className="container mx-auto">
        <TextHeader
          text="Our"
          highlightedText="Products"
          btn={false}
          center={true}
          isGrid={false}
        />

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          {/* Sidebar */}
          <aside className="rounded-lg h-fit">
            <div className="bg-primary-light">
              <h3 className="text-xl py-3 pl-3 font-semibold mb-6">Filters:</h3>
            </div>

            {/* Availability */}
            <div className="mb-8">
              <div className="px-3">
                <h4 className="font-semibold mb-3 bg-primary-light py-3 pl-3">
                  Availability
                </h4>

                <div className="space-y-2 text-sm px-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    In Stock
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    Out Of Stock
                  </label>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Categories:</h3>

              <div className="space-y-2">
                {[
                  "Dogs",
                  "Cats",
                  "Horse",
                  "Lay H1",
                  "Health Products",
                  "Other Livestock",
                  "Grain",
                  "Poultry",
                  "Small Creatures",
                  "Fencing Products",
                  "Children Toys",
                  "Irrigation",
                ].map((item) => (
                  <button
                    key={item}
                    className="w-full text-left bg-primary-light hover:bg-[#99c3d1] px-4 py-2 rounded"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <div>
            {/* Sort Bar */}
            <div className="bg-primary-light px-6 py-3 rounded mb-8 flex justify-end">
              <div className="flex items-center gap-3 text-sm">
                <span>Sort By:</span>

                <select className="border rounded px-3 py-1">
                  <option>Featured</option>
                  <option>Price Low to High</option>
                  <option>Price High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
};

export default ShopLayout;
