import { rest } from 'msw';

import { deleteMyPostData, updateMyPostData } from './fixture';
import { path } from '..';

export function handlePutMyPost(args?: { status?: number }) {
  return rest.put(path(':id'), async (_, res, ctx) => {
    if (args?.status) {
      return res(ctx.status(args.status));
    }
    return res(ctx.json(updateMyPostData));
  });
}

export function handleDeleteMyPost(args?: { status?: number }) {
  return rest.delete(path(':id'), async (_, res, ctx) => {
    if (args?.status) {
      return res(ctx.status(args.status));
    }
    return res(ctx.json(deleteMyPostData));
  });
}

export const handlers = [handlePutMyPost(), handleDeleteMyPost()];
