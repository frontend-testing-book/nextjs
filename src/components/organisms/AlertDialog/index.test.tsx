import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import * as stories from "./index.stories";

const { Default, CustomButtonLabel, ExcludeCancel } = composeStories(stories);

describe("AlertDialog", () => {
  test("Default", () => {
    render(<Default />);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  test("CustomButtonLabel", () => {
    render(<CustomButtonLabel />);
    expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "キャンセル" })
    ).toBeInTheDocument();
  });

  test("ExcludeCancel", () => {
    render(<ExcludeCancel />);
    expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "CANCEL" })
    ).not.toBeInTheDocument();
  });
});
