import { Err, errors, HttpError } from "@/lib/error";
import { getSession } from "@/lib/next-session";
import { assertAsUser, LoginUser } from "@/lib/schema/LoginUser";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

export type NextApiRequestWithLogin = NextApiRequest & { user: LoginUser };
export type ApiHandler<T> = NextApiHandler<T | Err>;

export function withLogin<T>(
  next: (req: NextApiRequestWithLogin, res: NextApiResponse<T | Err>) => void
) {
  return async (req: NextApiRequest, res: NextApiResponse<T | Err>) => {
    try {
      const session = await getSession(req, res);
      assertAsUser(session.user);
      await next(
        { ...req, user: session.user } as NextApiRequestWithLogin,
        res
      );
    } catch (err) {
      handleApiRouteError({ res, err });
    }
  };
}

export function handleApiRouteError({
  res,
  err,
}: {
  res: NextApiResponse<Err>;
  err: unknown;
}) {
  if (err instanceof ZodError) {
    const status = 400;
    const { message } = errors[status];
    res.status(status).json({ status, message });
    return;
  }
  if (err instanceof HttpError) {
    const { status, message } = err.serialize();
    res.status(status).json({ status, message });
    return;
  }
  const status = 500;
  const { message } = errors[status];
  res.status(status).json({ status, message });
}

export function handleNotAllowed(res: NextApiResponse<Err>) {
  const status = 405;
  const { message } = errors[status];
  res.status(status).json({ status, message });
}
