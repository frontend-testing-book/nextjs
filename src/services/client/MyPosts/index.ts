import * as ApiMyPosts from '@/pages/api/my/posts';

import { defaultHeaders, handleResolve, host } from '..';

export const path = () => host('/my/posts');

export async function createMyPosts({
  input,
}: {
  input: ApiMyPosts.PostInput;
}): Promise<ApiMyPosts.PostReturn> {
  const body = JSON.stringify(input);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return fetch(path(), {
    method: 'POST',
    body,
    headers: defaultHeaders,
  }).then(handleResolve);
}
