import { render, screen } from "@testing-library/react";
import { Combobox } from "./";

test("[role=combobox]", () => {
  render(<Combobox />);
  expect(screen.getByRole("combobox")).toBeInTheDocument();
});
