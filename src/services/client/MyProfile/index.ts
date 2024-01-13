import * as ApiMyProfile from '@/pages/api/my/profile';

import { defaultHeaders, handleResolve, host } from '..';

export const path = () => host(`/my/profile`);

export async function getMyProfile(): Promise<ApiMyProfile.GetReturn> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return fetch(path(), {
    headers: defaultHeaders,
  }).then(handleResolve);
}
