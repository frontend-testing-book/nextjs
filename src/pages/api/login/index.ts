import { getSession } from "@/lib/next-session";
import {
  ApiHandler,
  handleApiRouteError,
  handleNotAllowed,
} from "@/lib/next/api";
import { postLogin } from "@/services/server/Login";

export type PostReturn = { redirectUrl: string };

const handlePost: ApiHandler<PostReturn> = async (req, res) => {
  try {
    const user = await postLogin({
      email: req.body.email,
      password: req.body.password,
    });
    const session = await getSession(req, res);
    session.user = user;
    res.status(200).json({ redirectUrl: session.redirectUrl || "/" });
  } catch (err) {
    handleApiRouteError({ res, err });
  }
};

const handler: ApiHandler<PostReturn> = async (req, res) => {
  switch (req.method) {
    case "POST":
      return handlePost(req, res);
    default:
      return handleNotAllowed(res);
  }
};

export default handler;
