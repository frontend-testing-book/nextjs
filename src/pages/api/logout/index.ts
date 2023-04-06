import { getSession } from "@/lib/next-session";
import {
  ApiHandler,
  handleApiRouteError,
  handleNotAllowed,
} from "@/lib/next/api";

export type PostReturn = { message: string };

const handlePost: ApiHandler<PostReturn> = async (req, res) => {
  try {
    const session = await getSession(req, res);
    await session.destroy();
    res.status(200).json({ message: "ok" });
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
