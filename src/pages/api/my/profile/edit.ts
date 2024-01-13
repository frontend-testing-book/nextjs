import { ApiHandler, handleNotAllowed, withLogin } from '@/lib/next/api';
import { getSession } from '@/lib/next-session';
import {
  UpdateMyProfileEditInput,
  updateMyProfileEditInputSchema,
} from '@/lib/schema/MyProfileEdit';
import { validate } from '@/lib/util';
import { updateMyProfileEdit } from '@/services/server/MyProfileEdit';

import type { UpdateMyProfileEditReturn } from '@/services/server/MyProfileEdit';

export type PutInput = UpdateMyProfileEditInput;
export type PutReturn = UpdateMyProfileEditReturn;

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const handlePut = withLogin<UpdateMyProfileEditReturn>(async (req, res) => {
  validate(req.body, updateMyProfileEditInputSchema);
  const user = await updateMyProfileEdit({
    id: req.user.id,
    input: req.body,
  });
  const session = await getSession(req, res);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  session.user = { ...session.user, name: user.name, imageUrl: user.imageUrl };
  res.status(200).json(user);
});

const handler: ApiHandler<UpdateMyProfileEditReturn> = async (req, res) => {
  switch (req.method) {
    case 'PUT':
      return handlePut(req, res);
    default:
      return handleNotAllowed(res);
  }
};

export default handler;
