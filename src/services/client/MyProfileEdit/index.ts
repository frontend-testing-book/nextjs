import * as ApiMyProfileEdit from "@/pages/api/my/profile/edit";
import { defaultHeaders, handleResolve, host } from "..";

export const path = () => host(`/my/profile/edit`);

export async function updateMyProfileEdit({
  input,
}: {
  input: ApiMyProfileEdit.PutInput;
}): Promise<ApiMyProfileEdit.PutReturn> {
  const body = JSON.stringify(input);
  return fetch(path(), {
    method: "PUT",
    body,
    headers: defaultHeaders,
  }).then(handleResolve);
}
