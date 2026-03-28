import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesMock } from "@/mocks";
import { ServiceSchema } from "@/components/seo";
import { USE_MOCK } from "@/lib/use-mock";
import { CtaBanner } from "@/components/blocks";

interface ServiceDetailPageProps {
  params: { slug: string };
}

// Hàm lấy dữ liệu – tự động toggle mock/API
async function getService(slug: string) {
  if (USE_MOCK) {
    return servicesMock.find((s) => s.slug === slug) ?? null;
  }
  // Khi CMS sẵn sàng: uncomment và thay endpoint
  // const { apiClient, flattenStrapiResponse } = await import("@/lib/api-client");
  // const res = await apiClient.get(`/services?filters[slug][$eq]=${slug}&populate=*`);
  // const items = flattenStrapiResponse(res.data);
  // return items[0] ?? null;
  return servicesMock.find((s) => s.slug === slug) ?? null;
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const service = await getService(params.slug);
  if (!service) return { title: "Không tìm thấy" };

  return {
    title: service.title,
    description: service.description.slice(0, 160),
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = await getService(params.slug);
  if (!service) notFound();

  return (
    <>
      <ServiceSchema service={service} />

      <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <span className="text-sm text-muted-foreground">{service.icon}</span>
          <h1 className="mt-2 text-4xl font-bold">{service.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{service.description}</p>

          {service.features.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold">Tính năng</h2>
              <ul className="mt-4 space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <CtaBanner
        title="Quan tâm dịch vụ này?"
        subtitle="Liên hệ để được tư vấn chi tiết và báo giá"
        primaryCta={{ text: "Liên hệ ngay", href: "/contact" }}
      />
    </>
  );
}
