import { expect, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { login, logout, url } from "./util";

test.describe("ログインページ", () => {
  const path = "/login";

  test("ログイン時、ログアウトできる", async ({ page }) => {
    await page.goto(url("/login"));
    await login({ page });
    await expect(page).toHaveURL(url("/"));
    await logout({ page });
    await expect(page).toHaveURL(url("/"));
    const buttonLogin = page.getByRole("link", { name: "ログイン" });
    await expect(buttonLogin).toBeVisible();
  });

  test("ログイン後、リダイレクト元のページに戻る", async ({ page }) => {
    await page.goto(url("/my/posts"));
    await expect(page).toHaveURL(url(path));
    await login({ page });
    await expect(page).toHaveURL(url("/my/posts"));
  });

  test("アクセシビリティ検証", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
