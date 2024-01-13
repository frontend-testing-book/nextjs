import { PrismaClient } from '@prisma/client';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';

import { BadRequestError, InternalServerError } from '@/lib/error';

export const prisma = new PrismaClient();
if (process.env.NODE_ENV === 'development') {
  // MEMO: HMR 対応 https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  (global as any).prisma = prisma;
}

export function handlePrismaError(err: unknown): never {
  if (err instanceof PrismaClientValidationError) {
    throw new BadRequestError();
  }
  if (err instanceof PrismaClientKnownRequestError) {
    throw new BadRequestError();
  }
  if (err instanceof PrismaClientUnknownRequestError) {
    throw new BadRequestError();
  }
  if (err instanceof PrismaClientInitializationError) {
    throw new InternalServerError();
  }
  throw err;
}
