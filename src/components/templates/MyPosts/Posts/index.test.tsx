import {
  getMyPostsData,
  getMyPostsEmptyData,
} from "@/services/server/MyPosts/__mock__/fixture";
import { render, screen } from "@testing-library/react";
import { Posts } from "./";

const setup = (empty = false) => {
  render(<Posts {...(empty ? getMyPostsEmptyData : getMyPostsData)} />);
  const PostList = screen.queryByRole("region", {
    name: "記事一覧",
  });
  const pagination = screen.queryByRole("navigation", {
    name: "ページネーション",
  });
  const paginationInfo = screen.queryByRole("region", {
    name: "現在表示中の一覧概要",
  });
  const noItems = screen.queryByRole("heading", {
    name: "投稿記事がありません",
  });
  return { PostList, pagination, paginationInfo, noItems };
};

test("アクセシブルネーム「投稿記事一覧」で識別できる", async () => {
  setup();
  expect(
    screen.getByRole("region", { name: "投稿記事一覧" })
  ).toBeInTheDocument();
});

test("記事一覧があるとき、コンテンツが表示される", async () => {
  const { PostList, pagination, paginationInfo, noItems } = setup();
  expect(PostList).toBeInTheDocument();
  expect(pagination).toBeInTheDocument();
  expect(paginationInfo).toBeInTheDocument();
  expect(noItems).not.toBeInTheDocument();
});

test("記事一覧が空のとき、記事がない旨が表示される", async () => {
  const { PostList, pagination, paginationInfo, noItems } = setup(true);
  expect(PostList).not.toBeInTheDocument();
  expect(pagination).not.toBeInTheDocument();
  expect(paginationInfo).not.toBeInTheDocument();
  expect(noItems).toBeInTheDocument();
});
