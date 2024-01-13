import { HttpError } from '@/lib/error';

import { updateMyProfileEditData } from './fixture';
import * as MyProfileEdit from '..';

jest.mock('../');

export function mockUpdateMyProfileEditResolved() {
  return jest
    .spyOn(MyProfileEdit, 'updateMyProfileEdit')
    .mockResolvedValue(updateMyProfileEditData);
}

export function mockUpdateMyProfileEditRejected() {
  return jest
    .spyOn(MyProfileEdit, 'updateMyProfileEdit')
    .mockRejectedValue(new HttpError(500).serialize());
}
