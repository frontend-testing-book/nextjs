import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { NoItems } from "./";

const user = userEvent.setup();

test("タイトル表示", async () => {
  render(<NoItems />);
  expect(
    screen.getByRole("heading", { name: "投稿記事がありません" })
  ).toBeInTheDocument();
});

test("リンク押下", async () => {
  render(<NoItems />);
  await user.click(
    screen.getByRole("link", {
      name: "はじめての記事を書いてみましょう",
    })
  );
  expect(mockRouter).toMatchObject({ pathname: "/my/posts/create" });
});
