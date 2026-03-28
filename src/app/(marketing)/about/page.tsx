import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Tìm hiểu về đội ngũ và sứ mệnh của chúng tôi.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold">Giới thiệu</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Chúng tôi là đội ngũ chuyên gia thiết kế và phát triển web,
        mang đến giải pháp số toàn diện cho doanh nghiệp.
      </p>
      {/* Thêm nội dung chi tiết ở đây */}
    </div>
  );
}
