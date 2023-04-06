import { NotFoundError } from "@/lib/error";
import { handlePrismaError, prisma } from "..";

export async function postLike(input: { userId: number; postId: number }) {
  try {
    const post = await prisma.post.findUnique({ where: { id: input.postId } });
    if (!post) throw new NotFoundError();
    const data = await prisma.like.create({
      data: { ...input, authorId: post.authorId },
    });
    return { id: data.id };
  } catch (err) {
    handlePrismaError(err);
  }
}
export type PostLikeReturn = Awaited<ReturnType<typeof postLike>>;
