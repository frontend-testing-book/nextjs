import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import * as stories from "./index.stories";

const { FullProps } = composeStories(stories);

test("TextareaWithInfo", async () => {
  render(<FullProps />);
  expect(screen.getByRole("textbox")).toHaveAccessibleName("記事本文");
  expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
    "半角英数64文字以内で入力してください"
  );
  expect(screen.getByRole("textbox")).toHaveErrorMessage(
    "不正な文字が含まれています"
  );
});
