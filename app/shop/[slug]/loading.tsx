import React from "react";

export default function Loading() {
  return (
    <div className="container px-4 lg:px-0 pt-2! pb-20 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-8 bg-gray-200 rounded w-50 m-8"></div>

      {/* Product Skeleton */}
      <div className="grid lg:grid-cols-2 gap-10 items-start justify-center max-w-6xl mx-auto my-10">
        {/* Left: Image Skeleton */}
        <div className="flex flex-col gap-4">
          <div className="w-full aspect-square bg-gray-200 rounded-2xl"></div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-lg"
              ></div>
            ))}
          </div>
        </div>

        {/* Right: Info Skeleton */}
        <div className="flex flex-col gap-4 lg:py-6">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-2/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>

          <div className="flex flex-col gap-3 mt-4">
            <div className="h-6 bg-gray-200 rounded w-1/5"></div>
            <div className="flex gap-5">
              <div className="h-12 bg-gray-200 rounded-full w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded w-full mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
