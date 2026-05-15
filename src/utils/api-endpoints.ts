/**
 * Register all NEW backend APIs here.
 * When the backend team provides a new endpoint, just add a new key below!
 */
export const ENDPOINTS = {
  HOMEPAGE: "custom/v1/homepage",
  LOGIN: "jwt-auth/v1/token",
  SIGNUP: "custom/v1/register",
  FORGOT_PASSWORD: "custom/v1/forgot-password",
  RESET_PASSWORD: "custom/v1/reset-password",
  DEALS: "custom/v3/deals",
  ABOUT_PAGE_DATA: "wp/v2/pages?slug=about-us&_embed",
  HOME_PAGE_DATA: "wp/v2/pages?slug=home-page&_embed",
  CONTACT_PAGE_DATA: "wp/v2/pages?slug=contact-us&_embed",
  FOOTER_DATA: "wp/v2/pages?slug=footer&_embed",
  BANNER_DATA: "wp/v2/pages?slug=top-banner&_embed",
  BLOG_LIST: "custom/v1/blogs",
  BLOG_SINGLE: "custom/v1/blogs/:slug",
};

/**
 * Helper to append query parameters (like search filters, pagination)
 * cleanly to any structured endpoint.
 */
export function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined | null>,
): string {
  if (!params) return endpoint;

  const cleanParams: Record<string, string> = {};

  // Filter out empty or undefined parameters automatically
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      cleanParams[key] = String(value);
    }
  });

  const query = new URLSearchParams(cleanParams).toString();
  return query ? `${endpoint}?${query}` : endpoint;
}
