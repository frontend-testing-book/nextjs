import mime from 'mime-types';
import { v4 as uuid } from 'uuid';

import { UploadImageData } from './type';
import { host } from '..';

export const path = () => host(`/upload/image`);

export async function uploadImage({
  file,
}: {
  file: File;
}): Promise<UploadImageData> {
  const name = uuid();
  const ext = mime.extension(file.type);
  const filename = encodeURIComponent(`${name}.${ext}`);
  const fileType = encodeURIComponent(file.type);
  const res = await fetch(`${path()}?file=${filename}&fileType=${fileType}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { url, fields } = await res.json();
  const formData = new FormData();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return fetch(url, {
    method: 'POST',
    body: formData,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  }).then(() => ({ url, filename, fields }));
}
