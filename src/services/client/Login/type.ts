import * as z from "zod";

export const InputSchema = z.object({
  email: z.string().email("不正なメールアドレス形式です"),
  password: z.string().min(8, "8文字以上で入力してください"),
});
export type Input = z.infer<typeof InputSchema>;
