import { productCardData } from "@/src/data/Data";
import TextHeader from "@/src/utils/TextHeader";
import ProductCard from "../cards/ProductCard";
import SortBy from "../filters/SortBy";
import CategoryFilter from "../filters/CategoryFilter";
import Filters from "../filters/Filters";
import BreadCrumb from "../misc/BreadCrumb";

const ShopLayout = () => {
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

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          <aside className="rounded-lg h-fit">
            <Filters />

            <CategoryFilter />
          </aside>

          <div>
            <SortBy />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
