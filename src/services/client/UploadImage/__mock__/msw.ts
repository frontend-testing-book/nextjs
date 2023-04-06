import { rest } from "msw";
import { path } from "..";
import { uploadImageData } from "./fixture";

export function handleUploadImage() {
  return rest.post(path(), async (req, res, ctx) => {
    await req.arrayBuffer();
    return res(ctx.status(201), ctx.json(uploadImageData));
  });
}

export const handlers = [handleUploadImage()];
