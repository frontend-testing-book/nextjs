import { HttpError } from "@/lib/error";
import * as Login from "../";
import { postLoginData } from "./fixture";

jest.mock("../");

export function mockPostLoginResolved() {
  return jest.spyOn(Login, "postLogin").mockResolvedValue(postLoginData);
}

export function mockPostLoginRejected() {
  return jest
    .spyOn(Login, "postLogin")
    .mockRejectedValue(new HttpError(500).serialize());
}
