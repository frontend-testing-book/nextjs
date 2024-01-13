import { ErrorStatus, HttpError } from '@/lib/error';

import { uploadImageData } from './fixture';
import * as UploadImage from '../fetcher';

jest.mock('../fetcher');

export function mockUploadImage(status?: ErrorStatus) {
  if (status && status > 299) {
    return jest
      .spyOn(UploadImage, 'uploadImage')
      .mockRejectedValueOnce(new HttpError(status).serialize());
  }
  return jest
    .spyOn(UploadImage, 'uploadImage')
    .mockResolvedValueOnce(uploadImageData);
}
