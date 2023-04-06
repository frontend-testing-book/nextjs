import { getSession } from "@/lib/next-session";
import { assertAsUser, LoginUser } from "@/lib/schema/LoginUser";
import type { GetServerSidePropsContext } from "next";
import { HttpError, UnauthorizedError } from "../error";

type WithLoginNextFn<T> = (
  ctx: GetServerSidePropsContext & { user: LoginUser }
) => Promise<T>;

export function withLogin<T>(next: WithLoginNextFn<T>) {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx.req, ctx.res);
    try {
      assertAsUser(session.user);
      const data = await next({ ...ctx, user: session.user });
      return { props: { data, err: null } };
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        session.redirectUrl = ctx.resolvedUrl;
        return { redirect: { permanent: false, destination: "/login" } };
      }
      if (err instanceof HttpError) {
        return { props: { data: null, err: err.serialize() } };
      }
      throw err;
    }
  };
}

type WithoutLoginNextFn<T> = (
  ctx: GetServerSidePropsContext & { user: LoginUser | null }
) => Promise<T>;

export function withoutLogin<T>(next: WithoutLoginNextFn<T>) {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx.req, ctx.res);
    try {
      const data = await next({ ...ctx, user: session?.user || null });
      return { props: { data, err: null } };
    } catch (err) {
      if (err instanceof HttpError) {
        return { props: { data: null, err: err.serialize() } };
      }
      throw err;
    }
  };
}
