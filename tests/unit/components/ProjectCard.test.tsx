import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { Project } from "@/types";

const mockProject: Project = {
  id: 1,
  title: "Website BĐS XYZ",
  slug: "bat-dong-san-xyz",
  description: "Website giới thiệu dự án bất động sản cao cấp.",
  thumbnail: "/images/project-01-thumb.jpg",
  images: [],
  client: "Công ty BĐS XYZ",
  category: "Corporate Website",
  techStack: ["NextJS", "Strapi"],
  liveUrl: "https://example.com",
  completedAt: "2024-06-15",
};

describe("ProjectCard", () => {
  it("renders project title, description, and client", () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText("Website BĐS XYZ")).toBeInTheDocument();
    expect(screen.getByText("Website giới thiệu dự án bất động sản cao cấp.")).toBeInTheDocument();
    expect(screen.getByText("Công ty BĐS XYZ")).toBeInTheDocument();
  });

  it("renders tech stack badges", () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText("NextJS")).toBeInTheDocument();
    expect(screen.getByText("Strapi")).toBeInTheDocument();
  });

  it("renders live URL link when provided", () => {
    render(<ProjectCard project={mockProject} />);

    const link = screen.getByText("Xem dự án →");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("does not render link when liveUrl is missing", () => {
    const projectNoUrl: Project = { ...mockProject, liveUrl: undefined };
    render(<ProjectCard project={projectNoUrl} />);

    expect(screen.queryByText("Xem dự án →")).not.toBeInTheDocument();
  });
});
