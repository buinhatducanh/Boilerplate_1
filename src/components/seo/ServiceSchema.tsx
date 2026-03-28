import type { Service } from "@/types";

interface ServiceSchemaProps {
  service: Service;
  siteUrl?: string;
}

export function ServiceSchema({ service, siteUrl = "" }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${siteUrl}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: "Agency Name",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
