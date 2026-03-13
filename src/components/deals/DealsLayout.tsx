import { dealsCardData, productCardData } from "@/src/data/Data";
import TextHeader from "@/src/utils/TextHeader";
import ProductCard from "../cards/ProductCard";
import Filters from "../filters/Filters";
import SortBy from "../filters/SortBy";
import BreadCrumb from "../misc/BreadCrumb";

const DealsLayout = () => {
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

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          <aside className="rounded-lg h-fit">
            <Filters price={true} />
          </aside>

          <div>
            <SortBy />

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
      </div>
    </section>
  );
};

export default DealsLayout;
