import { HttpError } from "@/lib/error";
import * as MyProfile from "../";
import { getMyProfileData } from "./fixture";

jest.mock("../");

export function mockGetMyProfileResolved() {
  return jest
    .spyOn(MyProfile, "getMyProfile")
    .mockResolvedValue(getMyProfileData);
}

export function mockGetMyProfileRejected() {
  return jest
    .spyOn(MyProfile, "getMyProfile")
    .mockRejectedValue(new HttpError(500).serialize());
}
