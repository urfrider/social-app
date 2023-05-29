import { useCurrentUser } from "./useCurrentUser";
import { usePost } from "./usePost";
import { usePosts } from "./usePosts";
import useLoginModal from "./useLoginModal";
import { useMemo } from "react";
import toast from "react-hot-toast";
import axios from "axios";

// userId for individual profile
export const useLike = ({
  postId,
  userId,
}: {
  postId: string;
  userId?: string;
}) => {
  const { data: currentUser } = useCurrentUser();
  const { data: post, mutate: mutatePost } = usePost(postId);
  const { mutate: mutatePosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = post?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [currentUser?.id, post?.likedIds]);

  const toggleLike = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      let request;
      if (hasLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }

      await request();
      mutatePost();
      mutatePosts();

      toast.success("Successfully liked!");
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  return { hasLiked, toggleLike };
};
