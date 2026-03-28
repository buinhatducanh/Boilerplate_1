import { useState } from "react";
import type { ContactMessagePayload } from "@/types";
import { apiClient } from "@/lib/api-client";

export function useContact() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: ContactMessagePayload) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      await apiClient.post("/contact-messages", { data: payload });
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, isSuccess, error };
}
