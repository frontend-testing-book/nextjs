import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import * as stories from "./index.stories";

const { Succeed, Failed, Busy } = composeStories(stories);

test("Succeed", () => {
  render(<Succeed />);
  expect(screen.getByRole("alert")).toHaveTextContent("成功しました");
});

test("Failed", () => {
  render(<Failed />);
  expect(screen.getByRole("alert")).toHaveTextContent("失敗しました");
});

test("Busy", () => {
  render(<Busy />);
  expect(screen.getByRole("alert")).toHaveTextContent("通信中…");
});
