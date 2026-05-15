import { fetchWcApi } from "./api-client";
import { buildUrl, ENDPOINTS } from "./api-endpoints";

/**
 * Service to fetch dynamic content for the Footer.
 */
export async function getFooterData() {
  const url = buildUrl(ENDPOINTS.FOOTER_DATA);
  try {
    const { data } = await fetchWcApi<any>(url, { next: { revalidate: 3600 } });
    if (!data || data.length === 0) {
      console.warn(
        "Footer page not found in WordPress. Check slug: 'footer'",
      );
      return null;
    }

    const page = data[0];
    const acf = page.acf || {};

    return {
      data: acf,
    };
  } catch (error) {
    console.error("Error fetching Footer data:", error);
    return null;
  }
}
