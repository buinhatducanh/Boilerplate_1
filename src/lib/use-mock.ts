// ============================================================
// Mock Data Toggle
// Khi USE_MOCK=true, hooks sẽ trả mock data thay vì gọi API.
// Toggle bằng env hoặc import trực tiếp.
// ============================================================

export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";
