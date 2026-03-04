"use client";

import TextHeader from "@/src/utils/TextHeader";
import Image from "next/image";

const ShopLayout = () => {
  return (
    <section className="w-full bg-gray-100 py-10 min-h-dvh">
      <div className="container mx-auto ">
        <div className="flex items-center justify-center w-full">
          <TextHeader text="Our" highlightedText="Products" btn={false} center={true} />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          {/* Sidebar */}
          <aside className="bg-primary-light p-6 rounded-lg h-fit">
            <h3 className="text-xl font-semibold mb-6">Filters:</h3>

            {/* Availability */}
            <div className="mb-8">
              <h4 className="font-semibold mb-3">Availability</h4>

              <div className="space-y-2 text-sm">
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
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <div
                  key={item}
                  className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <div className="aspect-square rounded mb-4 flex items-center justify-center">
                    <Image
                      src={"/images/shop/shop1.png"}
                      height={250}
                      width={200}
                      alt="shop"
                    />
                  </div>

                  <h3 className="text-xl line-clamp-2 font-medium mb-2">
                    Savourlife Australian Peanut Butter Biscuits
                  </h3>

                  <div className="text-yellow-500 mb-2">★★★★★</div>

                  <p className="font-semibold text-base text-text-light">
                    $ 13.50 AUD
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopLayout;
