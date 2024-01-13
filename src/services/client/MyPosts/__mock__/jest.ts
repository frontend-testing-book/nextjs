import { HttpError } from '@/lib/error';

import { createMyPostsData } from './fixture';
import * as MyPosts from '..';

jest.mock('../');

export function mockCreateMyPostResolved() {
  return jest
    .spyOn(MyPosts, 'createMyPosts')
    .mockResolvedValue(createMyPostsData('201'));
}

export function mockCreateMyPostRejected() {
  return jest
    .spyOn(MyPosts, 'createMyPosts')
    .mockRejectedValue(new HttpError(500).serialize());
}
