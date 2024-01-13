import { rest } from 'msw';

import { getMyProfileData } from './fixture';
import { path } from '..';

export function handleGetMyProfile(args?: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mock?: jest.Mock<any, any>;
  status?: number;
}) {
  return rest.get(path(), async (_, res, ctx) => {
    args?.mock?.();
    if (args?.status) {
      return res(ctx.status(args.status));
    }
    return res(ctx.status(200), ctx.json(getMyProfileData));
  });
}

export const handlers = [handleGetMyProfile()];
