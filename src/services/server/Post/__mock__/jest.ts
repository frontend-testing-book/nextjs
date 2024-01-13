import { HttpError } from '@/lib/error';

import { getPostData } from './fixture';
import * as Post from '../';

jest.mock('../');

export function mockGetPostResolved() {
  return jest.spyOn(Post, 'getPost').mockResolvedValue(getPostData);
}

export function mockGetPostRejected() {
  return jest
    .spyOn(Post, 'getPost')
    .mockRejectedValue(new HttpError(500).serialize());
}
