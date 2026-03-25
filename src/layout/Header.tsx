"use client";

import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import { FaPaperPlane, FaFire } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from "react-icons/cg";
import Button from "../components/ui/Button";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/src/store/cartStore";

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathName = usePathname();
  const totalItems = useCartStore((state) => state.totalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  const pages = [
    { name: "Home", href: "/", id: 1 },
    { name: "About Us", href: "/about-us", id: 2 },
    { name: "Shop", href: "/shop", id: 3 },
    { name: "Deals To Steal", href: "/deals", id: 4, icon: FaFire },
    { name: "Contact Us", href: "/contact-us", id: 5 },
  ];

  const closeMenu = () => {
    setIsClosing(true);

    setTimeout(() => {
      setShowMenu(false);
      setIsClosing(false);
    }, 300);
  };

  const isCartActive = pathName === "/cart";

  return (
    <>
      <header
        ref={headerRef}
        className={`w-full shadow-md bg-white sticky top-0 z-40 transition-all duration-300`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image src="/logo.svg" alt="logo" width={90} height={80} />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {pages.map((item) => {
              const activeLink =
                item.href === "/"
                  ? pathName === "/"
                  : pathName.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-base transition-colors font-medium ${
                    activeLink
                      ? "bg-primary text-white font-medium"
                      : "text-slate-800 hover:text-black hover:bg-primary-light/20"
                  }`}
                >
                  {item.name}
                  {Icon && <Icon className="text-red-500/80 text-base" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-gray-700">
              <FiSearch className="text-xl cursor-pointer hover:text-black" />
              <Link href="/login">
                <FiUser className="text-xl cursor-pointer hover:text-black" />
              </Link>
              <Link href="/cart" className="relative">
                <FiShoppingCart
                  className={`text-xl cursor-pointer hover:text-black ${isCartActive && "text-cyan-500"}`}
                />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-[50%] -right-[50%] text-xs bg-red-500 font-bold text-white w-4 h-4 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <button
            className="lg:hidden text-2xl"
            onClick={() => setShowMenu(true)}
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </header>

      {(showMenu || isClosing) && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => closeMenu()}
          />

          <div
            className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl p-6 flex flex-col gap-6 ${isClosing ? "animate-slideOut" : "animate-slideIn"}`}
          >
            <div className="flex justify-between items-center">
              <Image src={"/logo.svg"} alt="logo" width={80} height={60} />
              <button className="text-2xl" onClick={() => closeMenu()}>
                <CgClose />
              </button>
            </div>

            <nav className="flex flex-col gap-4 mt-6">
              {pages.map((item) => {
                const Icon = item.icon;
                const activeLink =
                  item.href === "/"
                    ? pathName === "/"
                    : pathName.startsWith(item.href);

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      closeMenu();
                    }}
                    className={`flex items-center justify-between text-base py-2 border-b border-gray-100 ${activeLink ? "text-black font-medium" : "text-gray-600 hover:text-black"}`}
                  >
                    <span className="flex items-center gap-2">
                      {item.name}
                      {Icon && <Icon className="text-red-500/80 text-base" />}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto">
              <Link href="/contact-us" onClick={() => closeMenu()}>
                <Button text="Contact Us" icon={FaPaperPlane} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
