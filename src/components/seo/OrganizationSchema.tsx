import type { GlobalSettings } from "@/types";

interface OrganizationSchemaProps {
  settings: GlobalSettings;
  siteUrl: string;
}

export function OrganizationSchema({ settings, siteUrl }: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    description: settings.siteDescription,
    url: siteUrl,
    logo: `${siteUrl}${settings.logo}`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: settings.phone,
      email: settings.email,
      contactType: "customer service",
      availableLanguage: ["Vietnamese", "English"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
    },
    sameAs: settings.socialLinks.map((link) => link.url),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
