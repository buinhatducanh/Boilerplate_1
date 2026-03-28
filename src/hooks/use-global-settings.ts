import useSWR from "swr";
import type { GlobalSettings } from "@/types";
import { swrFetcher, flattenStrapiResponse, type StrapiResponse } from "@/lib/api-client";
import { USE_MOCK } from "@/lib/use-mock";
import { globalSettingsMock } from "@/mocks";

export function useGlobalSettings() {
  const { data, error, isLoading } = useSWR<StrapiResponse<GlobalSettings>>(
    USE_MOCK ? null : "/global-setting?populate=*",
    swrFetcher
  );

  const settings = USE_MOCK
    ? globalSettingsMock
    : data
      ? flattenStrapiResponse(data)[0]
      : null;

  return {
    settings,
    isLoading: USE_MOCK ? false : isLoading,
    error: USE_MOCK ? null : error,
  };
}
