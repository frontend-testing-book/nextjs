import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { TextboxWithInfo } from ".";
import * as stories from "./index.stories";
const { FullProps } = composeStories(stories);

test("TextboxWithInfo", async () => {
  render(<FullProps />);
  expect(screen.getByRole("textbox")).toHaveAccessibleName("記事タイトル");
  expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
    "半角英数64文字以内で入力してください"
  );
  expect(screen.getByRole("textbox")).toHaveErrorMessage(
    "不正な文字が含まれています"
  );
});

test("TextboxWithInfo", async () => {
  const args = {
    title: "記事タイトル",
    info: "0 / 64",
    description: "半角英数64文字以内で入力してください",
    error: "不正な文字が含まれています",
  };
  render(<TextboxWithInfo {...args} />);
  const textbox = screen.getByRole("textbox");
  // label の htmlFor により関連付け
  expect(textbox).toHaveAccessibleName(args.title);
  // aria-describedby により関連付け
  expect(textbox).toHaveAccessibleDescription(args.description);
  // aria-errormessage により関連付け
  expect(textbox).toHaveErrorMessage(args.error);
});
