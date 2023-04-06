import { render, screen } from "@testing-library/react";
import { AnchorButton } from ".";

test("[role='link']", () => {
  render(<AnchorButton href="#">test</AnchorButton>);
  expect(screen.getByRole("link")).toBeInTheDocument();
});

test("[role='button'][aria-disabled='true']", () => {
  render(
    <AnchorButton href="#" disabled>
      test
    </AnchorButton>
  );
  expect(screen.getByRole("link")).toHaveAttribute("aria-disabled", "true");
});
