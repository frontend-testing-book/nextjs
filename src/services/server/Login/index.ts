import { NotFoundError } from "@/lib/error";
import { ValidationError } from "@/lib/error/validation";
import bcrypt from "bcryptjs";
import { handlePrismaError, prisma } from "..";

export async function postLogin(input: { email: string; password: string }) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });
    if (!user) throw new NotFoundError();
    if (!bcrypt.compareSync(input.password, user.password))
      throw new ValidationError();
    const { id, name, email, imageUrl } = user;
    return { id, name, email, imageUrl };
  } catch (err) {
    handlePrismaError(err);
  }
}
export type PostLoginReturn = Awaited<ReturnType<typeof postLogin>>;
