import { expect, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { UserName } from "../prisma/fixtures/user";
import {
  gotoAndCreatePostAsDraft,
  gotoAndCreatePostAsPublish,
} from "./postUtil";
import { assertUnauthorizedRedirect, login, url } from "./util";

test.describe("投稿記事一覧ページ", () => {
  const path = "/my/posts";
  const userName: UserName = "TaroYamada";

  test("未ログイン時、ログイン画面にリダイレクトされる", async ({ page }) => {
    await assertUnauthorizedRedirect({ page, path });
  });

  test("自分のプロフィールが閲覧できる", async ({ page }) => {
    await page.goto(url(path));
    await login({ page });
    await expect(page).toHaveURL(url(path));
    const profile = page.getByRole("region", { name: "プロフィール" });
    await expect(profile).toContainText("TaroYamada");
  });

  test("新規記事を下書き保存すると、投稿記事一覧に記事が追加される", async ({
    page,
  }) => {
    const title = "下書き投稿一覧表示テスト";
    await gotoAndCreatePostAsDraft({ page, title, userName });
    await page.goto(url(path));
    await expect(page.getByText(title)).toBeVisible();
  });

  test("新規記事を公開保存すると、投稿記事一覧に記事が追加される", async ({
    page,
  }) => {
    const title = "公開投稿一覧表示テスト";
    await gotoAndCreatePostAsPublish({ page, title, userName });
    await page.goto(url(path));
    await expect(page.getByText(title)).toBeVisible();
  });

  test("アクセシビリティ検証", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
