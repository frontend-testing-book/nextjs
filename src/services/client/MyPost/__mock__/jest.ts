import { HttpError } from "@/lib/error";
import * as MyPost from "..";
import { deleteMyPostData, updateMyPostData } from "./fixture";

jest.mock("../");

export function mockUpdateMyPostResolved() {
  return jest.spyOn(MyPost, "updateMyPost").mockResolvedValue(updateMyPostData);
}

export function mockUpdateMyPostRejected() {
  return jest
    .spyOn(MyPost, "updateMyPost")
    .mockRejectedValue(new HttpError(500).serialize());
}

export function mockDeleteMyPostResolved() {
  return jest.spyOn(MyPost, "deleteMyPost").mockResolvedValue(deleteMyPostData);
}

export function mockDeleteMyPostRejected() {
  return jest
    .spyOn(MyPost, "deleteMyPost")
    .mockRejectedValue(new HttpError(500).serialize());
}
