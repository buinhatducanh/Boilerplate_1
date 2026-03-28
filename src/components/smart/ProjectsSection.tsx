// ============================================================
// Smart Component: ProjectsSection
// - Gọi API qua custom hook, truyền data xuống UI Component
// ============================================================

"use client";

import { useProjects } from "@/hooks";
import { ProjectCard } from "@/components/ui";

export function ProjectsSection() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <section className="projects-section">
        <h2>Dự án tiêu biểu</h2>
        <div className="grid-2">
          {[1, 2].map((i) => (
            <div key={i} className="skeleton skeleton-card" />
          ))}
        </div>
      </section>
    );
  }

  if (error) return <div className="error-state">Không thể tải dự án.</div>;

  return (
    <section className="projects-section">
      <h2>Dự án tiêu biểu</h2>
      <div className="grid-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
