import { HttpError } from "@/lib/error";
import * as MyProfile from "..";
import { getMyProfileData } from "./fixture";

jest.mock("../");

export function mockUpdateMyProfileEditResolved() {
  return jest
    .spyOn(MyProfile, "getMyProfile")
    .mockResolvedValue(getMyProfileData);
}

export function mockUpdateMyProfileEditRejected() {
  return jest
    .spyOn(MyProfile, "getMyProfile")
    .mockRejectedValue(new HttpError(500).serialize());
}
