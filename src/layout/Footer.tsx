import Image from "next/image";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 lg:px-0 py-5">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10 px-5">
          {/* LOGO + DESCRIPTION */}
          <div>
            <Link href="/">
              <Image src="/logo.svg" alt="logo" width={100} height={100} />
            </Link>

            <p className="mt-5 text-base text-gray-600 leading-relaxed max-w-sm">
              At Barn, we believe that every animal deserves the best care and
              attention. From quality feed to pet supplies, grooming tools to
              riding apparel and accessories, we have everything you need to
              keep your horse happy and healthy.
            </p>
          </div>

          {/* CONNECT */}
          <div>
            <h3 className="text-2xl font-semibold mb-5">Connect</h3>

            <div className="flex gap-3 mb-5">
              <a className="w-9 h-9 flex items-center justify-center rounded-md bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white">
                <FaInstagram size={22} />
              </a>

              <a className="w-9 h-9 flex items-center justify-center rounded-md bg-blue-600 text-white">
                <FaFacebookF size={22} />
              </a>

              <a className="w-9 h-9 flex items-center justify-center rounded-md bg-blue-700 text-white">
                <FaLinkedinIn size={22} />
              </a>
            </div>

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
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-2xl font-semibold mb-5">Quick Links</h3>

            <ul className="space-y-2 text-base text-gray-700">
              <li>
                <Link href="/shop" className="hover:text-black">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-black">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-black">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-black">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-black">
                  Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-2xl font-semibold mb-5">Contact Us</h3>

            <p className="text-base text-gray-700 leading-">
              62–76 Kilmore Road <br />
              Heathcote VIC 3523
            </p>

            <p className="mt-3 text-base font-medium text-gray-800">
              0412 713 501
            </p>

            {/* PAYMENT */}
            <div className="flex gap-3 mt-6 flex-wrap">
              <Image
                src="/images/payment/pay1.svg"
                width={45}
                height={30}
                alt="payment"
              />
              <Image
                src="/images/payment/pay2.svg"
                width={35}
                height={30}
                alt="payment"
              />
              <Image
                src="/images/payment/pay3.svg"
                width={22}
                height={30}
                alt="payment"
              />
              <Image
                src="/images/payment/pay4.svg"
                width={70}
                height={30}
                alt="payment"
              />
              <Image
                src="/images/payment/pay5.svg"
                width={40}
                height={30}
                alt="payment"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-300 mt-12 pt-6 text-center md:text-left">
          <p className="text-base text-gray-700">
            © 2026{" "}
            <span className="font-semibold underline underline-offset-2">
              The Barn Pet Stock and Feed
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
