import React from "react";

const SortBy = () => {
  return (
    <div className="bg-primary-light px-6 py-3 rounded mb-8 flex justify-center items-center">
      <div className="flex items-center gap-3 text-sm">
        <span className="text-base">Sort By:</span>

        <select className="border rounded px-3 py-1 bg-white cursor-pointer">
          <option>Featured</option>
          <option>Price Low to High</option>
          <option>Price High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default SortBy;
