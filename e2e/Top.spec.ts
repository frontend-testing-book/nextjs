import { expect, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { UserName } from "../prisma/fixtures/user";
import { gotoAndCreatePostAsPublish, gotoEditPostPage } from "./postUtil";
import { login, url } from "./util";

test.describe("トップページ", () => {
  const path = "/";
  const userName: UserName = "TaroYamada";

  test("未ログイン時、ログインボタンが表示されている", async ({ page }) => {
    await page.goto(url(path));
    const buttonLogin = page.getByRole("link", { name: "ログイン" });
    await expect(buttonLogin).toBeVisible();
  });

  test("ログインユーザー情報が表示される", async ({ page }) => {
    await page.goto(url("/login"));
    await login({ page });
    await expect(page).toHaveURL(url(path));
    const loginUser = page.locator("[aria-label='ログインユーザー']");
    await expect(loginUser).toContainText("TaroYamada");
  });

  test("新規記事を公開保存すると、最新投稿一覧に表示される", async ({
    page,
  }) => {
    const title = "公開投稿・最新投稿一覧表示テスト";
    await gotoAndCreatePostAsPublish({ page, title, userName });
    await page.goto(url(path));
    await expect(page.getByText(title)).toBeVisible();
  });

  test("公開記事を非公開にすると、最新投稿一覧では非表示になる", async ({
    page,
  }) => {
    const title = "公開取り消し・最新投稿一覧表示テスト";
    await gotoAndCreatePostAsPublish({ page, title, userName });
    await gotoEditPostPage({ page, title });
    await page.getByText("公開ステータス").click();
    await page.getByRole("button", { name: "下書き保存する" }).click();
    await page.waitForNavigation();
    await expect(page).toHaveTitle(title);
    await page.goto(url(path));
    await expect(page.getByText(title)).not.toBeVisible();
  });

  test("アクセシビリティ検証", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
