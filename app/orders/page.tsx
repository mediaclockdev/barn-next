import OrdersClient from "./OrdersClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | Barn",
  description: "View your order history.",
};

export default function OrdersPage() {
  return <OrdersClient />;
}
