import { expect, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { login, url } from "./util";

test.describe("投稿ページ", () => {
  const path = "/posts/1";

  test("未ログイン時、ログインボタンが表示されている", async ({ page }) => {
    await page.goto(url(path));
    const buttonLogin = page.getByRole("link", { name: "ログイン" });
    await expect(buttonLogin).toBeVisible();
  });

  test("他人の記事に Like できる", async ({ page }) => {
    await page.goto(url("/login"));
    await login({ page, userName: "TaroYamada" });
    await expect(page).toHaveURL(url("/"));
    // ここから ID:10 の記事ページ
    await page.goto(url("/posts/10"));
    const buttonLike = page.getByRole("button", { name: "Like" });
    const buttonText = page.getByTestId("likeStatus");
    // Like ボタンが有効になっていて、Like は 0件である
    await expect(buttonLike).toBeEnabled();
    await expect(buttonLike).toHaveText("0");
    await expect(buttonText).toHaveText("Like");
    await buttonLike.click();
    // Like を付けたら　　1件カウントアップされ Like済み状態になる
    await expect(buttonLike).toHaveText("1");
    await expect(buttonText).toHaveText("Liked");
  });

  test("自分の記事に Like できない", async ({ page }) => {
    await page.goto(url("/login"));
    await login({ page, userName: "TaroYamada" });
    await expect(page).toHaveURL(url("/"));
    // ここから ID:90 の記事ページ
    await page.goto(url("/posts/90"));
    const buttonLike = page.getByRole("button", { name: "Like" });
    const buttonText = page.getByTestId("likeStatus");
    // Like ボタンは非活性になっていて、Like の文字もない
    await expect(buttonLike).toBeDisabled();
    await expect(buttonText).not.toHaveText("Like");
  });

  test("アクセシビリティ検証", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
