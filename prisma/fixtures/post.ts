import { Post } from "@prisma/client";
import fs from "fs";
import { resolve } from "path";
export const postsFixture = ({
  authorId,
}: {
  authorId: number;
}): Omit<Post, "id" | "createdAt" | "updatedAt">[] => {
  const body = fs.readFileSync(resolve(__dirname, "post-mock.md"), "utf8");
  return [...new Array(30)].map((_, i) => ({
    title: `Frontend Testing ${(i + 1) * authorId}`,
    description: "Hello World",
    body,
    imageUrl: `/__mocks__/images/img${`0${(i % 14) + 1}`.slice(-2)}.jpg`,
    published: !!(i % 4),
    authorId: authorId,
  }));
};
