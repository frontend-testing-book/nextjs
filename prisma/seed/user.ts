import { PrismaPromise, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from ".";
import { usersFixture } from "../fixtures/user";

export const users = () => {
  const users: PrismaPromise<User>[] = [];
  for (const data of usersFixture()) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);
    const user = prisma.user.create({ data: { ...data, password: hash } });
    users.push(user);
  }
  return users;
};
