import { productData } from "@/src/data/Data";
import TextHeader from "@/src/utils/TextHeader";
import Image from "next/image";
import Button from "../ui/Button";
import { FaArrowCircleRight } from "react-icons/fa";
import Link from "next/link";
type Props = {};

const OnSale = (props: Props) => {
  return (
    <section className="halfSection">
      <div className="container">
        <TextHeader text="Product" highlightedText="On Sale" url="/deals" />

        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productData.map((item) => {
            return (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 flex flex-col overflow-hidden"
              >
                {/* SALE BADGE */}
                <span className="absolute top-2 left-2 bg-primary text-white text-base font-semibold h-12 w-12 flex items-center justify-center rounded-full z-10">
                  Sale
                </span>

                {/* IMAGE SECTION */}
                <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-6">
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex flex-col flex-1 p-5 text-center bg-gray-200">
                  <h4 className="font-semibold text-lg line-clamp-2 mb-1">
                    {item.name}
                  </h4>

                  <p className="text-base text-text font-medium mb-2">
                    {item.weight} kg Pack
                  </p>

                  {/* PRICE */}
                  <div className="mb-4">
                    <span className="text-text-muted line-through mr-2 text-sm">
                      ${item.price} AUD
                    </span>

                    <span className="text-primary font-bold text-lg">
                      ${item.actualPrice} AUD
                    </span>
                  </div>

                  {/* BUTTON */}
                  <div className="mx-auto">
                    <Link href={"/cart"}>
                      <Button
                        text="Add To Cart"
                        icon={FaArrowCircleRight}
                        className=""
                      />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OnSale;
