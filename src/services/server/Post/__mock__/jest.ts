import { HttpError } from "@/lib/error";
import * as Post from "../";
import { getPostData } from "./fixture";

jest.mock("../");

export function mockGetPostResolved() {
  return jest.spyOn(Post, "getPost").mockResolvedValue(getPostData);
}

export function mockGetPostRejected() {
  return jest
    .spyOn(Post, "getPost")
    .mockRejectedValue(new HttpError(500).serialize());
}
