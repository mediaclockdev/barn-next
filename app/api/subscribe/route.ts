import { NextResponse } from "next/server";
import { fetchWcApi } from "@/src/utils/api-client";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
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
      { status: 500 }
    );
  }
}
