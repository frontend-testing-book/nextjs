import { test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { assertUnauthorizedRedirect, url } from "./util";

test.describe("投稿済み記事ページ", () => {
  const path = "/my/posts/1";

  test("未ログイン時、ログイン画面にリダイレクトされる", async ({ page }) => {
    await assertUnauthorizedRedirect({ page, path });
  });

  test("アクセシビリティ検証", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
