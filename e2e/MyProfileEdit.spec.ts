import { expect, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { UserName } from "../prisma/fixtures/user";
import { assertUnauthorizedRedirect, login, url } from "./util";

test.describe("プロフィール編集ページ", () => {
  const path = "/my/profile/edit";
  const userName: UserName = "User-MyProfileEdit";
  const newName = "NewName";

  test("未ログイン時、ログイン画面にリダイレクトされる", async ({ page }) => {
    await assertUnauthorizedRedirect({ page, path });
  });

  test("プロフィール名称を編集すると、プロフィールに反映される", async ({
    page,
  }) => {
    await page.goto(url(path));
    await login({ page, userName });
    // ここからプロフィール編集画面
    await expect(page).toHaveURL(url(path));
    await expect(page).toHaveTitle(`${userName}さんのプロフィール編集`);
    await page.getByRole("textbox", { name: "ユーザー名" }).fill(newName);
    await page.getByRole("button", { name: "プロフィールを変更する" }).click();
    await page.waitForURL(url("/my/posts"));
    // ページのタイトルに、入力したばかりの新しい名前が含まれている
    await expect(page).toHaveTitle(`${newName}さんの投稿記事一覧`);
    await expect(
      page.getByRole("region", { name: "プロフィール" })
    ).toContainText(newName);
    await expect(page.locator("[aria-label='ログインユーザー']")).toContainText(
      newName
    );
  });

  test("アクセシビリティ検証", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
