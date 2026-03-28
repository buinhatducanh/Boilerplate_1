// ============================================================
// UI Component: ContactForm (Dumb Component)
// - Chỉ nhận props callback, KHÔNG gọi API trực tiếp
// ============================================================

"use client";

import { useState } from "react";
import type { ContactMessagePayload } from "@/types";

interface ContactFormProps {
  onSubmit: (data: ContactMessagePayload) => void;
  isLoading?: boolean;
  isSuccess?: boolean;
  error?: string | null;
}

const initialForm: ContactMessagePayload = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactForm({ onSubmit, isLoading, isSuccess, error }: ContactFormProps) {
  const [form, setForm] = useState<ContactMessagePayload>(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input name="name" placeholder="Họ và tên" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Số điện thoại" value={form.phone} onChange={handleChange} />
      <input name="subject" placeholder="Tiêu đề" value={form.subject} onChange={handleChange} required />
      <textarea name="message" placeholder="Nội dung" value={form.message} onChange={handleChange} required rows={5} />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Đang gửi..." : "Gửi liên hệ"}
      </button>

      {isSuccess && <p className="success-msg">Gửi thành công! Chúng tôi sẽ liên hệ sớm nhất.</p>}
      {error && <p className="error-msg">{error}</p>}
    </form>
  );
}
