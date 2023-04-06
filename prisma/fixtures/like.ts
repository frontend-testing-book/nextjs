import { Like } from "@prisma/client";

export const likesFixture = (): Omit<Like, "id" | "createdAt">[] => [
  {
    userId: 1,
    postId: 1,
    authorId: 2,
  },
];
