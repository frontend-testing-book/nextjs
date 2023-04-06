import { getMyPostData } from "@/services/server/MyPost/__mock__/fixture";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MyPost } from "./";

const user = userEvent.setup();

test("見出しの表示", async () => {
  render(<MyPost post={getMyPostData} />);
  expect(
    screen.getByRole("heading", { name: "Frontend Testing Example" })
  ).toBeInTheDocument();
});

test("「編集する」リンクを押下すると、編集ページに遷移する", async () => {
  render(<MyPost post={getMyPostData} />);
  await user.click(screen.getByRole("link", { name: "編集する" }));
  await waitFor(() =>
    expect(mockRouter).toMatchObject({ pathname: "/my/posts/1/edit" })
  );
});
