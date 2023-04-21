import React from "react";
import { FaFeather } from "react-icons/fa";
import { useRouter } from "next/router";
import useLoginModal from "@/hooks/useLoginModal";

const PostButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const onClick = () => {
    loginModal.onOpen();
  };

  return (
    <div onClick={onClick}>
      <div
        className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex 
      items-center justify-center bg-sky-500 hover:opacity-80 transition cursor-pointer"
      >
        <FaFeather size={28} color="white" />
      </div>
      <div
        className="mt-6 hidden lg:block rounded-full px-4 py-2
    bg-sky-500 hover:opacity-90 transition cursor-pointer"
      >
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Post
        </p>
      </div>
    </div>
  );
};

export default PostButton;
