import RedisStoreFactory from "connect-redis";
import { IncomingMessage, ServerResponse } from "http";
import Redis from "ioredis";
import nextSession, { SessionStore } from "next-session";
import { expressSession, promisifyStore } from "next-session/lib/compat";

export const RedisStore = RedisStoreFactory(expressSession);

let store: SessionStore;

export const getSession = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  if (!store) {
    store = promisifyStore(
      new RedisStore({
        client: new Redis({
          port: Number(process.env.REDIS_PORT),
          host: process.env.REDIS_HOST || "",
        }),
      })
    );
  }
  return nextSession({
    store,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    },
  })(req, res);
};
