import { render, screen } from "@testing-library/react";
import { ContentFooter } from "./";

test("[role=contentinfo]", () => {
  render(<ContentFooter />);
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});
