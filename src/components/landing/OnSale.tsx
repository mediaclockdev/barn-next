import { productData } from "@/src/data/Hero";
import TextHeader from "@/src/utils/TextHeader";
import Image from "next/image";
import Button from "../ui/Button";
import { FaArrowCircleRight } from "react-icons/fa";

type Props = {};

const OnSale = (props: Props) => {
  return (
    <section className="relative overflow-hidden min-h-dvh flex flex-col items-center justify-center w-full">
      <div className="container">
        <TextHeader text="Product" highlightedText="On Sale" />

        <div className="my-5 w-full">
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-5">
            {productData.map((item) => {
              return (
                <div
                  key={item.id}
                  className="relative rounded-xl bg-bg-light flex flex-col items-center justify-center p-5 pb-12 cursor-pointer"
                >
                  <div className="bg-primary w-15 h-14.5 flex items-center justify-center rounded-full absolute top-4 left-5">
                    <h5 className="font-bold text-white tracking-wide">Sale</h5>
                  </div>

                  <div className="relative w-40 h-44 mb-4">
                    <Image
                      src={item.url}
                      alt="image"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <h4 className="text-center mb-2 font-semibold text-xl">
                      {item.name}
                    </h4>
                    <div className="flex items-center justify-center flex-col gap-1 mb-2">
                      <p>${item.weight} kg Pack</p>
                      <p>
                        $<span className="line-through"> {item.price} AUD</span>
                        <span> {item.actualPrice} AUD</span>
                      </p>
                    </div>
                    <Button text="Add To Card" icon={FaArrowCircleRight} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnSale;
