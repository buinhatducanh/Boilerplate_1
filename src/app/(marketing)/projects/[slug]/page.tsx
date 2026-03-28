import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectsMock } from "@/mocks";
import { USE_MOCK } from "@/lib/use-mock";
import { CtaBanner } from "@/components/blocks";

interface ProjectDetailPageProps {
  params: { slug: string };
}

// Hàm lấy dữ liệu – tự động toggle mock/API
async function getProject(slug: string) {
  if (USE_MOCK) {
    return projectsMock.find((p) => p.slug === slug) ?? null;
  }
  // Khi CMS sẵn sàng: uncomment và thay endpoint
  // const { apiClient, flattenStrapiResponse } = await import("@/lib/api-client");
  // const res = await apiClient.get(`/projects?filters[slug][$eq]=${slug}&populate=*`);
  // const items = flattenStrapiResponse(res.data);
  // return items[0] ?? null;
  return projectsMock.find((p) => p.slug === slug) ?? null;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return { title: "Không tìm thấy" };

  return {
    title: project.title,
    description: project.description.slice(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {project.category}
          </span>
          <h1 className="mt-4 text-4xl font-bold">{project.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{project.description}</p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Khách hàng</h3>
              <p className="mt-1 font-medium">{project.client}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Hoàn thành</h3>
              <p className="mt-1 font-medium">
                {new Date(project.completedAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted-foreground">Tech Stack</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-muted px-2.5 py-0.5 text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Xem website →
            </a>
          )}
        </div>
      </div>

      <CtaBanner
        title="Có dự án tương tự?"
        subtitle="Liên hệ để chúng tôi tư vấn giải pháp phù hợp"
        primaryCta={{ text: "Bắt đầu dự án", href: "/contact" }}
      />
    </>
  );
}
