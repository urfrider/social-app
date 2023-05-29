import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;

    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== "string") {
      return new Error("Invalid ID");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid ID");
    }

    let updatedLikeIds = [...(post.likedIds || [])];

    if (req.method === "POST") {
      updatedLikeIds.push(currentUser.id);
    }

    if (req.method === "DELETE") {
      updatedLikeIds = updatedLikeIds.filter(
        (likedId) => likedId !== currentUser.id
      );
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikeIds,
      },
    });

    return res.status(200).end(updatedPost);
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  }
}
