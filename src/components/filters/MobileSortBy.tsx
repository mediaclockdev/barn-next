import { FaAngleDown } from "react-icons/fa6";

const MobileSort = () => {
  return (
    <div className="relative w-full">
      <select className="w-full pl-3 pr-8 py-3 text-sm font-medium bg-transparent appearance-none focus:outline-none cursor-pointer">
        <option>Featured</option>
        <option>Price Low to High</option>
        <option>Price High to Low</option>
      </select>

      <FaAngleDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
      />
    </div>
  );
};

export default MobileSort;
