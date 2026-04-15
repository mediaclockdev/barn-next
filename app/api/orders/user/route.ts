import { NextResponse } from "next/server";
import { fetchWcApi } from "@/src/utils/api-client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customer_id");
    const page = searchParams.get("page") || "1";
    const perPage = searchParams.get("per_page") || "5";

    if (!customerId) {
      return NextResponse.json(
        { message: "Customer ID is required" },
        { status: 400 },
      );
    }

    const newUrl = `custom/v1/customer/${customerId}/orders?per_page=${perPage}&page=${page}`;

    const res = await fetchWcApi<any>(newUrl, {
      method: "GET",
    });

    return NextResponse.json(
      {
        orders: res.data?.orders || [],
        currentPage: res.data?.current_page || Number(page),
        totalPages: res.data?.total_pages || 1,
        total: res.data?.total || 0,
      },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("[API Get User Orders] Server Error", err);
    return NextResponse.json(
      { message: err.message || "Server Error" },
      { status: 500 },
    );
  }
}
