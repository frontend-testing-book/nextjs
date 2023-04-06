import { HttpError } from "@/lib/error";
import * as Like from "../";
import { postLikeData } from "./fixture";

jest.mock("../");

export function mockPostLikeResolved() {
  return jest.spyOn(Like, "postLike").mockResolvedValue(postLikeData);
}

export function mockPostLikeRejected() {
  return jest
    .spyOn(Like, "postLike")
    .mockRejectedValue(new HttpError(500).serialize());
}
