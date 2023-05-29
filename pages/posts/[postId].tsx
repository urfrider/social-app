import Form from "@/components/Form";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import { usePost } from "@/hooks/usePost";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";

const Post = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: post, isLoading } = usePost(postId as string);
  console.log(post);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label="Post" showBackArrow />
      <PostItem data={post} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Comment your reply"
      />
    </>
  );
};

export default Post;
