import { HttpError } from '@/lib/error';

import { postLoginData } from './fixture';
import * as Login from '../';

jest.mock('../');

export function mockPostLoginResolved() {
  return jest.spyOn(Login, 'postLogin').mockResolvedValue(postLoginData);
}

export function mockPostLoginRejected() {
  return jest
    .spyOn(Login, 'postLogin')
    .mockRejectedValue(new HttpError(500).serialize());
}
