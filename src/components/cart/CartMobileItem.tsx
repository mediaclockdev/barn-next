import Image from "next/image";
import Link from "next/link";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaTimesCircle } from "react-icons/fa";

export interface HydratedCartItem {
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
  slug: string;
  maxQuantity?: number;
  variation_id?: number;
  variation_name?: string;
}

interface CartMobileItemProps {
  item: HydratedCartItem;
  isLoading: boolean;
  onUpdateQuantity: (
    id: number,
    quantity: number,
    variation_id?: number,
  ) => void;
  onRemoveItem: (id: number, variation_id?: number) => void;
}

const CartMobileItem: React.FC<CartMobileItemProps> = ({
  item,
  isLoading,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm relative">
      <div className="flex gap-4">
        <Link href={`/shop/${item.product_id}`} className="shrink-0">
          <div className="border border-gray-100 rounded-lg p-1 bg-white">
            <Image
              src={item.image}
              alt={item.name}
              width={70}
              height={70}
              className="object-cover rounded"
            />
          </div>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <Link href={`/shop/${item.product_id}`} className="truncate">
              <h4 className="font-semibold text-gray-800 hover:text-primary transition-colors truncate">
                {item.name.replace(/&amp;/g, "and")}
              </h4>
            </Link>
            <button
              onClick={() => onRemoveItem(item.product_id, item.variation_id)}
              className="text-gray-300 hover:text-red-500 transition-colors shrink-0"
            >
              <FaTimesCircle size={18} />
            </button>
          </div>

          {item.variation_name && (
            <p className="text-xs text-gray-500 mt-0.5">
              {item.variation_name}
            </p>
          )}

          <p className="text-sm font-medium text-gray-500 mt-1">
            ${item.price.toFixed(2)}
          </p>

          <div className="flex items-end justify-between mt-3">
            <div className="flex items-center justify-center gap-1">
              <button
                onClick={() =>
                  onUpdateQuantity(
                    item.product_id,
                    item.quantity - 1,
                    item.variation_id,
                  )
                }
                disabled={item.quantity <= 1 || isLoading}
                className="w-7 h-7 rounded bg-gray-100 text-gray-600 flex items-center justify-center cursor-pointer disabled:opacity-50 hover:bg-gray-200 transition-colors"
              >
                <FiMinus />
              </button>

              <span className="w-8 text-center font-semibold text-gray-800 text-sm">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  onUpdateQuantity(
                    item.product_id,
                    item.quantity + 1,
                    item.variation_id,
                  )
                }
                disabled={
                  item.quantity >= (item.maxQuantity ?? 99) || isLoading
                }
                className="w-7 h-7 rounded bg-gray-100 text-gray-600 flex items-center justify-center cursor-pointer disabled:opacity-50 hover:bg-gray-200 transition-colors"
              >
                <FiPlus />
              </button>
            </div>

            <span className="font-semibold text-primary">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMobileItem;
