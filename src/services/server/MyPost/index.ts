import { NotFoundError } from "@/lib/error";
import { UpdateMyPostInput } from "@/lib/schema/MyPost";
import { handlePrismaError, prisma } from "..";

export async function getMyPost({
  id,
  authorId,
}: {
  id: number;
  authorId: number;
}) {
  try {
    const data = await prisma.post.findUnique({ where: { id } });
    if (!data || data?.authorId !== authorId) throw new NotFoundError();
    const { createdAt, updatedAt, ...res } = data;
    return res;
  } catch (err) {
    handlePrismaError(err);
  }
}
export type GetMyPostReturn = Awaited<ReturnType<typeof getMyPost>>;

export async function updateMyPost({
  id,
  input,
}: {
  id: number;
  input: UpdateMyPostInput;
}) {
  try {
    const data = await prisma.post.update({ where: { id }, data: input });
    return { id: data.id };
  } catch (err) {
    handlePrismaError(err);
  }
}
export type UpdateMyPostReturn = Awaited<ReturnType<typeof updateMyPost>>;

export async function deleteMyPost({ id }: { id: number }) {
  try {
    const data = await prisma.post.delete({ where: { id } });
    return { id: data.id };
  } catch (err) {
    handlePrismaError(err);
  }
}
export type DeleteMyPostReturn = Awaited<ReturnType<typeof deleteMyPost>>;
