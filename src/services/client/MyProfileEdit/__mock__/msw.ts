import { HttpError } from "@/lib/error";
import * as ApiMyProfileEdit from "@/pages/api/my/profile/edit";
import { rest } from "msw";
import { path } from "..";
import { updateMyProfileEditData } from "./fixture";

export function handleCreateMyProfile() {
  return rest.put(path(), async (req, res, ctx) => {
    const body: ApiMyProfileEdit.PutInput = await req.json();
    if (body.name === "User.500") {
      const err = new HttpError(500).serialize();
      return res(ctx.status(err.status), ctx.json(err));
    }
    return res(ctx.status(200), ctx.json(updateMyProfileEditData));
  });
}

export const handlers = [handleCreateMyProfile()];
