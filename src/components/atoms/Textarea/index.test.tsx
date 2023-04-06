import { render, screen } from "@testing-library/react";
import { Textarea } from ".";

test("[role='textbox']", () => {
  render(<Textarea />);
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

test("[role='textbox'][disabled='true']", () => {
  render(<Textarea disabled />);
  expect(screen.getByRole("textbox")).toBeDisabled();
});
