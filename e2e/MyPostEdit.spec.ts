import { expect, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { UserName } from "../prisma/fixtures/user";
import {
  gotoAndCreatePostAsDraft,
  gotoAndCreatePostAsPublish,
  gotoEditPostPage,
} from "./postUtil";
import { assertUnauthorizedRedirect, url } from "./util";

test.describe("記事編集ページ", () => {
  const path = "/my/posts/1/edit";
  const userName: UserName = "TaroYamada";

  test("未ログイン時、ログイン画面にリダイレクトされる", async ({ page }) => {
    await assertUnauthorizedRedirect({ page, path });
  });

  test("下書き記事を編集できる", async ({ page }) => {
    const title = "下書き編集テスト";
    const newTitle = "下書き編集テスト更新済み";
    await gotoAndCreatePostAsDraft({ page, title, userName });
    await gotoEditPostPage({ page, title });
    await page.getByRole("textbox", { name: "記事タイトル" }).fill(newTitle);
    await page.getByRole("button", { name: "下書き保存する" }).click();
    await page.waitForNavigation();
    await expect(page).toHaveTitle(newTitle);
  });

  test("下書き記事を公開できる", async ({ page }) => {
    const title = "下書き公開テスト";
    await gotoAndCreatePostAsDraft({ page, title, userName });
    await gotoEditPostPage({ page, title });
    await page.getByText("公開ステータス").click();
    await page.getByRole("button", { name: "記事を公開する" }).click();
    await page.getByRole("button", { name: "はい" }).click();
    await page.waitForNavigation();
    await expect(page).toHaveTitle(title);
  });

  test("公開記事を非公開にできる", async ({ page }) => {
    const title = "記事非公開テスト";
    await gotoAndCreatePostAsPublish({ page, title, userName });
    await gotoEditPostPage({ page, title });
    await page.getByText("公開ステータス").click();
    await page.getByRole("button", { name: "下書き保存する" }).click();
    await page.waitForNavigation();
    await expect(page).toHaveTitle(title);
  });

  test("公開記事を削除できる", async ({ page }) => {
    const title = "記事削除テスト";
    await gotoAndCreatePostAsPublish({ page, title, userName });
    await gotoEditPostPage({ page, title });
    await page.getByRole("button", { name: "記事を削除する" }).click();
    await page.getByRole("button", { name: "はい" }).click();
    await page.waitForNavigation();
    await expect(page).toHaveTitle(`${userName}さんの投稿記事一覧`);
  });

  test("アクセシビリティ検証", async ({ page }) => {
    await page.goto(url(path));
    await injectAxe(page as any);
    await checkA11y(page as any);
  });
});
