import { NextResponse } from "next/server";
import { fetchWcApi } from "@/src/utils/api-client";

interface WcCustomer {
  id: number;
  email?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  billing?: {
    first_name?: string;
    last_name?: string;
    company?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    email?: string;
    phone?: string;
  };
  shipping?: {
    first_name?: string;
    last_name?: string;
    company?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customer_id");

    if (!customerId) {
      return NextResponse.json(
        { message: "Customer ID is required" },
        { status: 400 },
      );
    }

    const { data } = await fetchWcApi<WcCustomer>(
      `wc/v3/customers/${customerId}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    return NextResponse.json({ profile: data }, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch customer profile";

    console.error("[API Get Profile] Server Error", err);

    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customer_id");

    if (!customerId) {
      return NextResponse.json(
        { message: "Customer ID is required" },
        { status: 400 },
      );
    }

    const body = await req.json();

    const { data } = await fetchWcApi<WcCustomer>(
      `wc/v3/customers/${customerId}`,
      {
        method: "PUT",
        body: JSON.stringify({ shipping: body.shipping }),
      },
    );

    return NextResponse.json({ profile: data }, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to update customer profile";

    console.error("[API Update Profile] Server Error", err);

    return NextResponse.json({ message }, { status: 500 });
  }
}
