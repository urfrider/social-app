import { useMemo } from "react";
import { useCurrentUser } from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import { useUser } from "./useUser";
import { toast } from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [userId, currentUser]);

  const toggleFollow = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      let type: string;

      if (isFollowing) {
        type = "unfollow";
        request = () => axios.post("/api/follow", { userId, type });
      } else {
        type = "follow";
        request = () => axios.post("/api/follow", { userId, type });
      }
      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      toast.success("Updated Successfully!");
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  return { isFollowing, toggleFollow };
};

export default useFollow;
