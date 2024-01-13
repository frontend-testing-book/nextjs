import { rest } from 'msw';

import { HttpError } from '@/lib/error';
import * as ApiLike from '@/pages/api/like';

import { data } from './fixture';
import { Input, path } from '..';

export function handlePostLike() {
  return rest.post<Input, object, ApiLike.PostReturn>(
    path(),
    async (req, res, ctx) => {
      const body: Input = await req.json();
      if (body.postId === 500) {
        const err = new HttpError(500).serialize();
        return res(ctx.status(err.status));
      }
      return res(ctx.status(201), ctx.json(data));
    },
  );
}

export const handlers = [handlePostLike()];
