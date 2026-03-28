import { NextResponse } from "next/server";
import { z } from "zod";

// ============================================================
// POST /api/contact – Xử lý form liên hệ
// Validate input → lưu DB (hoặc forward to CMS)
// ============================================================

const contactSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập họ tên").max(200),
  email: z.string().email("Email không hợp lệ").max(200),
  phone: z.string().max(20).optional(),
  subject: z.string().min(1, "Vui lòng nhập tiêu đề").max(300),
  message: z.string().min(10, "Nội dung tối thiểu 10 ký tự").max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Dữ liệu không hợp lệ",
            details: result.error.issues.map((i) => ({
              field: i.path.join("."),
              message: i.message,
            })),
          },
        },
        { status: 400 },
      );
    }

    // Option A: Lưu vào database (Prisma)
    // const { prisma } = await import("@/lib/prisma");
    // await prisma.contactMessage.create({ data: result.data });

    // Option B: Forward sang Headless CMS (Strapi)
    // const { apiClient } = await import("@/lib/api-client");
    // await apiClient.post("/contact-messages", { data: result.data });

    // Hiện tại: log và trả success (thay bằng option A hoặc B)
    console.warn("[Contact Form]", result.data);

    return NextResponse.json(
      { success: true, data: { message: "Gửi thành công" } },
      { status: 201 },
    );
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Đã xảy ra lỗi, vui lòng thử lại sau.",
        },
      },
      { status: 500 },
    );
  }
}
