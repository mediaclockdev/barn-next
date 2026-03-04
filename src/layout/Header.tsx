"use client";

import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import { FaArrowCircleRight, FaFire } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from "react-icons/cg";
import Button from "../components/ui/Button";

const Header = () => {
  const [active, setActive] = useState<number>(1);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState(false);

  const pages = [
    { name: "Home", href: "#", id: 1 },
    { name: "About Us", href: "#", id: 2 },
    { name: "Shop", href: "#", id: 3 },
    { name: "Deals To Steal", href: "#", id: 4, icon: FaFire },
  ];

  const closeMenu = () => {
    setIsClosing(true);

    setTimeout(() => {
      setShowMenu(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <>
      <header className="w-full shadow-md bg-white">
        <div className="container mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={90} height={80} />
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {pages.map((item) => {
              const activeLink = active === item.id;
              const Icon = item.icon;

              return (
                <Link
                  href={item.href}
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`text-text-muted hover:text-text text-base ${activeLink ? "bg-primary text-white rounded-full py-2 px-4 font-medium" : ""} flex gap-2 items-center`}
                >
                  {item.name}
                  {Icon && <Icon className="text-red-500/80 text-base" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Button text="Contact Us" icon={FaArrowCircleRight} />

            <div className="flex items-center gap-4 text-gray-600">
              <FiSearch className="text-lg cursor-pointer hover:text-black" />
              <FiUser className="text-lg cursor-pointer hover:text-black" />
              <FiShoppingCart className="text-lg cursor-pointer hover:text-black" />
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
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      setActive(item.id);
                      closeMenu();
                    }}
                    className="flex items-center justify-between text-base py-2 border-b border-gray-100"
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
              <Button text="Contact Us" icon={FaArrowCircleRight} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
