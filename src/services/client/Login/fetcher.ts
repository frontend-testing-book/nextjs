import * as ApiLogin from '@/pages/api/login';

import { defaultHeaders, handleResolve, host } from '..';

import { Input } from '.';

export const path = () => host(`/login`);

export async function postLogin(input: Input): Promise<ApiLogin.PostReturn> {
  const body = JSON.stringify(input);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return fetch(path(), {
    method: 'POST',
    body,
    headers: defaultHeaders,
  }).then(handleResolve);
}
