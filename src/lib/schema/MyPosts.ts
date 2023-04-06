import * as z from "zod";

export const createMyPostInputSchema = z.object({
  title: z.string().min(1, "1文字以上入力してください"),
  description: z.string().nullable(),
  body: z.string().nullable(),
  published: z.boolean(),
  imageUrl: z
    .string({ required_error: "イメージを選択してください" })
    .nullable(),
});
export type CreateMyPostInput = z.infer<typeof createMyPostInputSchema>;
