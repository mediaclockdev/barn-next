export async function GET() {
  try {
    const res = await fetch(
      "https://wasoftwaredevelopment.com.au/wp-json/wc/store/products",
      { cache: "no-store" }
    );

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch" }, { status: 500 });
    }

    const data = await res.json();

    return Response.json(data);
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}