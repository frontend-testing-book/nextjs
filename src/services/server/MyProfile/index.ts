import { NotFoundError } from "@/lib/error";
import { handlePrismaError, prisma } from "..";

export async function getMyProfile({ id }: { id: number }) {
  try {
    const [data, likes] = await Promise.all([
      prisma.user.findUnique({ where: { id } }),
      prisma.like.findMany({ where: { authorId: id } }),
    ]);
    if (!data) throw new NotFoundError();
    const { createdAt, updatedAt, password, ...res } = data;
    return { ...res, likeCount: likes.length };
  } catch (err) {
    handlePrismaError(err);
  }
}
export type GetMyProfileReturn = Awaited<ReturnType<typeof getMyProfile>>;
