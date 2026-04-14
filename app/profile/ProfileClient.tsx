"use client";

import useAuthStore from "@/src/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiBox,
  FiCheck,
  FiMapPin,
  FiChevronDown,
} from "react-icons/fi";
import Link from "next/link";
import toast from "react-hot-toast";

interface AddressDetails {
  first_name?: string;
  last_name?: string;
  company?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
}

interface CustomerProfile {
  id: number;
  email?: string;
  username?: string;
  shipping?: AddressDetails;
  first_name?: string;
  last_name?: string;
}

export default function ProfileClient() {
  const { user, hasHydrated } = useAuthStore();
  const router = useRouter();
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [shippingForm, setShippingForm] = useState<AddressDetails>({});

  useEffect(() => {
    if (hasHydrated && !user) {
      router.replace("/login?redirect=/profile");
    }
  }, [hasHydrated, user, router]);

  useEffect(() => {
    const userId = user?.id || (user as any)?.user_id || (user as any)?.wp_id;
    if (!hasHydrated || !userId) return;

    const controller = new AbortController();

    const fetchProfile = async () => {
      setIsLoadingProfile(true);

      try {
        const response = await fetch(`/api/profile?customer_id=${userId}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        const data = await response.json();

        if (response.ok) {
          setProfile(data.profile || null);
          const fallbackShipping = data.profile?.shipping?.address_1
            ? data.profile.shipping
            : undefined;
          if (fallbackShipping) {
            setShippingForm(fallbackShipping);
          }
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          toast.error("Failed to load profile.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingProfile(false);
        }
      }
    };

    void fetchProfile();

    return () => controller.abort();
  }, [hasHydrated, user]);

  if (!hasHydrated || (!user && !isLoadingProfile)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const userId = user?.id || (user as any)?.user_id || (user as any)?.wp_id;

  const activeProfile = profile
    ? {
        id: profile.id,
        email: profile.email || user?.email,
        username: profile.username || user?.username,
        first_name: profile.first_name || user?.first_name,
        last_name: profile.last_name || user?.last_name,
        shipping: profile.shipping,
      }
    : {
        id: userId ?? 0,
        email: user?.email,
        username: user?.username,
        first_name: user?.first_name,
        last_name: user?.last_name,
        shipping: undefined,
      };

  const handleUpdateShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setIsSavingAddress(true);
    try {
      const response = await fetch(`/api/profile?customer_id=${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shipping: shippingForm }),
      });
      const data = await response.json();

      if (response.ok) {
        setProfile(data.profile);
        setIsEditingAddress(false);
        toast.success("Shipping address updated!");
      } else {
        toast.error(data.message || "Failed to update shipping address");
      }
    } catch (err) {
      toast.error("An error occurred while saving.");
    } finally {
      setIsSavingAddress(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white py-10 min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-10">
          <h1 className="text-[28px] md:text-3xl font-bold text-gray-900">
            My Profile
          </h1>
          <p className="text-gray-600 mt-2 font-medium">
            Manage your account details and view your activity.
          </p>
        </div>

        {isLoadingProfile ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-[32px] overflow-hidden shadow-sm border border-gray-100 px-6 md:px-12 py-10 md:py-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {/* Account Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                  <FiUser className="text-[#42A1E8] text-2xl" /> Account
                  Information
                </h3>
                <div className="space-y-5">
                  <div className="bg-[#E5E3D8] bg-opacity-70 rounded-2xl p-5 py-4 border border-gray-200/30">
                    <p className="text-lg font-bold text-gray-800 mb-1.5">
                      Full Name
                    </p>
                    <p className="text-gray-600 font-medium">
                      {activeProfile.first_name || activeProfile.last_name
                        ? `${activeProfile.first_name || ""} ${activeProfile.last_name || ""}`.trim()
                        : "-"}
                    </p>
                  </div>
                  <div className="bg-[#E5E3D8] bg-opacity-70 rounded-2xl p-5 py-4 border border-gray-200/30">
                    <p className="text-lg font-bold text-gray-800 mb-1.5">
                      Email
                    </p>
                    <p className="text-gray-600 font-medium">
                      {activeProfile.email || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
                  <FiMapPin className="text-[#42A1E8] text-2xl" /> Quick Actions
                </h3>
                <div className="space-y-5">
                  {/* Order History Action */}
                  <Link
                    href="/orders"
                    className="flex items-center justify-between bg-[#E5E3D8] bg-opacity-70 rounded-2xl p-4 md:p-5 hover:bg-[#DCDAD0] transition-colors border border-gray-200/30 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md shrink-0">
                        <FiBox className="text-xl text-[#42A1E8]" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg leading-tight">
                          Order History
                        </p>
                        <p className="text-sm text-gray-600 mt-1 font-medium">
                          View and Track all your orders
                        </p>
                      </div>
                    </div>
                    <span className="text-[#42A1E8] text-md font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View &rarr;
                    </span>
                  </Link>

                  {/* Address Action */}
                  <button
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className="w-full text-left flex items-center justify-between bg-[#E5E3D8] bg-opacity-70 rounded-2xl p-4 md:p-5 hover:bg-[#DCDAD0] transition-colors border border-gray-200/30 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md shrink-0">
                        <FiMapPin className="text-xl text-[#42A1E8]" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg leading-tight">
                          Address
                        </p>
                        <p className="text-sm text-gray-600 mt-1 font-medium">
                          Manage shipping & billing
                        </p>
                      </div>
                    </div>
                    <span className="text-[#42A1E8] text-md font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {isEditingAddress ? "Close" : "View"} &rarr;
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Address Edit Form */}
            {isEditingAddress && (
              <div className="mt-12 pt-10 border-t border-[#E5E3D8]">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2.5">
                  <FiMapPin className="text-[#42A1E8] text-2xl" /> Shipping
                  Detail
                </h3>
                <form
                  onSubmit={handleUpdateShipping}
                  className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={shippingForm.first_name || ""}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#42A1E8] focus:ring-2 focus:ring-[#42A1E8]/20 transition-all text-md font-medium"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={shippingForm.last_name || ""}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#42A1E8] focus:ring-2 focus:ring-[#42A1E8]/20 transition-all text-md font-medium"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address_1"
                      value={shippingForm.address_1 || ""}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#42A1E8] focus:ring-2 focus:ring-[#42A1E8]/20 transition-all mb-4 text-md font-medium"
                      placeholder="Street name, P.O. box, etc."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingForm.city || ""}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#42A1E8] focus:ring-2 focus:ring-[#42A1E8]/20 transition-all text-md font-medium"
                        placeholder="Sydney"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">
                        State
                      </label>
                      <div className="relative">
                        <select
                          name="state"
                          value={shippingForm.state || ""}
                          onChange={
                            handleFormChange as unknown as React.ChangeEventHandler<HTMLSelectElement>
                          }
                          className="w-full appearance-none px-4 py-3.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#42A1E8] focus:ring-2 focus:ring-[#42A1E8]/20 transition-all text-md font-medium text-gray-700 cursor-pointer"
                        >
                          <option value="" disabled hidden>
                            Select State
                          </option>
                          {[
                            "NSW",
                            "VIC",
                            "QLD",
                            "WA",
                            "SA",
                            "TAS",
                            "ACT",
                            "NT",
                          ].map((stateOption) => (
                            <option key={stateOption} value={stateOption}>
                              {stateOption}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <FiChevronDown />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">
                        Postcode
                      </label>
                      <input
                        type="text"
                        name="postcode"
                        value={shippingForm.postcode || ""}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#42A1E8] focus:ring-2 focus:ring-[#42A1E8]/20 transition-all text-md font-medium"
                        placeholder="2000"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-6 justify-end">
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress(false)}
                      className="px-6 py-3.5 text-gray-600 font-bold hover:bg-gray-200/50 rounded-xl transition-colors text-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingAddress}
                      className="px-8 py-3.5 bg-[#42A1E8] text-white font-bold rounded-xl hover:bg-[#328BCB] transition-all disabled:opacity-50 flex items-center gap-2 text-md shadow-md"
                    >
                      {isSavingAddress ? (
                        "Saving..."
                      ) : (
                        <>
                          <FiCheck className="text-lg" /> Save Address
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
