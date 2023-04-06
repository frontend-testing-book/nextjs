import { getPostData } from "@/services/server/Post/__mock__/fixture";
import { render, screen } from "@testing-library/react";
import { Post } from "./";

test("見出しの表示", async () => {
  render(<Post post={getPostData} user={null} />);
  expect(
    screen.getByRole("heading", { name: "Frontend Testing Example" })
  ).toBeInTheDocument();
});

test("「Like」ボタンの表示", async () => {
  render(<Post post={getPostData} user={null} />);
  expect(screen.getByRole("button", { name: "Like" })).toBeInTheDocument();
});
