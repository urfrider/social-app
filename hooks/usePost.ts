import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";

export const usePost = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/posts/${postId}`,
    fetcher
  );

  return { data, error, isLoading, mutate };
};
