import { expect, Page } from "@playwright/test";
import { UserName } from "../prisma/fixtures/user";
import { login, url } from "./util";

export async function gotoAndFillPostContents({
  page,
  title,
  userName,
}: {
  page: Page;
  title: string;
  userName: UserName;
}) {
  await page.goto(url("/login"));
  await login({ page, userName });
  await expect(page).toHaveURL(url("/"));
  await page.goto(url("/my/posts/create"));
  await page.setInputFiles("data-testid=file", [
    "public/__mocks__/images/img01.jpg",
  ]);
  await page.waitForLoadState("networkidle", { timeout: 30000 });
  await page.getByRole("textbox", { name: "記事タイトル" }).fill(title);
}

export async function gotoAndCreatePostAsDraft({
  page,
  title,
  userName,
}: {
  page: Page;
  title: string;
  userName: UserName;
}) {
  await gotoAndFillPostContents({ page, title, userName });
  await page.getByRole("button", { name: "下書き保存する" }).click();
  await page.waitForNavigation();
  await expect(page).toHaveTitle(title);
}

export async function gotoAndCreatePostAsPublish({
  page,
  title,
  userName,
}: {
  page: Page;
  title: string;
  userName: UserName;
}) {
  await gotoAndFillPostContents({ page, title, userName });
  await page.getByText("公開ステータス").click();
  await page.getByRole("button", { name: "記事を公開する" }).click();
  await page.getByRole("button", { name: "はい" }).click();
  await page.waitForNavigation();
  await expect(page).toHaveTitle(title);
}

export async function gotoEditPostPage({
  page,
  title,
}: {
  page: Page;
  title: string;
}) {
  await page.getByRole("link", { name: "編集する" }).click();
  await page.waitForNavigation();
  await expect(page).toHaveTitle(`記事編集 | ${title}`);
}
