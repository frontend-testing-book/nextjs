import { render, screen } from "@testing-library/react";
import { Accounts } from "./";

test("props にアカウント名を渡すと、リンクが表示される", async () => {
  render(<Accounts githubAccount="gh-test" twitterAccount="tw-user" />);
  expect(screen.getByRole("link", { name: "gh-test" })).toHaveAttribute(
    "href",
    "https://github.com/gh-test"
  );
  expect(screen.getByRole("link", { name: "tw-user" })).toHaveAttribute(
    "href",
    "https://twitter.com/tw-user"
  );
});

test("props にアカウント名を渡さないと、リンクが表示されない", async () => {
  render(<Accounts />);
  expect(screen.queryAllByRole("link")).toHaveLength(0);
});
