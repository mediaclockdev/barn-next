import Image from "next/image";
import Button from "../ui/Button";
import { FaCartPlus } from "react-icons/fa";
import Link from "next/link";
import { WooCommerceProduct } from "@/src/utils/woocommerce";
import useCartStore from "@/src/store/cartStore";
import toast from "react-hot-toast";

type Props = {
  product: WooCommerceProduct;
};

const OnSaleCard: React.FC<Props> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await addItem(product.id, 1);
      toast.success("Added to cart!");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const imageUrl = product.images?.[0]?.src || "/images/shop/shop1.png";
  const name = product.name || "Product Name";
  const weight = product.weight ? `${product.weight} kg Pack` : "Standard Pack";
  
  const regularPrice = product.regular_price || product.price || "0";
  const salePrice = product.sale_price || product.price || "0";

  return (
    <Link href={`/shop/${product.slug}`} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 flex flex-col overflow-hidden h-full">
      {/* SALE BADGE */}
      <span className="absolute top-2 left-2 bg-primary text-white text-base font-semibold h-12 w-12 flex items-center justify-center rounded-full z-10">
        Sale
      </span>

      {/* IMAGE */}
      <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center p-6">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-5 text-center bg-gray-200">
        <h4 className="font-semibold text-lg line-clamp-2 mb-1">{name}</h4>

        <p className="text-base text-text font-medium mb-2">{weight}</p>

        <div className="mb-4">
          <span className="text-text-muted line-through mr-2 text-sm">
            ${regularPrice} AUD
          </span>

          <span className="text-primary font-bold text-lg">
            ${salePrice} AUD
          </span>
        </div>

        <div className="mx-auto" onClick={(e) => e.preventDefault()}>
          <Button text="Add To Cart" icon={FaCartPlus} onClick={handleAddToCart} />
        </div>
      </div>
    </Link>
  );
};

export default OnSaleCard;
