import { HttpError } from '@/lib/error';

import { data } from './fixture';
import * as Login from '../fetcher';

jest.mock('../fetcher');

export function mockPostLoginResolved() {
  return jest.spyOn(Login, 'postLogin').mockResolvedValue(data);
}

export function mockPostLoginRejected() {
  return jest
    .spyOn(Login, 'postLogin')
    .mockRejectedValue(new HttpError(500).serialize());
}
