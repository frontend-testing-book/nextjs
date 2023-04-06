import { HttpError } from "@/lib/error";
import * as Posts from "../";
import { getPostsData } from "./fixture";

jest.mock("../");

export function mockGetPostsResolved() {
  return jest.spyOn(Posts, "getPosts").mockResolvedValue(getPostsData);
}

export function mockGetPostsRejected() {
  return jest
    .spyOn(Posts, "getPosts")
    .mockRejectedValue(new HttpError(500).serialize());
}
