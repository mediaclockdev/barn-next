"use client";

import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import useAuthStore from "@/src/store/authStore";
import useCartStore from "@/src/store/cartStore";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import toast from "react-hot-toast";

export interface CheckoutFormData {
  email: string;
  phone: string;
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string; // Suburb
    state: string;
    postcode: string;
    country: string;
  };
  billingSameAsShipping: boolean;
  billing?: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  createAccount?: boolean;
  password?: string;
}

export interface CheckoutAddressFormRef {
  validateAndGetValues: () => CheckoutFormData | null;
}

const AU_STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

const Input = ({ label, error, required, ...props }: any) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <input
      {...props}
      required={required}
      className={`w-full border ${
        error ? "border-red-500" : "border-gray-200"
      } rounded-xl px-4 py-3 bg-gray-50 text-sm outline-none focus:bg-white focus:ring-4 ${
        error
          ? "focus:ring-red-500/10 focus:border-red-500"
          : "focus:ring-primary/10 focus:border-primary"
      } transition-all duration-200`}
    />
    {error && (
      <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>
    )}
  </div>
);

const Select = ({ label, options, error, required, ...props }: any) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <div className="relative">
      <select
        {...props}
        required={required}
        className={`w-full border appearance-none cursor-pointer ${
          error ? "border-red-500" : "border-gray-200"
        } rounded-xl px-4 py-3 bg-gray-50 text-sm outline-none focus:bg-white focus:ring-4 ${
          error
            ? "focus:ring-red-500/10 focus:border-red-500"
            : "focus:ring-primary/10 focus:border-primary"
        } transition-all duration-200`}
      >
        <option value="">Select...</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <FiChevronDown />
      </div>
    </div>
    {error && (
      <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>
    )}
  </div>
);

export const CheckoutAddressForm = forwardRef<CheckoutAddressFormRef, {}>(
  ({}, ref) => {
    const { user } = useAuthStore();
    const { deliveryMethod, setShippingInfo } = useCartStore();

    // Data States
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [shipping, setShipping] = useState({
      firstName: "",
      lastName: "",
      address: "",
      suburb: "",
      state: "",
      postcode: "",
    });
    const [billing, setBilling] = useState({
      firstName: "",
      lastName: "",
      address: "",
      suburb: "",
      state: "",
      postcode: "",
    });

    // Option: pickup vs delivery vs auspost
    const [localDeliveryMethod, setLocalDeliveryMethod] = useState<
      "pickup" | "delivery" | "auspost"
    >(
      (deliveryMethod as any) === "pickup"
        ? "pickup"
        : (deliveryMethod as any) === "auspost"
          ? "auspost"
          : "delivery",
    );

    // Australia Post state
    const [auspostServices, setAuspostServices] = useState<
      Array<{ code: string; name: string; price: number }>
    >([]);
    const [selectedAuspostService, setSelectedAuspostService] =
      useState<string>("");
    const [isCalculatingAuspost, setIsCalculatingAuspost] = useState(false);
    const lastCalculatedAuspostPostcodeRef = useRef<string>("");

    // Track the last successfully calculated address to avoid redundant API calls
    const lastCalculatedAddressRef = useRef<string>("");
    const lastCalculatedDeliveryCostRef = useRef<number | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    // UI States
    const [billingSame, setBillingSame] = useState(true);

    // Error States
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Sync local delivery method to store when changed, if pickup set cost to 0
    useEffect(() => {
      if (localDeliveryMethod === "pickup") {
        setShippingInfo("pickup", 0, false);
      } else if (localDeliveryMethod === "auspost") {
        // Restore selected AusPost service cost if any
        const svc = auspostServices.find(
          (s) => s.code === selectedAuspostService,
        );
        setShippingInfo(
          "auspost",
          svc ? svc.price : null,
          false,
          svc?.code || "",
          svc?.name || "",
        );
      } else {
        setShippingInfo(
          "delivery",
          lastCalculatedDeliveryCostRef.current,
          false,
        );
      }
    }, [
      localDeliveryMethod,
      setShippingInfo,
      auspostServices,
      selectedAuspostService,
    ]);

    // Auto-fill if user logs in
    useEffect(() => {
      if (user?.email) setEmail(user.email);
      if (user?.billing?.phone) setPhone(user.billing.phone);
      if (user?.first_name) {
        setShipping((prev) => ({
          ...prev,
          firstName: user.first_name,
          lastName: user.last_name || "",
        }));
      }
    }, [user]);

    // Calculate shipping distance API
    const handleCalculateShipping = async () => {
      if (localDeliveryMethod !== "delivery") return;

      const { address, suburb, state, postcode } = shipping;

      // Validate and show inline errors for missing shipping fields
      const shippingErrors: Record<string, string> = {};
      if (!address) shippingErrors.s_address = "Street address is required";
      if (!suburb) shippingErrors.s_suburb = "Suburb / City is required";
      if (!state) shippingErrors.s_state = "State is required";
      if (!postcode) shippingErrors.s_postcode = "Postcode is required";

      if (Object.keys(shippingErrors).length > 0) {
        setErrors((prev) => ({ ...prev, ...shippingErrors }));
        toast.error("Please fill in all required shipping address fields.");
        return;
      }

      const fullAddress = `${address}, ${suburb}, ${state} ${postcode}`;

      if (fullAddress === lastCalculatedAddressRef.current) return;

      setIsCalculating(true);
      const toastId = toast.loading("Calculating shipping distance...");

      try {
        const payload = { destinationAddress: fullAddress };
        const res = await fetch("/api/shipping/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!data.available) {
          toast.error(
            data.message ||
              "Outside delivery area. Please choose Store Pickup.",
          );
          setShippingInfo("delivery", null, data.zone === 3);
          lastCalculatedDeliveryCostRef.current = null;
        } else {
          toast.success(
            `Delivery available! Cost: $${data.cost.toFixed(2)} (${data.distanceKm}km)`,
          );
          setShippingInfo("delivery", data.cost, false);
          lastCalculatedDeliveryCostRef.current = data.cost;
          lastCalculatedAddressRef.current = fullAddress; // Save cache
        }
      } catch (err) {
        toast.error("Failed to calculate shipping cost.");
        setShippingInfo("delivery", null, false);
      } finally {
        setIsCalculating(false);
        toast.dismiss(toastId);
      }
    };

    // Calculate Australia Post rates
    const handleCalculateAusPost = async () => {
      if (localDeliveryMethod !== "auspost") return;

      const { postcode } = shipping;

      if (!postcode) {
        setErrors((prev) => ({ ...prev, s_postcode: "Postcode is required" }));
        toast.error("Please enter your postcode.");
        return;
      }

      if (
        postcode === lastCalculatedAuspostPostcodeRef.current &&
        auspostServices.length > 0
      )
        return;

      setIsCalculatingAuspost(true);
      setAuspostServices([]);
      setSelectedAuspostService("");
      setShippingInfo("auspost", null, false);
      const toastId = toast.loading("Getting Australia Post rates...");

      try {
        const cartItems = useCartStore.getState().items.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
        }));

        const res = await fetch("/api/shipping/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            method: "auspost",
            destinationPostcode: postcode,
            cartItems,
          }),
        });

        const data = await res.json();

        if (!data.available || !data.services || data.services.length === 0) {
          toast.error(
            data.message ||
              "No Australia Post services available for this postcode.",
          );
        } else {
          setAuspostServices(data.services);
          lastCalculatedAuspostPostcodeRef.current = postcode;
          toast.success(`${data.services.length} shipping option(s) found!`);
        }
      } catch (err) {
        toast.error("Failed to get Australia Post rates.");
      } finally {
        setIsCalculatingAuspost(false);
        toast.dismiss(toastId);
      }
    };

    const handleSelectAuspostService = (serviceCode: string) => {
      setSelectedAuspostService(serviceCode);
      const svc = auspostServices.find((s) => s.code === serviceCode);
      if (svc) {
        setShippingInfo("auspost", svc.price, false, svc.code, svc.name);
      }
    };

    useImperativeHandle(ref, () => ({
      validateAndGetValues: () => {
        const newErrors: Record<string, string> = {};

        // Basic validation
        if (!email) newErrors.email = "Email address is required";
        else if (!/\S+@\S+\.\S+/.test(email))
          newErrors.email = "Please enter a valid email address";

        if (!phone) newErrors.phone = "Phone number is required";

        if (!shipping.firstName)
          newErrors.s_firstName = "First name is required";
        if (!shipping.lastName) newErrors.s_lastName = "Last name is required";

        if (
          localDeliveryMethod === "delivery" ||
          localDeliveryMethod === "auspost"
        ) {
          if (!shipping.address)
            newErrors.s_address = "Street address is required";
          if (!shipping.suburb)
            newErrors.s_suburb = "Suburb / City is required";
          if (!shipping.state) newErrors.s_state = "State is required";
          if (!shipping.postcode) newErrors.s_postcode = "Postcode is required";
        }

        if (
          (localDeliveryMethod === "delivery" ||
            localDeliveryMethod === "auspost") &&
          !billingSame
        ) {
          if (!billing.firstName)
            newErrors.b_firstName = "First name is required";
          if (!billing.lastName) newErrors.b_lastName = "Last name is required";
          if (!billing.address)
            newErrors.b_address = "Street address is required";
          if (!billing.suburb) newErrors.b_suburb = "Suburb / City is required";
          if (!billing.state) newErrors.b_state = "State is required";
          if (!billing.postcode) newErrors.b_postcode = "Postcode is required";
        }

        if (localDeliveryMethod === "pickup") {
          if (!billing.address)
            newErrors.b_address = "Street address is required";
          if (!billing.suburb) newErrors.b_suburb = "Suburb / City is required";
          if (!billing.state) newErrors.b_state = "State is required";
          if (!billing.postcode) newErrors.b_postcode = "Postcode is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
          return null;
        }

        // Enforcement: must have a valid shipping cost for delivery/auspost
        if (localDeliveryMethod === "delivery") {
          if (isCalculating) {
            toast.error("Still calculating shipping, please wait...");
            return null;
          }
          if (useCartStore.getState().shippingCost === null) {
            toast.error(
              "Please provide a valid delivery address or select Store Pickup.",
            );
            return null;
          }
        }

        if (localDeliveryMethod === "auspost") {
          if (isCalculatingAuspost) {
            toast.error("Still getting Australia Post rates, please wait...");
            return null;
          }
          if (
            !selectedAuspostService ||
            useCartStore.getState().shippingCost === null
          ) {
            toast.error(
              "Please calculate Australia Post rates and select a service.",
            );
            return null;
          }
        }

        const needsShippingAddress =
          localDeliveryMethod === "delivery" ||
          localDeliveryMethod === "auspost";

        return {
          email,
          phone,
          billingSameAsShipping: needsShippingAddress ? billingSame : true,
          shipping: {
            first_name: shipping.firstName,
            last_name: shipping.lastName,
            address_1: needsShippingAddress ? shipping.address : "",
            city: needsShippingAddress ? shipping.suburb : "",
            state: needsShippingAddress ? shipping.state : "",
            postcode: needsShippingAddress ? shipping.postcode : "",
            country: "AU",
          },
          billing:
            needsShippingAddress && !billingSame
              ? {
                  first_name: billing.firstName,
                  last_name: billing.lastName,
                  address_1: billing.address,
                  city: billing.suburb,
                  state: billing.state,
                  postcode: billing.postcode,
                  country: "AU",
                }
              : localDeliveryMethod === "pickup"
                ? {
                    first_name: shipping.firstName,
                    last_name: shipping.lastName,
                    address_1: billing.address,
                    city: billing.suburb,
                    state: billing.state,
                    postcode: billing.postcode,
                    country: "AU",
                  }
                : undefined,
        };
      },
    }));

    const handleShippingChange = (field: string, value: string) => {
      setShipping((prev) => ({ ...prev, [field]: value }));
      if (errors[`s_${field}`])
        setErrors((prev) => ({ ...prev, [`s_${field}`]: "" }));

      if (localDeliveryMethod === "delivery") {
        setShippingInfo("delivery", null, false);
      }
      if (localDeliveryMethod === "auspost" && field === "postcode") {
        // Reset AusPost rates when postcode changes
        setAuspostServices([]);
        setSelectedAuspostService("");
        setShippingInfo("auspost", null, false);
        lastCalculatedAuspostPostcodeRef.current = "";
      }
    };

    const handleBillingChange = (field: string, value: string) => {
      setBilling((prev) => ({ ...prev, [field]: value }));
      if (errors[`b_${field}`])
        setErrors((prev) => ({ ...prev, [`b_${field}`]: "" }));
    };

    return (
      <div className="flex flex-col gap-6">
        {!user && (
          <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
            <p className="text-sm font-medium text-gray-700">
              Returning customer?
            </p>
            <Link href="/login?redirect=/checkout">
              <span className="text-sm font-bold text-primary hover:underline cursor-pointer">
                Click here to login
              </span>
            </Link>
          </div>
        )}

        {/* Delivery Method Selector */}
        <div className="bg-white border border-gray-200 shadow-[0_4px_24px_rgb(0,0,0,0.04)] rounded-2xl p-5 sm:p-6 mb-2">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Delivery Method
          </h3>
          <div className="flex bg-gray-100 p-1.5 rounded-xl border border-gray-200 gap-1.5 shadow-inner">
            <button
              type="button"
              onClick={() => setLocalDeliveryMethod("delivery")}
              className={`flex-1 py-3 px-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                localDeliveryMethod === "delivery"
                  ? "bg-white shadow-sm text-gray-900 ring-1 ring-gray-200/50"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-200/50"
              }`}
            >
              Local Delivery
            </button>
            <button
              type="button"
              onClick={() => setLocalDeliveryMethod("auspost")}
              className={`flex-1 py-3 px-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                localDeliveryMethod === "auspost"
                  ? "bg-white shadow-sm text-gray-900 ring-1 ring-gray-200/50"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-200/50"
              }`}
            >
              Australia Post
            </button>
            <button
              type="button"
              onClick={() => setLocalDeliveryMethod("pickup")}
              className={`flex-1 py-3 px-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                localDeliveryMethod === "pickup"
                  ? "bg-white shadow-sm text-gray-900 ring-1 ring-gray-200/50"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-200/50"
              }`}
            >
              Store Pickup
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white border border-gray-200 shadow-[0_4px_24px_rgb(0,0,0,0.04)] rounded-2xl p-5 sm:p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-5">
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                required
                value={shipping.firstName}
                onChange={(e: any) =>
                  handleShippingChange("firstName", e.target.value)
                }
                placeholder="e.g. John"
                error={errors.s_firstName}
              />
              <Input
                label="Last Name"
                required
                value={shipping.lastName}
                onChange={(e: any) =>
                  handleShippingChange("lastName", e.target.value)
                }
                error={errors.s_lastName}
                placeholder="e.g. Doe"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                required
                type="email"
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                  setErrors((p) => ({ ...p, email: "" }));
                }}
                error={errors.email}
                placeholder="you@example.com"
              />
              <Input
                label="Phone Number"
                required
                type="tel"
                value={phone}
                onChange={(e: any) => {
                  setPhone(e.target.value);
                  setErrors((p) => ({ ...p, phone: "" }));
                }}
                error={errors.phone}
                placeholder="e.g. 0400 000 000"
              />
            </div>
          </div>
        </div>

        {/* Shipping Address — shown for both Local Delivery and Australia Post */}
        {(localDeliveryMethod === "delivery" ||
          localDeliveryMethod === "auspost") && (
          <div className="bg-white border border-gray-200 shadow-[0_4px_24px_rgb(0,0,0,0.04)] rounded-2xl p-5 sm:p-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              Shipping Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-1 sm:col-span-2">
                <Input
                  label="Street Address"
                  required
                  value={shipping.address}
                  onChange={(e: any) =>
                    handleShippingChange("address", e.target.value)
                  }
                  error={errors.s_address}
                  placeholder="e.g. 123 Smith Street"
                />
              </div>
              <Input
                label="Suburb / City"
                required
                value={shipping.suburb}
                onChange={(e: any) =>
                  handleShippingChange("suburb", e.target.value)
                }
                error={errors.s_suburb}
                placeholder="e.g. Sydney"
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="State"
                  required
                  options={AU_STATES}
                  value={shipping.state}
                  onChange={(e: any) =>
                    handleShippingChange("state", e.target.value)
                  }
                  error={errors.s_state}
                  placeholder="Select State"
                />
                <Input
                  label="Postcode"
                  required
                  value={shipping.postcode}
                  onChange={(e: any) =>
                    handleShippingChange("postcode", e.target.value)
                  }
                  error={errors.s_postcode}
                  placeholder="e.g. 2000"
                />
              </div>
            </div>

            {/* Local Delivery — calculate distance */}
            {localDeliveryMethod === "delivery" && (
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleCalculateShipping}
                  disabled={
                    !shipping.address ||
                    !shipping.suburb ||
                    !shipping.state ||
                    !shipping.postcode ||
                    isCalculating
                  }
                  className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow hover:bg-primary-dark hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCalculating ? "Calculating..." : "Calculate Shipping"}
                </button>
              </div>
            )}

            {/* Australia Post — calculate rates + service selector */}
            {localDeliveryMethod === "auspost" && (
              <>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={handleCalculateAusPost}
                    disabled={!shipping.postcode || isCalculatingAuspost}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold shadow hover:bg-red-700 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCalculatingAuspost
                      ? "Getting Rates..."
                      : "Get Australia Post Rates"}
                  </button>
                </div>

                {/* Service options */}
                {auspostServices.length > 0 && (
                  <div className="mt-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm font-bold text-gray-700">
                      Select a shipping service:
                    </p>
                    {auspostServices.map((svc) => (
                      <label
                        key={svc.code}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedAuspostService === svc.code
                            ? "border-red-500 bg-red-50 shadow-sm"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="auspost-service"
                            value={svc.code}
                            checked={selectedAuspostService === svc.code}
                            onChange={() =>
                              handleSelectAuspostService(svc.code)
                            }
                            className="w-4 h-4 text-red-600 accent-red-600"
                          />
                          <span className="text-sm font-semibold text-gray-800">
                            {svc.name}
                          </span>
                        </div>
                        <span className="text-base font-bold text-gray-900">
                          ${svc.price.toFixed(2)}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Billing Toggle & Address */}
        {(localDeliveryMethod === "delivery" ||
          localDeliveryMethod === "auspost") && (
          <div className="mt-2 text-sm text-gray-500">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={billingSame}
                  onChange={(e) => setBillingSame(e.target.checked)}
                  className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-primary checked:border-primary transition-all cursor-pointer"
                />
                <svg
                  className="absolute w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="currentColor"
                  ></path>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Billing address is the same as shipping
              </span>
            </label>
          </div>
        )}

        {(localDeliveryMethod === "pickup" ||
          ((localDeliveryMethod === "delivery" ||
            localDeliveryMethod === "auspost") &&
            !billingSame)) && (
          <div className="bg-white border border-gray-200 shadow-[0_4px_24px_rgb(0,0,0,0.04)] rounded-2xl p-5 sm:p-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              Billing Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(localDeliveryMethod === "delivery" ||
                localDeliveryMethod === "auspost") && (
                <>
                  <Input
                    label="First Name"
                    required
                    value={billing.firstName}
                    onChange={(e: any) =>
                      handleBillingChange("firstName", e.target.value)
                    }
                    error={errors.b_firstName}
                    placeholder="e.g. John"
                  />
                  <Input
                    label="Last Name"
                    required
                    value={billing.lastName}
                    onChange={(e: any) =>
                      handleBillingChange("lastName", e.target.value)
                    }
                    error={errors.b_lastName}
                    placeholder="e.g. Doe"
                  />
                </>
              )}
              <div className="col-span-1 sm:col-span-2">
                <Input
                  label="Street Address"
                  required
                  value={billing.address}
                  onChange={(e: any) =>
                    handleBillingChange("address", e.target.value)
                  }
                  error={errors.b_address}
                  placeholder="e.g. 123 Smith Street"
                />
              </div>
              <Input
                label="Suburb / City"
                required
                value={billing.suburb}
                onChange={(e: any) =>
                  handleBillingChange("suburb", e.target.value)
                }
                error={errors.b_suburb}
                placeholder="e.g. Sydney"
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="State"
                  required
                  options={AU_STATES}
                  value={billing.state}
                  onChange={(e: any) =>
                    handleBillingChange("state", e.target.value)
                  }
                  error={errors.b_state}
                  placeholder="Select State"
                />
                <Input
                  label="Postcode"
                  required
                  value={billing.postcode}
                  onChange={(e: any) =>
                    handleBillingChange("postcode", e.target.value)
                  }
                  error={errors.b_postcode}
                  placeholder="e.g. 2000"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

CheckoutAddressForm.displayName = "CheckoutAddressForm";
