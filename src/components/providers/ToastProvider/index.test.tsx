import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider } from "./";
import { useToastAction } from "./hooks";
import { ToastState } from "./ToastContext";

// #### 1.テスト用のコンポーネントを用意し、インタラクションを実行する

const user = userEvent.setup();

const TestComponent = ({ message }: { message: string }) => {
  const { showToast } = useToastAction(); // <Toast> を表示するためのフック
  return <button onClick={() => showToast({ message })}>show</button>;
};

test("showToast を呼び出すと Toast コンポーネントが表示される", async () => {
  const message = "test";
  render(
    <ToastProvider>
      <TestComponent message={message} />
    </ToastProvider>
  );
  // 初めは表示されていない
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  await user.click(screen.getByRole("button"));
  // 表示されていることを確認
  expect(screen.getByRole("alert")).toHaveTextContent(message);
});

// ### 2.初期値を注入し、表示確認をする

test("Succeed", () => {
  const state: ToastState = {
    isShown: true,
    message: "成功しました",
    style: "succeed",
  };
  render(<ToastProvider defaultState={state}>{null}</ToastProvider>);
  expect(screen.getByRole("alert")).toHaveTextContent(state.message);
});

test("Failed", () => {
  const state: ToastState = {
    isShown: true,
    message: "失敗しました",
    style: "failed",
  };
  render(<ToastProvider defaultState={state}>{null}</ToastProvider>);
  expect(screen.getByRole("alert")).toHaveTextContent(state.message);
});

test.each([
  { isShown: true, message: "成功しました", style: "succeed" },
  { isShown: true, message: "失敗しました", style: "failed" },
  { isShown: true, message: "通信中…", style: "busy" },
] as ToastState[])("$message", (state) => {
  render(<ToastProvider defaultState={state}>{null}</ToastProvider>);
  expect(screen.getByRole("alert")).toHaveTextContent(state.message);
});
