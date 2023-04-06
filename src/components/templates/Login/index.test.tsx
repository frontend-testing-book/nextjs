import { Input } from "@/services/client/Login";
import * as Login from "@/services/client/Login/__mock__/msw";
import * as MyProfile from "@/services/client/MyProfile/__mock__/msw";
import { setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/testing-react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as stories from "./index.stories";

const { Default } = composeStories(stories);
const user = userEvent.setup();

export async function setup(injectValues?: Partial<Input>) {
  render(<Default />);
  const input: Input = {
    email: "test@example.com",
    password: "abcd1234",
    ...injectValues,
  };
  const email = screen.getByRole("textbox", { name: "メールアドレス" });
  const password = screen.getByPlaceholderText("8文字以上で入力");
  const button = screen.getByRole("button", { name: "ログイン" });
  await user.type(email, input.email);
  await user.type(password, input.password);
  await user.click(button);
}

setupMockServer(...Login.handlers, ...MyProfile.handlers);

test("ログインに成功した場合、redirectUrl に遷移する", async () => {
  await setup();
  await waitFor(() => expect(window.location.pathname).toEqual("/"));
});

test("ログインに失敗した場合、失敗した旨が通知される", async () => {
  await setup({ email: "500@example.com" });
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent("ログインに失敗しました");
});

test("バリデーションエラーの場合、エラーメッセージが表示される", async () => {
  await setup({ email: "test", password: "1234" });
  const email = screen.getByRole("textbox", { name: "メールアドレス" });
  const password = screen.getByPlaceholderText("8文字以上で入力");
  await waitFor(() =>
    expect(email).toHaveErrorMessage("不正なメールアドレス形式です")
  );
  expect(password).toHaveErrorMessage("8文字以上で入力してください");
});
