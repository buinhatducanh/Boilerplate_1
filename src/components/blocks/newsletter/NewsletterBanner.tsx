"use client";

import { useState } from "react";
import { Section, Button } from "@/components/primitives";

// ============================================================
// NewsletterBanner – Đăng ký nhận tin dạng banner.
// Dùng cho: Newsletter signup, lead capture.
// ============================================================

export interface NewsletterBannerProps {
  title: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => void;
  background?: "muted" | "primary" | "dark";
}

export function NewsletterBanner({
  title,
  subtitle,
  placeholder = "Nhập email của bạn",
  buttonText = "Đăng ký",
  onSubmit,
  background = "muted",
}: NewsletterBannerProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <Section background={background} spacing="md">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 opacity-90">{subtitle}</p>}

        {submitted ? (
          <p className="mt-6 font-medium">Cảm ơn bạn đã đăng ký!</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="h-12 rounded-md border bg-background px-4 text-foreground sm:w-80"
            />
            <Button type="submit" size="lg">
              {buttonText}
            </Button>
          </form>
        )}
      </div>
    </Section>
  );
}
