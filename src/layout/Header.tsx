"use client";

import { FiSearch, FiUser, FiShoppingCart, FiLogOut } from "react-icons/fi";
import { FaPaperPlane, FaFire } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from "react-icons/cg";
import Button from "../components/ui/Button";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/src/store/cartStore";
import useAuthStore from "@/src/store/authStore";

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathName = usePathname();
  const router = useRouter();
  const totalItems = useCartStore((state) => state.totalItems());
  const clearCart = useCartStore((state) => state.clearCart);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setShowMenu(false); // Close mobile menu if open
    }
  };

  const isCartActive = pathName === "/cart";

  return (
    <>
      <header
        ref={headerRef}
        className={`w-full shadow-md bg-white sticky top-0 z-40 transition-all duration-300`}
      >
        <div className="container mx-auto px-6 h-22 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image src="/logo.svg" alt="logo" width={120} height={120} />
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
              <div className="relative flex items-center h-8">
                {isSearchOpen ? (
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 shadow-inner absolute right-0 min-w-[200px] border border-gray-200"
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      className="bg-transparent outline-none text-sm w-full text-black placeholder:text-gray-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <CgClose
                      className="text-sm cursor-pointer text-gray-400 hover:text-black ml-1 shrink-0"
                      onClick={() => setIsSearchOpen(false)}
                    />
                  </form>
                ) : (
                  <FiSearch
                    className="text-xl cursor-pointer hover:text-black"
                    onClick={() => setIsSearchOpen(true)}
                  />
                )}
              </div>

              {mounted && user ? (
                <button
                  title="Logout"
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="text-sm font-semibold text-red-500 hover:text-red-600 transition"
                >
                  <FiLogOut className="text-xl cursor-pointer hover:text-black" />
                </button>
              ) : (
                <Link href="/login" title="Login / Profile">
                  <FiUser className="text-xl cursor-pointer hover:text-black" />
                </Link>
              )}

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
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-gray-100 rounded-lg px-4 py-2 border border-gray-200 mb-2"
              >
                <FiSearch className="text-gray-500 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent outline-none text-base w-full text-black placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>

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

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsLogoutModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl transform transition-all">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-2 ring-8 ring-red-50/50">
                <FiLogOut className="text-2xl ml-1 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Sign Out</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Are you sure you want to sign out of your account? You will need
                to log back in to access your cart and orders.
              </p>
              <div className="flex items-center gap-3 w-full mt-4">
                <button
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors focus:ring-4 focus:ring-gray-100 outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsLogoutModalOpen(false);
                    logout();
                    clearCart();
                    router.push("/login");
                  }}
                  className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/80 transition-colors shadow-sm shadow-red-200 focus:ring-4 focus:ring-red-100 outline-none cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
