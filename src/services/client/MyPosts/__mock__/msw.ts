import { HttpError } from "@/lib/error";
import * as ApiMyPosts from "@/pages/api/my/posts";
import { rest } from "msw";
import { path } from "..";
import { createMyPostsData } from "./fixture";

export function handleCreateMyPosts(spy?: jest.Mock<any, any>) {
  return rest.post(path(), async (req, res, ctx) => {
    const data: ApiMyPosts.PostInput = await req.json();
    spy?.({ body: data, headers: req.headers.get("content-type") });
    if (data.title === "500") {
      const err = new HttpError(500).serialize();
      return res(ctx.status(err.status), ctx.json(err));
    }
    return res(ctx.json(createMyPostsData(data.title)));
  });
}

export const handlers = [handleCreateMyPosts()];
