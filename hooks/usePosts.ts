import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";

export const usePosts = (userId?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${userId ? `/api/posts?userId=${userId}` : "/api/posts"}`,
    fetcher
  );

  return { data, error, isLoading, mutate };
};
