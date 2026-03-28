import Link from "next/link";

const FOOTER_LINKS = {
  services: [
    { label: "Thiết kế UI/UX", href: "/services/thiet-ke-ui-ux" },
    { label: "Phát triển Frontend", href: "/services/phat-trien-frontend" },
    { label: "Headless CMS", href: "/services/headless-cms" },
  ],
  company: [
    { label: "Giới thiệu", href: "/about" },
    { label: "Dự án", href: "/projects" },
    { label: "Liên hệ", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-primary">Agency</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Công ty thiết kế và phát triển web chuyên nghiệp.
            </p>
          </div>

          {/* Service Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Dịch vụ
            </h4>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Công ty
            </h4>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Agency. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
