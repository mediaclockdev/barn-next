import Image from "next/image";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaCcVisa,
  FaCcPaypal,
  FaGooglePay,
  FaApplePay,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-300 relative overflow-hidden">
      <div className="container mx-auto py-12 pb-4 relative px-4 lg:px-0">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div className="hidden md:block relative">
            <Image
              src="/images/footer/footerBg.png"
              alt="Coffee Beans"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>

          <div>
            <h3 className="font-semibold text-2xl mb-4">Contact Us</h3>

            <p className="text-base ">
              62–76 Kilmore Road,
              <br />
              Heathcote VIC 3523
            </p>

            <p className="mt-3 text-base ">0412 713 501</p>

            <div className="mt-4 text-base  space-y-1">
              <p>
                <span className="font-medium">Mon – Thurs:</span> 10am– 6pm
              </p>
              <p>
                <span className="font-medium">Fri:</span> 8:30am – 7:00 pm
              </p>
              <p>
                <span className="font-medium">Sat:</span> 9am – 2pm
              </p>
              <p>
                <span className="font-medium">Sun:</span> Closed
              </p>
            </div>

            {/* Payment Icons */}
            <div className="flex gap-3 mt-6 flex-wrap">
              <Image
                src={"/images/payment/pay1.svg"}
                width={45}
                height={50}
                alt="Payment"
              />
              <Image
                src={"/images/payment/pay2.svg"}
                width={35}
                height={50}
                alt="Payment"
              />
              <Image
                src={"/images/payment/pay3.svg"}
                width={22}
                height={50}
                alt="Payment"
              />

              <Image
                src={"/images/payment/pay4.svg"}
                width={70}
                height={50}
                alt="Payment"
              />

              <Image
                src={"/images/payment/pay5.svg"}
                width={40}
                height={50}
                alt="Payment"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-2xl mb-4">Quick Links</h3>

            <ul className="space-y-2 text-base ">
              <li className="hover:text-black cursor-pointer">Shop</li>
              <li className="hover:text-black cursor-pointer">Contact Us</li>
              <li className="hover:text-black cursor-pointer">About Us</li>
              <li className="hover:text-black cursor-pointer">FAQs</li>
              <li className="hover:text-black cursor-pointer">
                Shipping Policy
              </li>
              <li className="hover:text-black cursor-pointer">
                Terms & Conditions
              </li>
              <li className="hover:text-black cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t border-gray-400 px-5">
          <p className="text-base  text-center font-semibold md:text-left">
            © 2026,{" "}
            <span className="underline underline-offset-2">
              The Barn Pet Stock and Feed
            </span>
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a className="w-8 h-8 flex items-center justify-center rounded-md bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white">
              <FaInstagram size={24} />
            </a>

            <a className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-600 text-white">
              <FaFacebookF size={24} />
            </a>

            <a className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-700 text-white">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
