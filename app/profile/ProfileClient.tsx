"use client";

import useAuthStore from "@/src/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiUser, FiMail, FiBox, FiEdit2, FiCheck } from "react-icons/fi";
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
  user_email?: string;
  user_display_name?: string;
}

export default function ProfileClient() {
  const { user, logout, hasHydrated } = useAuthStore();
  const router = useRouter();
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [shippingForm, setShippingForm] = useState<AddressDetails>({});

  console.log("user ", user);

  useEffect(() => {
    if (hasHydrated && !user) {
      router.replace("/login?redirect=/profile");
    }
  }, [hasHydrated, user, router]);

  useEffect(() => {
    if (!hasHydrated || !user?.id) return;

    const controller = new AbortController();

    const fetchProfile = async () => {
      setIsLoadingProfile(true);

      try {
        const response = await fetch(`/api/profile?customer_id=${user.id}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        const data = await response.json();

        if (response.ok) {
          setProfile(data.profile || null);
          if (data.profile?.shipping) {
            setShippingForm(data.profile.shipping);
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
  }, [hasHydrated, user?.id]);

  if (!hasHydrated || (!user && !isLoadingProfile)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const activeProfile = profile ?? {
    id: user?.id ?? 0,
    email: user?.user_email,
    username: user?.user_display_name,
  };

  const handleUpdateShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setIsSavingAddress(true);
    try {
      const response = await fetch(`/api/profile?customer_id=${user.id}`, {
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

  const hasShipping =
    profile?.shipping && (profile.shipping.address_1 || profile.shipping.city);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white py-4 min-h-[70vh]">
      <div className="container mx-auto px-6 max-w-3xl space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-500 mt-1 font-medium">Welcome back</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/orders"
              className="px-5 py-2.5 bg-gray-100 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-200 transition-colors"
            >
              Order History
            </Link>
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="px-5 py-2.5 border border-red-200 text-red-600 font-bold text-sm rounded-xl hover:bg-red-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {isLoadingProfile ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FiUser className="text-primary" /> Profile Details
              </h2>
              <div className="bg-gray-50/80 rounded-2xl p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border border-gray-100">
                <div>
                  <p className="text-xs tracking-wider opacity-70 font-bold uppercase mb-1">
                    Username
                  </p>
                  <p className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <FiUser className="text-gray-400 text-xl" />{" "}
                    {activeProfile.username}
                  </p>
                </div>
                <div>
                  <p className="text-xs tracking-wider opacity-70 font-bold uppercase mb-1">
                    Email Address
                  </p>
                  <p className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <FiMail className="text-gray-400 text-xl" />{" "}
                    {activeProfile.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FiBox className="text-primary" /> Shipping Address
                </h2>
                {!isEditingAddress && (
                  <button
                    onClick={() => setIsEditingAddress(true)}
                    className="text-sm flex items-center gap-1.5 font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    <FiEdit2 /> {hasShipping ? "Edit Address" : "Add Address"}
                  </button>
                )}
              </div>

              <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-6 md:p-8">
                {isEditingAddress ? (
                  <form
                    onSubmit={handleUpdateShipping}
                    className="space-y-5 animate-in fade-in duration-300"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          value={shippingForm.first_name || ""}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          value={shippingForm.last_name || ""}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address_1"
                        value={shippingForm.address_1 || ""}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all mb-3 text-sm font-medium"
                        placeholder="Street name, P.O. box, etc."
                      />
                      <input
                        type="text"
                        name="address_2"
                        value={shippingForm.address_2 || ""}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm font-medium"
                        placeholder="Apartment, suite, unit, etc."
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={shippingForm.city || ""}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={shippingForm.state || ""}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                          Postcode
                        </label>
                        <input
                          type="text"
                          name="postcode"
                          value={shippingForm.postcode || ""}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-6 justify-end border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setIsEditingAddress(false)}
                        className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingAddress}
                        className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2 text-sm shadow-sm shadow-primary/20"
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
                ) : hasShipping ? (
                  <div className="text-gray-900 leading-relaxed font-semibold text-lg space-y-1">
                    <p>
                      {profile?.shipping?.first_name}{" "}
                      {profile?.shipping?.last_name}
                    </p>
                    <p className="text-gray-600 text-base font-medium">
                      {profile?.shipping?.address_1}
                    </p>
                    {profile?.shipping?.address_2 && (
                      <p className="text-gray-600 text-base font-medium">
                        {profile.shipping.address_2}
                      </p>
                    )}
                    <p className="text-gray-600 text-base font-medium">
                      {profile?.shipping?.city}, {profile?.shipping?.state}{" "}
                      {profile?.shipping?.postcode}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-sm">
                      <FiBox className="text-2xl text-gray-300" />
                    </div>
                    <p className="font-medium text-gray-800">
                      No structured address on file
                    </p>
                    <p className="text-sm mt-1 mb-6">
                      You haven't set up a default shipping address yet.
                    </p>
                    <button
                      onClick={() => setIsEditingAddress(true)}
                      className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all text-sm"
                    >
                      Add Address Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
