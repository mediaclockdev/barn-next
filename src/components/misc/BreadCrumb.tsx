"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadCrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const limitedSegments = pathSegments.slice(0, 1);

  return (
    <div className="container mx-auto px-3">
      <div className="flex items-center justify-start text-lg text-gray-600 gap-2 w-fit my-2 mt-5">
        <Link
          href="/"
          className="cursor-pointer hover:text-primary transition-colors"
        >
          Home
        </Link>
        {limitedSegments.map((segment, index) => {
          const href = "/" + limitedSegments.slice(0, index + 1).join("/");

          return (
            <span key={index} className="flex items-center gap-2">
              /
              <Link
                href={href}
                className="capitalize text-black cursor-pointer hover:text-primary transition-colors"
              >
                {segment.replace("-", " ")}
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default BreadCrumb;
