// ============================================================
// Service – Danh sách dịch vụ công ty
// CMS Collection: services
// ============================================================

export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;           // URL icon hoặc icon name
  image?: string;         // URL ảnh minh họa
  features: string[];     // Danh sách tính năng
  order: number;
}
