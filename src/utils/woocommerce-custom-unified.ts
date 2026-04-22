import { WooCommerceProduct } from "./woocommerce";

export const wcApiUrl = process.env.WC_API_URL;
export const wcConsumerKey = process.env.WC_CONSUMER_KEY;
export const wcConsumerSecret = process.env.WC_CONSUMER_SECRET;

export async function fetchHomePageDetails() {
  if (!wcApiUrl || !wcConsumerKey || !wcConsumerSecret) {
    throw new Error("WooCommerce API credentials are missing");
  }

  const endpoint = `custom/v1/homepage`;

  const credentials = Buffer.from(
    `${wcConsumerKey}:${wcConsumerSecret}`,
  ).toString("base64");

  const url = `${wcApiUrl.replace(/\/$/, "")}/${endpoint}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  let data;
  try {
    data = await response.json();
  } catch (error) {
    console.error(`Homepage Error `, error);
    throw error;
  }

  if (!response.ok) {
    throw new Error(
      `HomePage response Error: ${response.status} ${response.statusText} - ${data.message || ""}`,
    );
  }

  const returnedProducts = data.sale_products;
  const returnedBlogs = data.blogs;

  const processCustomProduct = (p: any) => {
    let images = [];

    if (images.length === 0) {
      if (p.featured_image) {
        images.push({ src: p.featured_image });
      }
      if (Array.isArray(p.gallery_images)) {
        p.gallery_images.forEach((img: string) => {
          if (img !== p.featured_image) {
            images.push({ src: img });
          }
        });
      }
    }

    return {
      ...p,
      images,
    };
  };

  const mappedProducts = returnedProducts.map(processCustomProduct);

  return {
    sale_products: mappedProducts,
    blogs: returnedBlogs,
  };
}

export async function fetchUnifiedCustomProducts(
  params?: Record<string, string>,
): Promise<{
  products: WooCommerceProduct[];
  totalPages: number;
  totalItems: number;
}> {
  const query = new URLSearchParams(params || {}).toString();
  const endpoint = query ? `custom/v3/products?${query}` : "custom/v3/products";

  if (!wcApiUrl || !wcConsumerKey || !wcConsumerSecret) {
    throw new Error("WooCommerce API credentials are missing.");
  }

  const credentials = Buffer.from(
    `${wcConsumerKey}:${wcConsumerSecret}`,
  ).toString("base64");

  const url = `${wcApiUrl.replace(/\/$/, "")}/${endpoint}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    console.error(`[Unified API] ❌ Failed to parse JSON response.`, err);
    throw err;
  }

  if (!response.ok) {
    throw new Error(
      `Custom API Error: ${response.status} ${response.statusText} - ${
        data?.message || ""
      }`,
    );
  }

  const returnedProducts = Array.isArray(data?.products)
    ? data.products
    : Array.isArray(data)
      ? data
      : [];

  const processCustomProduct = (p: any) => {
    let images = [];

    if (images.length === 0) {
      if (p.featured_image) {
        images.push({ src: p.featured_image });
      }
      if (Array.isArray(p.gallery_images)) {
        p.gallery_images.forEach((img: string) => {
          if (img !== p.featured_image) {
            images.push({ src: img });
          }
        });
      }
    }

    return {
      ...p,
      images,
    };
  };

  const mappedProducts = returnedProducts
    .map(processCustomProduct)
    .filter((prod: { images: any[] }) => prod.images && prod.images.length > 0);

  return {
    products: mappedProducts as WooCommerceProduct[],
    totalPages: data?.total_pages || 1,
    totalItems: data?.total || 0,
  };
}

export async function fetchSaleProducts(
  params?: Record<string, string>,
): Promise<{
  products: WooCommerceProduct[];
  totalPages: number;
  totalItems: number;
}> {
  const query = new URLSearchParams(params || {}).toString();
  const endpoint = query
    ? `wcx/v4/sale-products?${query}`
    : "wcx/v4/sale-products";

  if (!wcApiUrl || !wcConsumerKey || !wcConsumerSecret) {
    throw new Error("WooCommerce API credentials are missing.");
  }

  const credentials = Buffer.from(
    `${wcConsumerKey}:${wcConsumerSecret}`,
  ).toString("base64");

  const url = `${wcApiUrl.replace(/\/$/, "")}/${endpoint}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    console.error(`[Sale API] ❌ Failed to parse JSON response.`, err);
    throw err;
  }

  if (!response.ok) {
    throw new Error(
      `Sale API Error: ${response.status} ${response.statusText} - ${
        data?.message || ""
      }`,
    );
  }

  const returnedProducts = Array.isArray(data?.products) ? data.products : [];

  const processCustomProduct = (p: any) => {
    let images = [];

    if (images.length === 0) {
      if (p.featured_image) {
        images.push({ src: p.featured_image });
      }
      if (Array.isArray(p.gallery_images)) {
        p.gallery_images.forEach((img: string) => {
          if (img !== p.featured_image) {
            images.push({ src: img });
          }
        });
      }
    }

    return {
      ...p,
      images,
    };
  };

  const mappedProducts = returnedProducts
    .map(processCustomProduct)
    .filter((prod: { images: any[] }) => prod.images && prod.images.length > 0);

  return {
    products: mappedProducts as WooCommerceProduct[],
    totalPages: data?.total_pages || 1,
    totalItems: data?.total || 0,
  };
}

export async function fetchUnifiedCustomProduct(
  id: string | number,
): Promise<WooCommerceProduct> {
  if (!wcApiUrl || !wcConsumerKey || !wcConsumerSecret) {
    throw new Error("WooCommerce API credentials are missing.");
  }

  const credentials = Buffer.from(
    `${wcConsumerKey}:${wcConsumerSecret}`,
  ).toString("base64");

  const url = `${wcApiUrl.replace(/\/$/, "")}/custom/v3/product-full/${id}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    console.error(`[Unified API] ❌ Failed to parse JSON response.`, err);
    throw err;
  }

  if (!response.ok) {
    throw new Error(
      `Custom API Error: ${response.status} ${response.statusText} - ${
        data?.message || ""
      }`,
    );
  }

  return data as WooCommerceProduct;
}

export async function fetchUnifiedCustomProductByIds(
  id: string | number,
): Promise<WooCommerceProduct> {
  if (!wcApiUrl || !wcConsumerKey || !wcConsumerSecret) {
    throw new Error("WooCommerce API credentials are missing.");
  }

  const credentials = Buffer.from(
    `${wcConsumerKey}:${wcConsumerSecret}`,
  ).toString("base64");

  const url = `${wcApiUrl.replace(/\/$/, "")}/custom/v4/products-by-ids?ids=${id}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    console.error(`[Unified API] ❌ Failed to parse JSON response.`, err);
    throw err;
  }

  if (!response.ok) {
    throw new Error(
      `Custom API Error: ${response.status} ${response.statusText} - ${
        data?.message || ""
      }`,
    );
  }

  const returnedProducts = Array.isArray(data?.products)
    ? data.products
    : Array.isArray(data)
      ? data
      : [];

  const processCustomProduct = (p: any) => {
    let images = [];

    if (images.length === 0) {
      if (p.featured_image) {
        images.push({ src: p.featured_image });
      }
      if (Array.isArray(p.gallery_images)) {
        p.gallery_images.forEach((img: string) => {
          if (img !== p.featured_image) {
            images.push({ src: img });
          }
        });
      }
    }

    return {
      ...p,
      images,
    };
  };

  const mappedProducts = returnedProducts.map(processCustomProduct);

  return mappedProducts;
}

export async function createOrderCustom(
  payload: Record<string, any>,
): Promise<any> {
  if (!wcApiUrl || !wcConsumerKey || !wcConsumerSecret) {
    throw new Error("WooCommerce API credentials are missing.");
  }

  const credentials = Buffer.from(
    `${wcConsumerKey}:${wcConsumerSecret}`,
  ).toString("base64");

  const url = `${wcApiUrl.replace(/\/$/, "")}/custom/v3/orders`;

  const startTime = Date.now();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    // Mutations shouldn't be cached
    cache: "no-store",
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    console.error(`[Unified API] ❌ Failed to parse JSON response.`, err);
    throw err;
  }

  const duration = Date.now() - startTime;

  if (!response.ok) {
    throw new Error(
      `Custom API Error: ${response.status} ${response.statusText} - ${
        data?.message || JSON.stringify(data)
      }`,
    );
  }

  return data;
}

export async function fetchWooCommerceCategoriesRaw() {
  if (!wcApiUrl || !wcConsumerKey || !wcConsumerSecret) {
    throw new Error("WooCommerce API credentials are missing.");
  }

  const credentials = Buffer.from(
    `${wcConsumerKey}:${wcConsumerSecret}`,
  ).toString("base64");

  const url = `${wcApiUrl.replace(/\/$/, "")}/wc/v3/products/categories?per_page=100`;

  const response = await fetch(url, {
    headers: { Authorization: `Basic ${credentials}` },
    next: { revalidate: 60 },
  });

  const data = await response.json();

  if (!response.ok) throw new Error("Failed to fetch categories");

  return data.filter((c: any) => c.slug !== "uncategorized");
}

export async function fetchWooCommerceCategories() {
  if (!wcApiUrl || !wcConsumerKey || !wcConsumerSecret) {
    throw new Error("WooCommerce API credentials are missing.");
  }

  const credentials = Buffer.from(
    `${wcConsumerKey}:${wcConsumerSecret}`,
  ).toString("base64");

  const url = `${wcApiUrl.replace(/\/$/, "")}/custom/v4/filter-menu`;

  console.log("Url ",url)
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    // We cache for 60 seconds (keeps shop fast but relatively up to date)
    next: { revalidate: 60 },
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    console.error(`[Unified API] ❌ Failed to parse JSON response.`, err);
    throw err;
  }

  if (!response.ok) {
    throw new Error(
      `WooCommerce API Error: ${response.status} ${response.statusText} - ${
        data?.message || ""
      }`,
    );
  }

  return data.map((categoryGroup: any) => ({
    ...categoryGroup,
    category: categoryGroup.category?.replace(/-\s*L[12]/gi, "").trim(),
  }));
}
