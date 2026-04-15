import Image from "next/image";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaPhoneAlt,
  FaRegClock,
} from "react-icons/fa";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-blue-50 via-transparent to-gray-50">
      <div className="container mx-auto px-4 lg:px-0 py-5 pb-2">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 lg:px-5">
          {/* LOGO + DESCRIPTION + SOCIALS + PAYMENTS */}
          <div>
            <Link href="/">
              <Image src="/logo.svg" alt="logo" width={100} height={100} />
            </Link>

            <p className="mt-5 text-base text-gray-600 leading-relaxed max-w-xs lg:w-[80%]">
              At Barn, we believe every animal deserves quality care, attention,
              and supplies.
            </p>

            {/* Payments */}
            <div className="flex gap-2.5 mt-5 flex-wrap items-center">
              <Image
                src="/images/payment/pay1.svg"
                width={46}
                height={26}
                alt="payment"
              />
              <Image
                src="/images/payment/pay2.svg"
                width={35}
                height={26}
                alt="payment"
              />
              <Image
                src="/images/payment/pay3.svg"
                width={23}
                height={26}
                alt="payment"
              />
              <Image
                src="/images/payment/pay4.svg"
                width={70}
                height={26}
                alt="payment"
              />
              <Image
                src="/images/payment/pay5.svg"
                width={40}
                height={26}
                alt="payment"
              />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Quick Links</h3>

            <ul className="space-y-3 text-base">
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
            <div className="flex items-start gap-3 mb-4 max-w-xs lg:w-[80%]">
              <div className="mt-1">
                <FaLocationDot className="text-gray-800 text-lg" />
              </div>
              <p className="text-gray-800">
                62–76 Kilmore road Heathcote VIC 3523
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 mb-6">
              <div>
                <FaPhoneAlt className="text-gray-800 text-lg" />
              </div>
              <p className="font-medium hover:text-black transition">
                0412 713 501
              </p>
            </div>

            {/* Socials */}
            <div className="flex gap-2 items-center mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white hover:scale-105 transition shadow-sm"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 text-white hover:scale-105 transition shadow-sm"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-700 text-white hover:scale-105 transition shadow-sm"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* CONNECT (TIMINGS) */}
          <div className="lg:w-[90%]">
            <h3 className="text-2xl font-semibold mb-6">Connect</h3>

            <div className="text-base space-y-3 text-gray-700">
              <div className="flex items-start gap-3">
                <FaRegClock className="text-gray-800 mt-1 shrink-0 text-lg" />
                <p>
                  <span className="font-medium">Mon – Thurs:</span> 10am – 6pm
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FaRegClock className="text-gray-800 mt-1 shrink-0 text-lg" />
                <p>
                  <span className="font-medium">Fri:</span> 8:30am – 7pm
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FaRegClock className="text-gray-800 mt-1 shrink-0 text-lg" />
                <p>
                  <span className="font-medium">Sat:</span> 9am – 2pm
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FaRegClock className="text-gray-800 mt-1 shrink-0 text-lg" />
                <p>
                  <span className="font-medium">Sun:</span> Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-200 mt-8 pt-4 pb-2 text-center">
          <p className="text-sm">
            © 2026{" "}
            <span className="font-semibold">The Barn Pet Stock and Feed</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
