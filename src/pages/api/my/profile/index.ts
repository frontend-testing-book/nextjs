import { ApiHandler, handleNotAllowed, withLogin } from "@/lib/next/api";
import { getMyProfile, GetMyProfileReturn } from "@/services/server/MyProfile";

export type GetReturn = GetMyProfileReturn;

const handleGet = withLogin<GetReturn>(async (req, res) => {
  const user = await getMyProfile({ id: req.user.id });
  res.status(200).json(user);
});

const handler: ApiHandler<GetReturn> = async (req, res) => {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    default:
      return handleNotAllowed(res);
  }
};

export default handler;
