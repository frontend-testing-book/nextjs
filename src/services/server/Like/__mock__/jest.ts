import { HttpError } from '@/lib/error';

import { postLikeData } from './fixture';
import * as Like from '../';

jest.mock('../');

export function mockPostLikeResolved() {
  return jest.spyOn(Like, 'postLike').mockResolvedValue(postLikeData);
}

export function mockPostLikeRejected() {
  return jest
    .spyOn(Like, 'postLike')
    .mockRejectedValue(new HttpError(500).serialize());
}
