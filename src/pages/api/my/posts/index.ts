import { ApiHandler, handleNotAllowed, withLogin } from "@/lib/next/api";
import {
  CreateMyPostInput,
  createMyPostInputSchema,
} from "@/lib/schema/MyPosts";
import { validate } from "@/lib/util";
import type { CreateMyPostReturn } from "@/services/server/MyPosts";
import { createMyPost } from "@/services/server/MyPosts";

export type PostInput = CreateMyPostInput;
export type PostReturn = CreateMyPostReturn;

const handlePost = withLogin<CreateMyPostReturn>(async (req, res) => {
  validate(req.body, createMyPostInputSchema);
  const post = await createMyPost({
    ...req.body,
    authorId: req.user.id,
  });
  res.status(201).json(post);
});

const handler: ApiHandler<CreateMyPostReturn> = async (req, res) => {
  switch (req.method) {
    case "POST":
      return handlePost(req, res);
    default:
      return handleNotAllowed(res);
  }
};

export default handler;
