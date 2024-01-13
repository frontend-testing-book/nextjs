import { z } from 'zod';

import { ApiHandler, handleNotAllowed, withLogin } from '@/lib/next/api';
import {
  UpdateMyPostInput,
  updateMyPostInputSchema,
} from '@/lib/schema/MyPost';
import { validate } from '@/lib/util';
import { deleteMyPost, updateMyPost } from '@/services/server/MyPost';

import type {
  DeleteMyPostReturn,
  UpdateMyPostReturn,
} from '@/services/server/MyPost';

export type PutInput = UpdateMyPostInput;
export type PutReturn = UpdateMyPostReturn;
export type DeleteReturn = DeleteMyPostReturn;

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const handlePut = withLogin<PutReturn>(async (req, res) => {
  validate(req.query, z.object({ postId: z.string() }));
  validate(req.body, updateMyPostInputSchema);
  const post = await updateMyPost({
    id: +req.query.postId,
    input: req.body,
  });
  res.status(200).json(post);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const handleDelete = withLogin<DeleteReturn>(async (req, res) => {
  validate(req.query, z.object({ postId: z.string() }));
  const post = await deleteMyPost({
    id: +req.query.postId,
  });
  res.status(200).json(post);
});

const handler: ApiHandler<PutReturn | DeleteReturn> = async (req, res) => {
  switch (req.method) {
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      return handleNotAllowed(res);
  }
};

export default handler;
