import { fetchWcApi } from "./api-client";
import { buildUrl, ENDPOINTS } from "./api-endpoints";

/**
 * Service to fetch dynamic content for the Top Banner.
 */
export async function getBannerData() {
  const url = buildUrl(ENDPOINTS.BANNER_DATA);
  try {
    const { data } = await fetchWcApi<any>(url, { next: { revalidate: 3600 } });
    if (!data || data.length === 0) {
      console.warn(
        "Top Banner page not found in WordPress. Check slug: 'top-banner'",
      );
      return null;
    }

    const page = data[0];
    const acf = page.acf || {};

    return {
      data: acf,
    };
  } catch (error) {
    console.error("Error fetching Top Banner data:", error);
    return null;
  }
}
