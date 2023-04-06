import * as z from "zod";

export const updateMyProfileEditInputSchema = z.object({
  name: z.string().min(1, "1文字以上入力してください"),
  bio: z.string().min(1, "1文字以上入力してください"),
  githubAccount: z.string().optional(),
  twitterAccount: z.string().optional(),
  imageUrl: z.string().optional(),
});
export type UpdateMyProfileEditInput = z.infer<
  typeof updateMyProfileEditInputSchema
>;
