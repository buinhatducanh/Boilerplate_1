// ============================================================
// Smart Component: ContactSection
// - Xử lý logic gửi form liên hệ qua custom hook
// ============================================================

"use client";

import { useContact } from "@/hooks";
import { ContactForm } from "@/components/ui";

export function ContactSection() {
  const { submit, isLoading, isSuccess, error } = useContact();

  return (
    <section className="contact-section">
      <h2>Liên hệ với chúng tôi</h2>
      <ContactForm
        onSubmit={submit}
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error}
      />
    </section>
  );
}
