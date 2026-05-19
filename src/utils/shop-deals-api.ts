import { fetchWcApi } from "./api-client";
import { ENDPOINTS, buildUrl } from "./api-endpoints";

/**
 * Service to fetch dynamic content for the Shop and Deals page headers.
 */
export async function getShopDealsPageData() {
  const url = buildUrl(ENDPOINTS.SHOP_DEALS_PAGE_DATA);

  try {
    // Revalidate every hour
    const { data } = await fetchWcApi<any>(url, { next: { revalidate: 3600 } });

    if (!data || data.length === 0) {
      console.warn(
        "Shop/Deals page not found in WordPress. Check slug: 'admin-shop-deals'",
      );
      return null;
    }

    const page = data[0];
    const acf = page.acf || {};

    return {
      data: acf,
    };
  } catch (error) {
    console.error("Error fetching Shop/Deals page data:", error);
    return null;
  }
}
