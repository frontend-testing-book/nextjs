import { render, screen } from "@testing-library/react";
import { Footer } from "./";

test("[role=contentinfo]", async () => {
  render(<Footer />);
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});
