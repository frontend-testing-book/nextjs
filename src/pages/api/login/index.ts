import {
  ApiHandler,
  handleApiRouteError,
  handleNotAllowed,
} from '@/lib/next/api';
import { getSession } from '@/lib/next-session';
import { postLogin } from '@/services/server/Login';

export type PostReturn = { redirectUrl: string };

const handlePost: ApiHandler<PostReturn> = async (req, res) => {
  try {
    const user = await postLogin({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      email: req.body.email,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      password: req.body.password,
    });
    const session = await getSession(req, res);
    session.user = user;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(200).json({ redirectUrl: session.redirectUrl || '/' });
  } catch (err) {
    handleApiRouteError({ res, err });
  }
};

const handler: ApiHandler<PostReturn> = (req, res) => {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    default:
      return handleNotAllowed(res);
  }
};

export default handler;
