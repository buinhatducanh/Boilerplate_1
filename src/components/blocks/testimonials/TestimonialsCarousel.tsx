"use client";

import { useState } from "react";
import { Section, SectionHeader } from "@/components/primitives";
import { cn } from "@/lib/utils";

// ============================================================
// TestimonialsCarousel – Đánh giá khách hàng dạng carousel.
// Dùng cho: Social proof, customer reviews.
// ============================================================

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
}

export interface TestimonialsCarouselProps {
  badge?: string;
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({
  badge,
  title,
  subtitle,
  testimonials,
}: TestimonialsCarouselProps) {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <Section background="muted">
      <SectionHeader badge={badge} title={title} subtitle={subtitle} />
      <div className="mx-auto mt-12 max-w-3xl text-center">
        <blockquote className="text-xl italic text-foreground">
          &ldquo;{current.quote}&rdquo;
        </blockquote>
        <div className="mt-6 flex items-center justify-center gap-3">
          {current.avatar && (
            <img
              src={current.avatar}
              alt={current.author}
              className="h-12 w-12 rounded-full object-cover"
            />
          )}
          <div className="text-left">
            <p className="font-semibold">{current.author}</p>
            <p className="text-sm text-muted-foreground">
              {current.role}
              {current.company && ` — ${current.company}`}
            </p>
          </div>
        </div>

        {/* Dots Navigation */}
        {testimonials.length > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors",
                  i === active ? "bg-primary" : "bg-border hover:bg-muted-foreground",
                )}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
