import { HttpError } from "@/lib/error";
import * as Like from "../fetcher";
import { data } from "./fixture";

jest.mock("../fetcher");

export function mockPostLikeResolved() {
  return jest.spyOn(Like, "postLike").mockResolvedValue(data);
}

export function mockPostLikeRejected() {
  return jest
    .spyOn(Like, "postLike")
    .mockRejectedValue(new HttpError(500).serialize());
}
