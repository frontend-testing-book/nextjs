import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestComponent } from "./index.stories";

const user = userEvent.setup();

test("文字入力に伴い、カウントアップされる", async () => {
  render(<TestComponent />);
  expect(screen.getByText("0 / 10")).toBeInTheDocument();
  await user.type(screen.getByRole("textbox"), "123");
  expect(screen.getByText("3 / 10")).toBeInTheDocument();
});

test("制限文字数を超えると[data-invalid='true']となる", async () => {
  render(<TestComponent />);
  await user.type(screen.getByRole("textbox"), "01234567890");
  expect(screen.getByText("11 / 10")).toHaveAttribute("data-invalid", "true");
});
