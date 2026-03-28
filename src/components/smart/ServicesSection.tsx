// ============================================================
// Smart Component: ServicesSection
// - Gọi API qua custom hook, truyền data xuống UI Component
// ============================================================

"use client";

import { useServices } from "@/hooks";
import { ServiceCard } from "@/components/ui";

export function ServicesSection() {
  const { services, isLoading, error } = useServices();

  if (isLoading) {
    return (
      <section className="services-section">
        <h2>Dịch vụ của chúng tôi</h2>
        <div className="grid-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton skeleton-card" />
          ))}
        </div>
      </section>
    );
  }

  if (error) return <div className="error-state">Không thể tải dịch vụ.</div>;

  return (
    <section className="services-section">
      <h2>Dịch vụ của chúng tôi</h2>
      <div className="grid-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
