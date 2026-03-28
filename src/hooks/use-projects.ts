import useSWR from "swr";
import type { Project } from "@/types";
import { swrFetcher, flattenStrapiResponse, type StrapiResponse } from "@/lib/api-client";
import { USE_MOCK } from "@/lib/use-mock";
import { projectsMock } from "@/mocks";

export function useProjects() {
  const { data, error, isLoading } = useSWR<StrapiResponse<Omit<Project, "id">>>(
    USE_MOCK ? null : "/projects?populate=*&sort=completedAt:desc",
    swrFetcher
  );

  return {
    projects: USE_MOCK ? projectsMock : data ? flattenStrapiResponse(data) : [],
    isLoading: USE_MOCK ? false : isLoading,
    error: USE_MOCK ? null : error,
  };
}
