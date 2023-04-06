import { render, screen } from "@testing-library/react";
import { LinkButton } from ".";

test("[role='link']", () => {
  render(<LinkButton href="#">test</LinkButton>);
  expect(screen.getByRole("link")).toBeInTheDocument();
});

test("[role='button'][aria-disabled='true']", () => {
  render(
    <LinkButton href="#" disabled>
      test
    </LinkButton>
  );
  expect(screen.getByRole("link")).toHaveAttribute("aria-disabled", "true");
});
