import { HttpError } from '@/lib/error';

import { data } from './fixture';
import * as Like from '../fetcher';

jest.mock('../fetcher');

export function mockPostLikeResolved() {
  return jest.spyOn(Like, 'postLike').mockResolvedValue(data);
}

export function mockPostLikeRejected() {
  return jest
    .spyOn(Like, 'postLike')
    .mockRejectedValue(new HttpError(500).serialize());
}
