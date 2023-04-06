import * as ApiLike from "@/pages/api/like";
import { defaultHeaders, handleResolve, host } from "..";
import { Input } from "./type";

export const path = () => host(`/like`);

export async function postLike({ postId }: Input): Promise<ApiLike.PostReturn> {
  return fetch(path(), {
    method: "POST",
    body: JSON.stringify({ postId }),
    headers: defaultHeaders,
  }).then(handleResolve);
}
