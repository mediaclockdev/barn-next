import { NextResponse } from "next/server";
import { fetchWcApi } from "@/src/utils/api-client";
import { rateLimit } from "@/src/lib/rate-limit";

const limiter = rateLimit({ interval: 60_000 });

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "anonymous";
  const { success } = limiter.check(5, `subscribe-${ip}`);
  if (!success) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 },
      );
    }

    const { data } = await fetchWcApi<any>("custom/v1/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    return NextResponse.json({
      success: true,
      message: data.message || "Subscribed successfully",
      data,
    });
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to subscribe to the newsletter.",
      },
      { status: 500 },
    );
  }
}
