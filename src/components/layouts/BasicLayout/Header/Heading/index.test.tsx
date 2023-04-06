import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { Heading } from "./";

const user = userEvent.setup();

test("[role=heading]", async () => {
  render(<Heading />);
  expect(
    screen.getByRole("heading", { name: "Tech Posts" })
  ).toBeInTheDocument();
});

test("クリックするとTOPへ遷移する", async () => {
  mockRouter.setCurrentUrl("/posts?page=1");
  render(<Heading />);
  await user.click(screen.getByRole("link"));
  expect(mockRouter).toMatchObject({ pathname: "/" });
});
