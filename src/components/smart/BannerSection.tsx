// ============================================================
// Smart Component: BannerSection
// - Gọi API qua custom hook, truyền data xuống UI Component
// - Xử lý Loading / Error states
// ============================================================

"use client";

import { useBanners } from "@/hooks";
import { BannerSlider } from "@/components/ui";

export function BannerSection() {
  const { banners, isLoading, error } = useBanners();

  if (isLoading) return <div className="skeleton skeleton-banner" />;
  if (error) return <div className="error-state">Không thể tải banners.</div>;
  if (banners.length === 0) return null;

  return <BannerSlider banners={banners} />;
}
