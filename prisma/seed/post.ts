import { Post, PrismaPromise } from "@prisma/client";
import { prisma } from ".";
import { postsFixture } from "../fixtures/post";
import { userNames } from "../fixtures/user";

export const posts = () => {
  const posts: PrismaPromise<Post>[] = [];
  userNames.forEach((_, index) => {
    for (const data of postsFixture({ authorId: index + 1 })) {
      const post = prisma.post.create({ data });
      posts.push(post);
    }
  });
  return posts;
};
