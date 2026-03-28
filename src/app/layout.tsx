import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextJS Figma-to-CMS Boilerplate",
  description: "Boilerplate tối ưu cho quy trình ghép nối UI Figma với Headless CMS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
