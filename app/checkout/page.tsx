import CheckoutForm from "@/src/components/checkout/CheckoutForm";
import CheckoutSummary from "@/src/components/checkout/CheckoutSummary";

export const metadata = {
  title: "Secure Checkout - Mediaclock",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:pt-0">
      <div className="flex-1 w-full max-w-[1440px] mx-auto flex flex-col-reverse lg:flex-row shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-white overflow-hidden lg:rounded-b-3xl">
        {/* Left Col: Forms (Expands) */}
        <div className="flex-1 xl:pr-16 bg-white min-h-screen p-4">
          <CheckoutForm />
        </div>

        {/* Right Col: Summary Sidebar */}
        <div className="w-full lg:w-[480px] xl:w-[540px] shrink-0 border-l border-gray-200 bg-gray-50">
          <div className="lg:sticky lg:top-0 h-full">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
