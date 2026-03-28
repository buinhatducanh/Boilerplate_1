// ============================================================
// UI Component: ProjectCard (Dumb Component)
// - Chỉ nhận props, KHÔNG gọi API
// ============================================================

import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      <img src={project.thumbnail} alt={project.title} className="project-thumb" />
      <div className="project-body">
        <span className="project-category">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-meta">
          <span className="project-client">{project.client}</span>
          <div className="project-tech">
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>
        </div>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            Xem dự án →
          </a>
        )}
      </div>
    </div>
  );
}
