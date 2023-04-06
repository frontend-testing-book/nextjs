import { render, screen } from "@testing-library/react";
import { ErrorMessage } from ".";

test("[role='alert']", () => {
  render(<ErrorMessage>test</ErrorMessage>);
  expect(screen.getByRole("alert")).toBeInTheDocument();
});
