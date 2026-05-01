import { NextResponse } from "next/server";
import { fetchWcApi } from "@/src/utils/api-client";
import { rateLimit } from "@/src/lib/rate-limit";
import { z } from "zod";

const limiter = rateLimit({ interval: 60_000 });

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "anonymous";
  const { success } = limiter.check(10, `contact-${ip}`);
  if (!success) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Invalid input";
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 400 },
      );
    }

    const { name, email, phone, message } = result.data;

    const { data } = await fetchWcApi<{ success: boolean; message: string }>(
      "custom/v1/contact",
      {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message?.trim() || "",
        }),
      },
    );

    return NextResponse.json({
      success: true,
      message: data.message || "Message sent successfully",
    });
  } catch (error: any) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to send message. Please try again.",
      },
      { status: 500 },
    );
  }
}
