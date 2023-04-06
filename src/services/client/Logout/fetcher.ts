import * as ApiLogout from "@/pages/api/logout";
import { defaultHeaders, handleResolve, host } from "..";

export const path = () => host(`/logout`);

export async function postLogout(): Promise<ApiLogout.PostReturn> {
  return fetch(path(), {
    method: "POST",
    headers: defaultHeaders,
  }).then(handleResolve);
}
