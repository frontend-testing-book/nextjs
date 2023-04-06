import { ErrorStatus, HttpError } from "@/lib/error";
import * as UploadImage from "../fetcher";
import { uploadImageData } from "./fixture";

jest.mock("../fetcher");

export function mockUploadImage(status?: ErrorStatus) {
  if (status && status > 299) {
    return jest
      .spyOn(UploadImage, "uploadImage")
      .mockRejectedValueOnce(new HttpError(status).serialize());
  }
  return jest
    .spyOn(UploadImage, "uploadImage")
    .mockResolvedValueOnce(uploadImageData);
}
