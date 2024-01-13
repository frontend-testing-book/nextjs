import { HttpError } from '@/lib/error';

import { data } from './fixture';
import * as Logout from '../';

jest.mock('../');

export function mockPostLogoutResolved() {
  return jest.spyOn(Logout, 'postLogout').mockResolvedValue(data);
}

export function mockPostLogoutRejected() {
  return jest
    .spyOn(Logout, 'postLogout')
    .mockRejectedValue(new HttpError(500).serialize());
}
