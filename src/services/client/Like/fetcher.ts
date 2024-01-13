import * as ApiLike from '@/pages/api/like';

import { Input } from './type';
import { defaultHeaders, handleResolve, host } from '..';

export const path = () => host(`/like`);

export async function postLike({ postId }: Input): Promise<ApiLike.PostReturn> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return fetch(path(), {
    method: 'POST',
    body: JSON.stringify({ postId }),
    headers: defaultHeaders,
  }).then(handleResolve);
}
