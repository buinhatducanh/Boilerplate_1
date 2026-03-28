import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import type { Service } from "@/types";

const mockService: Service = {
  id: 1,
  title: "Thiết kế UI/UX",
  slug: "thiet-ke-ui-ux",
  description: "Thiết kế giao diện người dùng trực quan.",
  icon: "palette",
  image: "/images/service-uiux.jpg",
  features: ["Wireframe", "Prototype", "Design System"],
  order: 1,
};

describe("ServiceCard", () => {
  it("renders service title and description", () => {
    render(<ServiceCard service={mockService} />);

    expect(screen.getByText("Thiết kế UI/UX")).toBeInTheDocument();
    expect(screen.getByText("Thiết kế giao diện người dùng trực quan.")).toBeInTheDocument();
  });

  it("renders all feature items", () => {
    render(<ServiceCard service={mockService} />);

    expect(screen.getByText("Wireframe")).toBeInTheDocument();
    expect(screen.getByText("Prototype")).toBeInTheDocument();
    expect(screen.getByText("Design System")).toBeInTheDocument();
  });

  it("renders service image when provided", () => {
    render(<ServiceCard service={mockService} />);

    const img = screen.getByAlt("Thiết kế UI/UX");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/service-uiux.jpg");
  });

  it("renders without image when not provided", () => {
    const serviceWithoutImage: Service = { ...mockService, image: undefined };
    render(<ServiceCard service={serviceWithoutImage} />);

    expect(screen.getByText("Thiết kế UI/UX")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
