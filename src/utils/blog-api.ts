import { blogData as staticBlogData } from "@/src/data/Data";
import {
  wcApiUrl,
  wcConsumerKey,
  wcConsumerSecret,
} from "./woocommerce-custom-unified";

// ──────────────────────────────────────────────────────────────
// Blog Types
// ──────────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  slug: string;
  url: string; // Featured image URL
  date: string; // Formatted display date
  title: string;
  description: string; // Short excerpt
  content: string; // Full HTML/text content
}

// ──────────────────────────────────────────────────────────────
// API → BlogPost mapper
// When the real API arrives, adjust this mapper to match the
// actual response shape. Everything downstream stays the same.
// ──────────────────────────────────────────────────────────────

function mapApiBlogToPost(raw: any): BlogPost {
  return {
    id: raw.id ?? raw.ID ?? 0,
    slug: raw.slug ?? raw.post_name ?? "",
    url:
      raw.featured_image ||
      raw.image ||
      raw.url ||
      raw.thumbnail ||
      "/images/placeholder.svg",
    date: raw.date_formatted ?? raw.date ?? "",
    title: raw.title?.rendered ?? raw.title ?? "",
    description:
      raw.excerpt?.rendered?.replace(/<[^>]*>/g, "") ??
      raw.excerpt ??
      raw.description ??
      "",
    content: raw.content?.rendered ?? raw.content ?? raw.body ?? "",
  };
}

// ──────────────────────────────────────────────────────────────
// Fetch helpers
// ──────────────────────────────────────────────────────────────

/**
 * Fetch blog posts for the homepage (limited set).
 *
 * This is called from the server-side `fetchHomePageDetails()`,
 * which already returns a `blogs` array. If the homepage API
 * provides blog data we use that; otherwise we fall back to
 * static data.
 */
export function resolveHomepageBlogs(apiBlogs: any[] | undefined): BlogPost[] {
  if (Array.isArray(apiBlogs) && apiBlogs.length > 0) {
    return apiBlogs.map(mapApiBlogToPost);
  }
  // Fallback → static data while the API is not ready
  return staticBlogData as BlogPost[];
}

/**
 * Fetch all blog posts for the /blog listing page.
 *
 * When the backend provides a dedicated blog listing endpoint,
 * simply update the `endpoint` constant below. The rest of
 * the app (BlogPage, BlogCard, etc.) will just work.
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  // ── Try the real API first ──────────────────────────────
  if (wcApiUrl && wcConsumerKey && wcConsumerSecret) {
    try {
      const credentials = Buffer.from(
        `${wcConsumerKey}:${wcConsumerSecret}`,
      ).toString("base64");

      // TODO: Update this endpoint when the backend team provides it
      const endpoint = "custom/v1/blogs";
      const url = `${wcApiUrl.replace(/\/$/, "")}/${endpoint}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      });

      if (response.ok) {
        const data = await response.json();

        const posts: any[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.blogs)
            ? data.blogs
            : Array.isArray(data?.posts)
              ? data.posts
              : [];

        if (posts.length > 0) {
          return posts.map(mapApiBlogToPost);
        }
      }
    } catch (error) {
      console.warn(
        "[Blog API] ⚠️ API unavailable, using static fallback.",
        error,
      );
    }
  }

  // ── Fallback → static data ─────────────────────────────
  return staticBlogData as BlogPost[];
}

/**
 * Fetch a single blog post by slug.
 *
 * When the backend provides a single-post endpoint, update
 * the `endpoint` below. The detail page (`/blog/[slug]`)
 * will work without any other changes.
 */
export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  // ── Try the real API first ──────────────────────────────
  if (wcApiUrl && wcConsumerKey && wcConsumerSecret) {
    try {
      const credentials = Buffer.from(
        `${wcConsumerKey}:${wcConsumerSecret}`,
      ).toString("base64");

      // TODO: Update this endpoint when the backend team provides it
      const endpoint = `custom/v1/blogs/${slug}`;
      const url = `${wcApiUrl.replace(/\/$/, "")}/${endpoint}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      });

      if (response.ok) {
        const data = await response.json();

        if (data && (data.id || data.ID || data.slug)) {
          return mapApiBlogToPost(data);
        }
      }
    } catch (error) {
      console.warn(
        "[Blog API] ⚠️ Single post API unavailable, using static fallback.",
        error,
      );
    }
  }

  // ── Fallback → static data ─────────────────────────────
  const staticPost = staticBlogData.find((item) => item.slug === slug);
  return (staticPost as BlogPost) ?? null;
}
