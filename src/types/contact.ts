// ============================================================
// ContactMessage – Form liên hệ
// CMS Collection: contact-messages
// ============================================================

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;       // ISO date string
}

// Payload gửi đi (không có id, createdAt)
export type ContactMessagePayload = Omit<ContactMessage, "id" | "createdAt">;
