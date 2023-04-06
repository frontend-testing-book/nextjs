import { HttpError } from "@/lib/error";
import * as MyProfileEdit from "..";
import { updateMyProfileEditData } from "./fixture";

jest.mock("../");

export function mockUpdateMyProfileEditResolved() {
  return jest
    .spyOn(MyProfileEdit, "updateMyProfileEdit")
    .mockResolvedValue(updateMyProfileEditData);
}

export function mockUpdateMyProfileEditRejected() {
  return jest
    .spyOn(MyProfileEdit, "updateMyProfileEdit")
    .mockRejectedValue(new HttpError(500).serialize());
}
