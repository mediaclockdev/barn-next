import { productCardData } from "@/src/data/Data";
import TextHeader from "@/src/utils/TextHeader";
import Image from "next/image";
import ProductCard from "../cards/ProductCard";

type Props = {};

const DealsLayout = (props: Props) => {
  const filteredDiscountedData = productCardData.filter(
    (item) => item.discountedPrice,
  );

  return (
    <section className="min-h-dvh w-full bg-gray-100 py-10">
      <div className="container mx-auto">
        <TextHeader
          text="Hot Deals"
          highlightedText="For You"
          btn={false}
          center={true}
        />
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          <aside className="bg-primary-light h-fit rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6">Filters:</h3>

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

            <div className="mb-8">
              <h4 className="font-semibold mb-3">Price</h4>

              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  High to Low
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Low to High
                </label>
              </div>
            </div>
          </aside>

          <div>
            <div className="bg-primary-light px-6 py-3 rounded mb-8 flex justify-end">
              <div className="flex items-center gap-3 text-sm">
                <span>Sort By:</span>

                <select className="border rounded px-3 py-1 bg-white">
                  <option>Featured</option>
                  <option>Price Low to High</option>
                  <option>Price High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {filteredDiscountedData.map((item) => {
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
      </div>
    </section>
  );
};

export default DealsLayout;
