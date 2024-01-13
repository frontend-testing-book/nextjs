import { rest } from 'msw';

import * as ApiLogout from '@/pages/api/logout';

import { data } from './fixture';
import { path } from '..';

export function handlePostLogout(args?: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mock?: jest.Mock<any, any>;
  status?: number;
}) {
  return rest.post<object, object, ApiLogout.PostReturn>(
    path(),
    async (_, res, ctx) => {
      args?.mock?.();
      if (args?.status) {
        return res(ctx.status(args.status));
      }
      return res(ctx.status(200), ctx.json(data));
    },
  );
}

export const handlers = [handlePostLogout()];
