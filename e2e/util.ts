import { expect, Page } from "@playwright/test";
import { UserName, usersFixture } from "../prisma/fixtures/user";

export function url(path: string) {
  return `http://localhost:3000${path}`;
}

export const getUser = (name: string) =>
  usersFixture().find((user) => user.name === name);

export async function login({
  page,
  userName = "TaroYamada",
}: {
  page: Page;
  userName?: UserName;
}) {
  const user = getUser(userName)!;
  await page.getByRole("textbox", { name: "メールアドレス" }).fill(user.email);
  await page.getByRole("textbox", { name: "パスワード" }).fill(user.password);
  await page.getByRole("button", { name: "ログイン" }).click();
}

export async function logout({
  page,
  userName = "TaroYamada",
}: {
  page: Page;
  userName?: UserName;
}) {
  const user = getUser(userName)!;
  const loginUser = page
    .locator("[aria-label='ログインユーザー']")
    .getByText(user.name);
  await loginUser.hover();
  await page.getByText("ログアウト").click();
}

export async function assertUnauthorizedRedirect({
  page,
  path,
}: {
  page: Page;
  path: string;
}) {
  await page.goto(url(path));
  await page.waitForURL(url("/login"));
  await expect(page).toHaveTitle("ログイン | Tech Posts");
}
