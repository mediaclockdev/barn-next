import AboutSection from "@/src/components/landing/About";
import Blog from "@/src/components/landing/Blog";
import Hero from "@/src/components/landing/Hero";
import OnSale from "@/src/components/landing/OnSale";
import ShopBy from "@/src/components/landing/ShopBy";

const page = () => {
  return (
    <>
      <Hero />
      <ShopBy />
      <AboutSection />
      <OnSale />
      <Blog />
    </>
  );
};

export default page;
