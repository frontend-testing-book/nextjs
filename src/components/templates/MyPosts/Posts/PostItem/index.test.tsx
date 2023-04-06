import { getMyPostsData } from "@/services/server/MyPosts/__mock__/fixture";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { PostItem } from "./";

const user = userEvent.setup();

const setup = (published = true) => {
  const post = getMyPostsData.posts[0];
  render(<PostItem post={{ ...post, published }} />);
  const link = screen.getByRole("link");
  const click = () => user.click(link);
  return { post, link, click };
};

test("リンクのアクセシブルネームはタイトルを参照する", async () => {
  // <a>要素に aria-label を設定しない場合、内包テキスト全文がアクセシブルネームになってしまう
  // aria-label　に post.title を適用し、端的なアクセシブルネームとしている
  const { post, link } = setup();
  expect(link).toHaveAccessibleName(post.title);
});

test("リンクを押下すると画面遷移する", async () => {
  // リンク遷移確認は、一覧表示で検証するよりも、最小コンポーネントで検証するとより速い
  const { post, click } = setup();
  await click();
  expect(mockRouter).toMatchObject({ pathname: `/my/posts/${post.id}` });
});

// jest-dom では CSS擬似要素による文字列の存在確認はできない
test.todo("「下書き」ステータスの場合「Draft」ラベルが表示される");
