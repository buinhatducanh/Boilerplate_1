import type { Metadata } from "next";
import { ProjectsSection } from "@/components/smart";

export const metadata: Metadata = {
  title: "Dự án",
  description: "Xem các dự án tiêu biểu mà chúng tôi đã thực hiện.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold">Dự án tiêu biểu</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Những sản phẩm chúng tôi tự hào mang đến cho khách hàng.
      </p>
      <div className="mt-12">
        <ProjectsSection />
      </div>
    </div>
  );
}
