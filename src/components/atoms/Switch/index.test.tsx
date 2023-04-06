import { render, screen } from "@testing-library/react";
import { Switch } from ".";

test("[role='switch']", () => {
  render(<Switch />);
  expect(screen.getByRole("switch")).toBeInTheDocument();
});

test("[role='switch'][disabled='true']", () => {
  render(<Switch disabled={true} />);
  expect(screen.getByRole("switch")).toBeDisabled();
});

test("[role='switch'][checked='true']", () => {
  render(<Switch defaultChecked={true} />);
  expect(screen.getByRole("switch")).toBeChecked();
});
