import type { Metadata } from "next";
import { ServicesSection } from "@/components/smart";

export const metadata: Metadata = {
  title: "Dịch vụ",
  description: "Khám phá các dịch vụ thiết kế và phát triển web chuyên nghiệp của chúng tôi.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold">Dịch vụ của chúng tôi</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Giải pháp toàn diện từ thiết kế đến triển khai.
      </p>
      <div className="mt-12">
        <ServicesSection />
      </div>
    </div>
  );
}
