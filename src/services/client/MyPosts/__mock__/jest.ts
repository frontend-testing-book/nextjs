import { HttpError } from "@/lib/error";
import * as MyPosts from "..";
import { createMyPostsData } from "./fixture";

jest.mock("../");

export function mockCreateMyPostResolved() {
  return jest
    .spyOn(MyPosts, "createMyPosts")
    .mockResolvedValue(createMyPostsData("201"));
}

export function mockCreateMyPostRejected() {
  return jest
    .spyOn(MyPosts, "createMyPosts")
    .mockRejectedValue(new HttpError(500).serialize());
}
