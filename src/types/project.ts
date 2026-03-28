// ============================================================
// Project – Portfolio / Case studies
// CMS Collection: projects
// ============================================================

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;       // URL ảnh thumbnail
  images: string[];        // Gallery ảnh
  client: string;
  category: string;
  techStack: string[];
  liveUrl?: string;
  completedAt: string;     // ISO date string
}
