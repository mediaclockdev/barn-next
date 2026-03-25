import Image from "next/image";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-blue-50 via-transparent to-gray-50">
      <div className="container mx-auto px-4 lg:px-0 py-5 pb-2">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10 lg:px-5">
          {/* LOGO + DESCRIPTION */}
          <div>
            <Link href="/">
              <Image src="/logo.svg" alt="logo" width={100} height={100} />
            </Link>

            <p className="mt-5 text-base text-gray-600 leading-relaxed max-w-xs lg:w-[80%]">
              At Barn, we believe every animal deserves quality care, attention,
              and supplies.
            </p>
          </div>

          {/* CONNECT */}
          <div className="lg:w-[80%]">
            <h3 className="text-2xl font-semibold mb-5">Connect</h3>

            <div className="text-base space-y-1 text-gray-700">
              <p>
                <span className="font-medium">Mon – Thurs:</span> 10am – 6pm
              </p>
              <p>
                <span className="font-medium">Fri:</span> 8:30am – 7pm
              </p>
              <p>
                <span className="font-medium">Sat:</span> 9am – 2pm
              </p>
              <p>
                <span className="font-medium">Sun:</span> Closed
              </p>
            </div>

            <div className="flex gap-3 mt-3 flex-wrap">
              <Image
                src="/images/payment/pay1.svg"
                width={40}
                height={30}
                alt="payment"
              />
              <Image
                src="/images/payment/pay2.svg"
                width={30}
                height={30}
                alt="payment"
              />
              <Image
                src="/images/payment/pay3.svg"
                width={20}
                height={30}
                alt="payment"
              />
              <Image
                src="/images/payment/pay4.svg"
                width={60}
                height={30}
                alt="payment"
              />
              <Image
                src="/images/payment/pay5.svg"
                width={32}
                height={30}
                alt="payment"
              />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-2xl font-semibold mb-5">Quick Links</h3>

            <ul className="space-y-3 text-base ">
              {[
                { href: "/about-us", label: "About Us" },
                { href: "/shop", label: "Shop" },
                { href: "/deals", label: "Deals" },
                { href: "/blog", label: "Blog" },
                { href: "/contact-us", label: "Contact Us" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-3 relative w-fit"
                  >
                    <span className="relative text-base">
                      {label}
                      {/* underline */}
                      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>

            {/* Address */}
            <div className="flex items-start gap-1 mb-4 max-w-xs lg:w-[80%]">
              <div className="p-2">
                <FaLocationDot className="text-gray-800" />
              </div>
              <p className="text-gray-800">
                62–76 Kilmore road 
                Heathcote VIC 3523
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-1 mb-6">
              <div className="p-2 ">
                <FaPhoneAlt className="text-gray-800" />
              </div>
              <p className=" font-medium hover:text-black transition">
                0412 713 501
              </p>
            </div>

            {/* Socials */}
            <div className="flex gap-2 items-center">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-xl bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white hover:scale-105 transition">
                <FaInstagram size={22} />
              </a>

              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 text-white hover:scale-105 transition">
                <FaFacebookF size={22} />
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-700 text-white hover:scale-105 transition">
                <FaLinkedinIn size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-200 mt-5 pt-3 text-center">
          <p className="text-sm">
            © 2026{" "}
            <span className="font-semibold">The Barn Pet Stock and Feed</span>
            <span className="mx-3 text-gray-400">|</span>
            <Link href="/privacy-policy" className="relative group mx-1">
              Privacy Policy
              <span className="absolute left-0 -bottom-1 h-[1.5px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
            <span className="mx-3 text-gray-400">|</span>
            <Link href="/terms-and-conditions" className="relative group mx-1">
              Terms
              <span className="absolute left-0 -bottom-1 h-[1.5px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
