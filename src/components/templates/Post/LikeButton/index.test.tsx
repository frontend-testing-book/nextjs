import { ToastProvider } from "@/components/providers/ToastProvider";
import {
  mockPostLikeRejected,
  mockPostLikeResolved,
} from "@/services/client/Like/__mock__/jest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LikeButton } from "./";

const user = userEvent.setup();

const defaultArgs = {
  likeCount: 0,
  liked: false,
  isMyPost: false,
  isLoggedIn: true,
};

const setup = ({ likeCount, liked, isMyPost, isLoggedIn } = defaultArgs) => {
  render(
    <ToastProvider>
      <LikeButton
        likeCount={likeCount}
        liked={liked}
        isMyPost={isMyPost}
        isLoggedIn={isLoggedIn}
      />
    </ToastProvider>
  );
  const button = screen.getByRole("button");
  const click = () => user.click(button);
  return { click, button };
};

test("Like 済みの場合、ボタンは非活性", async () => {
  const { button } = setup({ ...defaultArgs, liked: true });
  expect(button).toBeDisabled();
});

test("自分の投稿の場合、ボタンは非活性", async () => {
  const { button } = setup({ ...defaultArgs, isMyPost: true });
  expect(button).toBeDisabled();
});

test("未ログインの投稿の場合、ボタンは非活性", async () => {
  const { button } = setup({ ...defaultArgs, isLoggedIn: false });
  expect(button).toBeDisabled();
});

test("Like 押下しリクエストに成功すると、数が1加算され、ボタンが非活性化する", async () => {
  mockPostLikeResolved();
  const { click, button } = setup();
  expect(screen.getByText("Like")).toBeInTheDocument();
  expect(button).toHaveTextContent("0");
  expect(button).toBeEnabled();
  await click();
  expect(await screen.findByText("Liked")).toBeInTheDocument();
  expect(button).toHaveTextContent("1");
  expect(button).toBeDisabled();
});

test("Like 押下しリクエストに失敗すると、数は加算されず、ボタンは非活性化しない", async () => {
  mockPostLikeRejected();
  const { click, button } = setup();
  expect(button).toHaveTextContent("0");
  expect(button).toBeEnabled();
  await click();
  expect(button).toHaveTextContent("0");
  expect(button).not.toBeDisabled();
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent("エラーが発生しました")
  );
});
