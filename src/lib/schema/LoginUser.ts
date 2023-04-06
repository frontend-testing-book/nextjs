import { UnauthorizedError } from "@/lib/error";
import * as z from "zod";

export const LoginUserSchema = z.object({
  id: z.number().min(1),
  name: z.string().min(1),
  email: z.string().email().min(1),
  imageUrl: z.string().optional(),
});
export type LoginUser = z.infer<typeof LoginUserSchema>;

export function assertAsUser(target: unknown): asserts target is LoginUser {
  try {
    LoginUserSchema.parse(target);
  } catch (err) {
    throw new UnauthorizedError();
  }
}
