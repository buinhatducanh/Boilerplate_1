import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api";
const API_TOKEN = process.env.API_TOKEN;

// ============================================================
// Axios instance cấu hình sẵn cho Headless CMS (Strapi v4+)
// ============================================================

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
  },
});

// ============================================================
// SWR Fetcher – dùng chung cho tất cả hooks
// ============================================================

export const swrFetcher = async (url: string) => {
  const res = await apiClient.get(url);
  return res.data;
};

// ============================================================
// Helper: chuẩn hóa response từ Strapi v4
// Strapi trả { data: { id, attributes }, meta }
// Helper này flatten thành object phẳng dễ dùng hơn.
// ============================================================

export interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  } | {
    id: number;
    attributes: T;
  }[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export function flattenStrapiItem<T>(item: { id: number; attributes: T }): T & { id: number } {
  return { id: item.id, ...item.attributes };
}

export function flattenStrapiResponse<T>(response: StrapiResponse<T>): (T & { id: number })[] {
  if (Array.isArray(response.data)) {
    return response.data.map(flattenStrapiItem);
  }
  return [flattenStrapiItem(response.data)];
}
