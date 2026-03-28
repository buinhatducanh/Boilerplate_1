import useSWR from "swr";
import type { Service } from "@/types";
import { swrFetcher, flattenStrapiResponse, type StrapiResponse } from "@/lib/api-client";
import { USE_MOCK } from "@/lib/use-mock";
import { servicesMock } from "@/mocks";

export function useServices() {
  const { data, error, isLoading } = useSWR<StrapiResponse<Omit<Service, "id">>>(
    USE_MOCK ? null : "/services?populate=*&sort=order:asc",
    swrFetcher
  );

  return {
    services: USE_MOCK ? servicesMock : data ? flattenStrapiResponse(data) : [],
    isLoading: USE_MOCK ? false : isLoading,
    error: USE_MOCK ? null : error,
  };
}
