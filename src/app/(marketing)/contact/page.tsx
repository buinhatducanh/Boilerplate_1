import type { Metadata } from "next";
import { ContactSection } from "@/components/smart";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ với chúng tôi để được tư vấn miễn phí về thiết kế và phát triển web.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold">Liên hệ</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Gửi thông tin để chúng tôi liên hệ tư vấn cho bạn.
        </p>
        <div className="mt-12">
          <ContactSection />
        </div>
      </div>
    </div>
  );
}
