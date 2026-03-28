"use client";

import { useState } from "react";
import { Section, SectionHeader } from "@/components/primitives";
import { cn } from "@/lib/utils";

// ============================================================
// FaqAccordion – Câu hỏi thường gặp dạng accordion.
// Dùng cho: FAQ, support page, product Q&A.
// ============================================================

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  badge?: string;
  title: string;
  subtitle?: string;
  faqs: FaqItem[];
}

export function FaqAccordion({ badge, title, subtitle, faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section>
      <SectionHeader badge={badge} title={title} subtitle={subtitle} />
      <div className="mx-auto mt-12 max-w-3xl divide-y">
        {faqs.map((faq, i) => (
          <div key={i} className="py-4">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-base font-medium">{faq.question}</span>
              <svg
                className={cn(
                  "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                  openIndex === i && "rotate-180",
                )}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {openIndex === i && (
              <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
