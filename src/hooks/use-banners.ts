import useSWR from "swr";
import type { Banner } from "@/types";
import { swrFetcher, flattenStrapiResponse, type StrapiResponse } from "@/lib/api-client";
import { USE_MOCK } from "@/lib/use-mock";
import { bannersMock } from "@/mocks";

export function useBanners() {
  const { data, error, isLoading } = useSWR<StrapiResponse<Omit<Banner, "id">>>(
    USE_MOCK ? null : "/banners?populate=*&sort=order:asc",
    swrFetcher
  );

  return {
    banners: USE_MOCK ? bannersMock : data ? flattenStrapiResponse(data) : [],
    isLoading: USE_MOCK ? false : isLoading,
    error: USE_MOCK ? null : error,
  };
}
