// import StripeCheckoutWrapper from "@/src/components/checkout/StripeCheckoutWrapper";
import PayPalCheckoutWrapper from "@/src/components/checkout/PayPalCheckoutWrapper";

export const metadata = {
  title: "Secure Checkout - Mediaclock",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:pt-0">
      {/* <StripeCheckoutWrapper /> */}
      <PayPalCheckoutWrapper />
    </div>
  );
}
