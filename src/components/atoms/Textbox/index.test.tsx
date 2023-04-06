import { render, screen } from "@testing-library/react";
import { Textbox } from ".";

test("[role='textbox']", () => {
  render(<Textbox />);
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

test("[role='textbox'][disabled='true']", async () => {
  render(<Textbox disabled />);
  expect(screen.getByRole("textbox")).toBeDisabled();
});
