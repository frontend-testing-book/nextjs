import * as ApiMyPost from "@/pages/api/my/posts/[postId]";
import { defaultHeaders, handleResolve, host } from "..";

export const path = (id: string) => host(`/my/posts/${id}`);

export async function updateMyPost({
  id,
  input,
}: {
  id: number;
  input: ApiMyPost.PutInput;
}): Promise<ApiMyPost.PutReturn> {
  const body = JSON.stringify(input);
  return fetch(path(`${id}`), {
    method: "PUT",
    body,
    headers: defaultHeaders,
  }).then(handleResolve);
}

export async function deleteMyPost({
  id,
}: {
  id: number;
}): Promise<ApiMyPost.DeleteReturn> {
  return fetch(path(`${id}`), {
    method: "DELETE",
    headers: defaultHeaders,
  }).then(handleResolve);
}
