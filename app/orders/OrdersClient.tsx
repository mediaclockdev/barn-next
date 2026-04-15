"use client";

import useAuthStore from "@/src/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiBox,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiPackage,
  FiShoppingBag,
  FiArrowLeft,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

interface OrderItem {
  product_id: number;
  name: string;
  quantity: number;
  price: string;
  subtotal: string;
  total: string;
  sku: string;
  image: string;
}

interface Order {
  id: number;
  status: string;
  currency: string;
  total: string;
  subtotal: number;
  discount_total: string;
  shipping_total: string;
  tax_total: string;
  payment_method: string;
  date: string;
  billing: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  shipping: {
    name: string;
    address: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  items: OrderItem[];
}

export default function OrdersClient() {
  const { user, hasHydrated } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (hasHydrated && !user) {
      router.replace("/login?redirect=/orders");
    }
  }, [hasHydrated, user, router]);

  useEffect(() => {
    if (!hasHydrated) return;

    const controller = new AbortController();

    const fetchOrders = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/orders/user?customer_id=${user.id}`, {
          signal: controller.signal,
        });
        const data = await res.json();

        if (res.ok) {
          setOrders(data.orders || []);
        } else {
          toast.error(data.message || "Failed to fetch orders");
        }
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("Error fetching orders:", error);
        toast.error("An error occurred while fetching orders.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    if (user) {
      void fetchOrders();
    } else {
      setIsLoading(false);
    }

    return () => controller.abort();
  }, [hasHydrated, user]);

  if (!hasHydrated || (isLoading && user)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending":
      case "on-hold":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "cancelled":
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <FiCheckCircle className="text-green-600" />;
      case "processing":
        return <FiPackage className="text-blue-600" />;
      case "pending":
      case "on-hold":
        return <FiClock className="text-yellow-600" />;
      case "cancelled":
      case "failed":
        return <FiXCircle className="text-red-600" />;
      default:
        return <FiBox className="text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  // Determine delivery method from shipping address
  const getDeliveryMethod = (order: Order) => {
    if (order.shipping?.address && order.shipping.address.trim() !== "") {
      return {
        label: "Home Delivery",
        icon: <FiPackage className="text-primary" />,
      };
    }
    return { label: "Store Pickup", icon: <FiBox className="text-primary" /> };
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 py-4">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-6 font-medium text-md"
        >
          <FiArrowLeft /> Back to Profile
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FiShoppingBag className="text-primary text-2xl" />
            My Orders
          </h1>
          <p className="text-gray-500 mt-2 text-lg font-medium">
            View and track your previous purchases.
          </p>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-gray-500 font-medium">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiBox className="text-4xl text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500 mb-8 text-md max-w-md mx-auto">
              Looks like you haven&apos;t made any purchases yet. Explore our
              shop and find something you love!
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const delivery = getDeliveryMethod(order);
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                          Order Number
                        </p>
                        <p className="font-bold text-gray-900">#{order.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                          Date
                        </p>
                        <p className="font-bold text-gray-900">
                          {formatDate(order.date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                          Total
                        </p>
                        <p className="font-bold text-primary">
                          ${parseFloat(order.total).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                          Delivery Method
                        </p>
                        <div className="font-bold text-gray-900 flex items-center gap-1.5">
                          {delivery.icon}
                          <span>{delivery.label}</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`px-4 py-1.5 rounded-full border text-sm font-bold flex items-center gap-2 ${getStatusColor(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                      Items in Order
                    </h4>
                    <div className="space-y-4">
                      {order.items?.map((item) => (
                        <div
                          key={item.product_id}
                          className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0 last:pb-0"
                        >
                          <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-gray-100 relative">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            ) : (
                              <FiBox className="text-2xl text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-gray-900 line-clamp-1">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="font-bold text-gray-900">
                            ${parseFloat(item.total).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                      <Link
                        href={`/contact-us?order=${order.id}`}
                        className="text-sm font-bold text-primary hover:text-primary-dark hover:underline flex items-center gap-1"
                      >
                        Need help with this order?
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
