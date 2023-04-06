import { Like, PrismaPromise } from "@prisma/client";
import { prisma } from ".";
import { likesFixture } from "../fixtures/like";

export const likes = () => {
  const likes: PrismaPromise<Like>[] = [];
  for (const data of likesFixture()) {
    const like = prisma.like.create({ data });
    likes.push(like);
  }
  return likes;
};
