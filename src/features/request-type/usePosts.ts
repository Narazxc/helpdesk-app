import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/apiRequestType";
import type { Post } from "../../services/apiRequestType";

export function usePosts() {
  const {
    isLoading,
    data: posts = [],
    error,
  } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return { isLoading, posts, error };
}
