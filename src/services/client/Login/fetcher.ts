import * as ApiLogin from "@/pages/api/login";
import { Input } from ".";
import { defaultHeaders, handleResolve, host } from "..";

export const path = () => host(`/login`);

export async function postLogin(input: Input): Promise<ApiLogin.PostReturn> {
  const body = JSON.stringify(input);
  return fetch(path(), {
    method: "POST",
    body,
    headers: defaultHeaders,
  }).then(handleResolve);
}
