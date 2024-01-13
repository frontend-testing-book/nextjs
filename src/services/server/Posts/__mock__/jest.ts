import { HttpError } from '@/lib/error';

import { getPostsData } from './fixture';
import * as Posts from '../';

jest.mock('../');

export function mockGetPostsResolved() {
  return jest.spyOn(Posts, 'getPosts').mockResolvedValue(getPostsData);
}

export function mockGetPostsRejected() {
  return jest
    .spyOn(Posts, 'getPosts')
    .mockRejectedValue(new HttpError(500).serialize());
}
