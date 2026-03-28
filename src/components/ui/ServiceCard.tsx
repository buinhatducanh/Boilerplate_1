// ============================================================
// UI Component: ServiceCard (Dumb Component)
// - Chỉ nhận props, KHÔNG gọi API
// ============================================================

import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="service-card">
      {service.image && (
        <img src={service.image} alt={service.title} className="service-image" />
      )}
      <div className="service-body">
        <span className="service-icon">{service.icon}</span>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <ul className="service-features">
          {service.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
