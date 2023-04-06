import { render, screen } from "@testing-library/react";
import { Button } from ".";

test("[role='button']", () => {
  render(<Button>test</Button>);
  expect(screen.getByRole("button", { name: "test" })).toBeInTheDocument();
});

test("[role='button'][disabled='true']", () => {
  render(<Button disabled>test</Button>);
  expect(screen.getByRole("button")).toBeDisabled();
});
