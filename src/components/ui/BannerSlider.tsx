// ============================================================
// UI Component: BannerSlider (Dumb Component)
// - Chỉ nhận props, KHÔNG gọi API
// - Data được truyền từ Smart Component hoặc Mock
// ============================================================

import type { Banner } from "@/types";

interface BannerSliderProps {
  banners: Banner[];
}

export function BannerSlider({ banners }: BannerSliderProps) {
  const activeBanners = banners
    .filter((b) => b.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="banner-slider">
      {activeBanners.map((banner) => (
        <div key={banner.id} className="banner-slide">
          <img src={banner.image} alt={banner.title} />
          <div className="banner-content">
            <h1>{banner.title}</h1>
            {banner.subtitle && <p>{banner.subtitle}</p>}
            {banner.ctaText && banner.ctaLink && (
              <a href={banner.ctaLink} className="btn-cta">
                {banner.ctaText}
              </a>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
