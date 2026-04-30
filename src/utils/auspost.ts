/**
 * Australia Post PAC API integration.
 * Uses the Postage Assessment Calculator (free API) to get domestic parcel rates.
 *
 * API Docs: https://developers.auspost.com.au/apis/pac
 */

import { fetchWcApi } from "./api-client";

// ── Types ───────────────────────────────────────────────────

export interface AusPostService {
  code: string; // e.g. "AUS_PARCEL_REGULAR", "AUS_PARCEL_EXPRESS"
  name: string; // e.g. "Parcel Post", "Express Post"
  price: number; // e.g. 15.50
}

export interface AusPostRateResult {
  available: boolean;
  services: AusPostService[];
  totalWeightKg: number;
  message?: string;
}

interface CartItemForShipping {
  product_id: number;
  quantity: number;
}

// ── Constants ───────────────────────────────────────────────

const AUSPOST_API_BASE = "https://digitalapi.auspost.com.au";
const ORIGIN_POSTCODE = "3523"; // Heathcote VIC — from SHOP_ORIGIN_ADDRESS

// Default parcel dimensions (cm) — used when product dimensions aren't set
const DEFAULT_LENGTH = 30;
const DEFAULT_WIDTH = 20;
const DEFAULT_HEIGHT = 15;

// Default weight per item (kg) — used when product weight isn't set
const DEFAULT_WEIGHT_KG = 0.5;

// ── Main Function ───────────────────────────────────────────

/**
 * Get available Australia Post shipping services and rates for a given
 * destination postcode and cart items.
 *
 * Flow:
 * 1. Fetch product weights from WooCommerce
 * 2. Calculate total parcel weight
 * 3. Call AusPost PAC API for available services + prices
 */
export async function getAusPostRates(
  destinationPostcode: string,
  cartItems: CartItemForShipping[],
): Promise<AusPostRateResult> {
  const apiKey = process.env.AUSPOST_API_KEY;

  if (!apiKey) {
    throw new Error(
      "AUSPOST_API_KEY is not configured. Please add it to your .env file.",
    );
  }

  if (!destinationPostcode || !/^\d{4}$/.test(destinationPostcode)) {
    throw new Error("Please enter a valid 4-digit Australian postcode.");
  }

  // Step 1: Get product weights from WooCommerce

  const { totalWeightKg, maxLength, maxWidth, maxHeight } =
    await getCartParcelInfo(cartItems);

  // Step 2: Call AusPost PAC API
  const services = await fetchAusPostServices(
    ORIGIN_POSTCODE,
    destinationPostcode,
    totalWeightKg,
    maxLength,
    maxWidth,
    maxHeight,
    apiKey,
  );

  if (services.length === 0) {
    return {
      available: false,
      services: [],
      totalWeightKg,
      message:
        "No Australia Post services available for this destination. Please select a different shipping method.",
    };
  }

  return {
    available: true,
    services,
    totalWeightKg,
  };
}

// ── Helpers ─────────────────────────────────────────────────

/**
 * Fetch product weights and dimensions from WooCommerce,
 * then calculate total parcel weight and max dimensions.
 */
async function getCartParcelInfo(cartItems: CartItemForShipping[]): Promise<{
  totalWeightKg: number;
  maxLength: number;
  maxWidth: number;
  maxHeight: number;
}> {
  const productIds = [...new Set(cartItems.map((item) => item.product_id))];

  let productsMap: Record<
    number,
    {
      weight: string;
      dimensions: { length: string; width: string; height: string };
    }
  > = {};

  try {
    // Batch-fetch product weight/dimensions from WooCommerce
    const idsParam = productIds.join(",");

    const res = await fetchWcApi<any>(
      `wc/v3/products?include=${idsParam}&_fields=id,weight,dimensions&per_page=${productIds.length}`,
    );

    const products = Array.isArray(res.data) ? res.data : [];
    products.forEach((p: any) => {
      productsMap[p.id] = {
        weight: p.weight || "",
        dimensions: p.dimensions || {},
      };
    });
  } catch (err) {
    console.warn(
      "[AusPost] Could not fetch product weights from WC, using defaults.",
      err,
    );
  }

  let totalWeightKg = 0;
  let maxLength = DEFAULT_LENGTH;
  let maxWidth = DEFAULT_WIDTH;
  let maxHeight = DEFAULT_HEIGHT;

  for (const item of cartItems) {
    const product = productsMap[item.product_id];
    const itemWeight = product?.weight
      ? parseFloat(product.weight)
      : DEFAULT_WEIGHT_KG;

    totalWeightKg +=
      (isNaN(itemWeight) ? DEFAULT_WEIGHT_KG : itemWeight) * item.quantity;

    // Use the largest dimensions from any product in the cart
    if (product?.dimensions) {
      const l = parseFloat(product.dimensions.length) || 0;
      const w = parseFloat(product.dimensions.width) || 0;
      const h = parseFloat(product.dimensions.height) || 0;
      if (l > maxLength) maxLength = l;
      if (w > maxWidth) maxWidth = w;
      if (h > maxHeight) maxHeight = h;
    }
  }

  // AusPost minimum weight is 0.1 kg
  if (totalWeightKg < 0.1) totalWeightKg = 0.1;

  // AusPost max weight for standard parcels is 22 kg
  if (totalWeightKg > 22) totalWeightKg = 22;

  return { totalWeightKg, maxLength, maxWidth, maxHeight };
}

/**
 * Call the Australia Post PAC domestic parcel service API.
 * Returns available services with prices.
 */
async function fetchAusPostServices(
  fromPostcode: string,
  toPostcode: string,
  weightKg: number,
  lengthCm: number,
  widthCm: number,
  heightCm: number,
  apiKey: string,
): Promise<AusPostService[]> {
  const params = new URLSearchParams({
    from_postcode: fromPostcode,
    to_postcode: toPostcode,
    length: String(Math.ceil(lengthCm)),
    width: String(Math.ceil(widthCm)),
    height: String(Math.ceil(heightCm)),
    weight: String(weightKg.toFixed(2)),
  });

  const url = `${AUSPOST_API_BASE}/postage/parcel/domestic/service.json?${params}`;

  console.log("URL ", url);

  const response = await fetch(url, {
    headers: {
      "AUTH-KEY": apiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[AusPost] API Error:", response.status, errorText);
    throw new Error(
      "Failed to get Australia Post rates. Please try again or select a different shipping method.",
    );
  }

  const data = await response.json();

  // The PAC API returns services in: data.services.service (array or single object)
  const rawServices = data?.services?.service;

  if (!rawServices) return [];

  const serviceList = Array.isArray(rawServices) ? rawServices : [rawServices];

  return serviceList
    .filter((s: any) => s.price && parseFloat(s.price) > 0)
    .map((s: any) => ({
      code: s.code || "",
      name: s.name || "Standard",
      price: parseFloat(s.price),
    }));
}
