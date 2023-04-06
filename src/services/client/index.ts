import { ErrorStatus, HttpError } from "@/lib/error";

export const host = (path: string) => `/api${path}`;

export const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function handleResolve(res: Response) {
  if (!res.ok) {
    const status = res.status as ErrorStatus;
    throw new HttpError(status);
  }
  return res.json();
}
