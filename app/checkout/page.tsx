import StripeCheckoutWrapper from "@/src/components/checkout/StripeCheckoutWrapper";

export const metadata = {
  title: "Secure Checkout - Mediaclock",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:pt-0">
      <StripeCheckoutWrapper />
    </div>
  );
}
