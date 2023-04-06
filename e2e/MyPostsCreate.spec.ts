import { test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { UserName } from "../prisma/fixtures/user";
import {
  gotoAndCreatePostAsDraft,
  gotoAndCreatePostAsPublish,
} from "./postUtil";
import { assertUnauthorizedRedirect, url } from "./util";

test.describe("新規投稿ページ", () => {
  const path = "/my/posts/create";
  const userName: UserName = "TaroYamada";

  test("未ログイン時、ログイン画面にリダイレクトされる", async ({ page }) => {
    await assertUnauthorizedRedirect({ page, path });
  });

  test("新規記事を下書き保存できる", async ({ page }) => {
    const title = "下書き投稿テスト";
    await gotoAndCreatePostAsDraft({ page, title, userName });
  });

  test("新規記事を公開できる", async ({ page }) => {
    const title = "公開投稿テスト";
    await gotoAndCreatePostAsPublish({ page, title, userName });
  });

  test("アクセシビリティ検証", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
