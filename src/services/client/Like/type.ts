import * as z from "zod";

export const InputSchema = z.object({
  postId: z.number().positive().int(),
});
export type Input = z.infer<typeof InputSchema>;
