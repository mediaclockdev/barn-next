import { categoryData } from "@/src/data/Hero";
import TextHeader from "@/src/utils/TextHeader";
import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";
import { FaArrowCircleRight } from "react-icons/fa";

type Props = {};

const ShopBy = (props: Props) => {
  return (
    <section className="relative overflow-hidden min-h-dvh flex flex-col items-center justify-center w-full">
      <div className="container">
        <TextHeader text="Shop By" highlightedText="Category" />

        <div className="my-5 w-full">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            {categoryData.map((item) => {
              return (
                <div
                  key={item.id}
                  className="rounded-xl bg-bg-light flex flex-col items-center justify-center p-3 pb-7 cursor-pointer"
                >
                  <div className="relative w-40 h-37.5 mb-4">
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
                    <Link href={item.to}>
                      <Button text="Shop Now" icon={FaArrowCircleRight} />
                    </Link>
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

export default ShopBy;
