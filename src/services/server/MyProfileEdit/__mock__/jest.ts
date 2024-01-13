import { HttpError } from '@/lib/error';

import { getMyProfileData, updateMyProfileData } from './fixture';
import * as MyProfileEdit from '../';

jest.mock('../');

export function mockGetMyProfileEditResolved() {
  return jest
    .spyOn(MyProfileEdit, 'getMyProfileEdit')
    .mockResolvedValue(getMyProfileData);
}

export function mockGetMyProfileEditRejected() {
  return jest
    .spyOn(MyProfileEdit, 'getMyProfileEdit')
    .mockRejectedValue(new HttpError(500).serialize());
}

export function mockUpdateMyProfileEditResolved() {
  return jest
    .spyOn(MyProfileEdit, 'updateMyProfileEdit')
    .mockResolvedValue(updateMyProfileData);
}

export function mockUpdateMyProfileEditRejected() {
  return jest
    .spyOn(MyProfileEdit, 'updateMyProfileEdit')
    .mockRejectedValue(new HttpError(500).serialize());
}
