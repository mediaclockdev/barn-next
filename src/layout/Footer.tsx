import Image from "next/image";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-blue-50 via-transparent to-gray-50">
      <div className="container mx-auto px-4 lg:px-0 py-5 pb-2">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 lg:px-4">
          {/* LOGO + DESCRIPTION + SOCIALS + PAYMENTS */}
          <div>
            <Link href="/">
              <Image src="/logo.svg" alt="logo" width={120} height={120} />
            </Link>

            <p className="mt-5 text-base text-gray-900 leading-relaxed max-w-xs lg:w-[80%]">
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
            <h3 className="text-2xl font-semibold font-sans mb-6">
              Quick Links
            </h3>

            <ul className="space-y-3 text-base text-gray-900">
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
                    <span className="relative">
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
            <h3 className="text-2xl font-semibold font-sans mb-6">
              Contact Us
            </h3>

            {/* Address */}
            <a
              href="https://maps.app.goo.gl/eakWiGZmiMJntaLH8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 mb-4 max-w-xs lg:w-[80%] group hover:text-gray-700 transition-colors duration-300 ease-in-out"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-300 shrink-0 group-hover:border-gray-700 transition-colors duration-300 ease-in-out">
                <FaLocationDot className="text-gray-900 text-base group-hover:text-gray-700 transition-colors duration-300 ease-in-out" />
              </div>
              <p className="text-base text-gray-900 group-hover:text-gray-700 transition-colors duration-300 ease-in-out mt-1.5 lg:mt-0">
                62–76 Kilmore road Heathcote VIC 3523, Australia
              </p>
            </a>

            {/* Phone */}
            <a
              href="tel:0412713501"
              className="flex items-center gap-3 mb-6 group hover:text-gray-700 transition-colors duration-300 ease-in-out"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-300 shrink-0 group-hover:border-gray-700 transition-colors duration-300 ease-in-out">
                <FaPhoneAlt className="text-gray-900 text-base group-hover:text-gray-700 transition-colors duration-300 ease-in-out" />
              </div>
              <p className="text-base text-gray-900 group-hover:text-gray-700 transition-colors duration-300 ease-in-out">
                0412 713 501
              </p>
            </a>

            {/* Socials */}
            <div className="flex gap-2 items-center mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white hover:scale-105 transition shadow-sm"
              >
                <FaInstagram size={22} />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 text-white hover:scale-105 transition shadow-sm"
              >
                <FaFacebookF size={22} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-700 text-white hover:scale-105 transition shadow-sm"
              >
                <FaLinkedinIn size={22} />
              </a>
            </div>
          </div>

          {/* CONNECT (TIMINGS) */}
          <div className="lg:w-[90%]">
            <h3 className="text-2xl font-semibold font-sans mb-6">Connect</h3>

            <div className="text-base space-y-3 text-gray-900">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-300 shrink-0">
                  <FaClock className="text-gray-900 text-base" />
                </div>
                <p>
                  <span className="font-medium">Mon – Thurs:</span> 10am – 6pm
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-300 shrink-0">
                  <FaClock className="text-gray-900 text-base" />
                </div>
                <p>
                  <span className="font-medium">Fri:</span> 8:30am – 7pm
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-300 shrink-0">
                  <FaClock className="text-gray-900 text-base" />
                </div>
                <p>
                  <span className="font-medium">Sat:</span> 9am – 2pm
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-300 shrink-0">
                  <FaClock className="text-gray-900 text-base" />
                </div>
                <p>
                  <span className="font-medium">Sun:</span> Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-200 mt-8 pt-4 pb-2 text-center">
          <p className="text-base text-gray-900">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold">The Barn Pet Stock and Feed</span> |
            Designed and Developed by{" "}
            <a
              href="https://www.itserviceshobart.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              IT Services Hobart
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
