import { NotFoundError } from "@/lib/error";
import { UpdateMyProfileEditInput } from "@/lib/schema/MyProfileEdit";
import { handlePrismaError, prisma } from "..";

export async function getMyProfileEdit({ id }: { id: number }) {
  try {
    const data = await prisma.user.findUnique({ where: { id } });
    if (!data) throw new NotFoundError();
    const { createdAt, updatedAt, password, ...res } = data;
    return res;
  } catch (err) {
    handlePrismaError(err);
  }
}
export type GetMyProfileEditReturn = Awaited<
  ReturnType<typeof getMyProfileEdit>
>;

export async function updateMyProfileEdit({
  id,
  input,
}: {
  id: number;
  input: UpdateMyProfileEditInput;
}) {
  try {
    const data = await prisma.user.update({
      where: { id },
      data: input,
    });
    return { id: data.id, name: data.name, imageUrl: data.imageUrl };
  } catch (err) {
    handlePrismaError(err);
  }
}
export type UpdateMyProfileEditReturn = Awaited<
  ReturnType<typeof updateMyProfileEdit>
>;
