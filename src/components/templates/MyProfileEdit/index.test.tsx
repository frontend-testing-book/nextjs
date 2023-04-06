import * as MyProfile from "@/services/client/MyProfile/__mock__/msw";
import * as MyProfileEdit from "@/services/client/MyProfileEdit/__mock__/msw";
import { setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/testing-react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import * as stories from "./index.stories";

const { Default } = composeStories(stories);
const user = userEvent.setup();

function setup() {
  const utils = render(<Default />);
  const name = utils.getByRole("textbox", { name: "ユーザー名" });
  const button = screen.getByRole("button", { name: "プロフィールを変更する" });
  const clearName = () => user.clear(name);
  const typeName = (value: string) => user.type(name, value);
  const clickButton = () => user.click(button);
  return { clearName, typeName, clickButton };
}

async function setupValidInputs() {
  const { clearName, typeName, clickButton } = setup();
  await clearName();
  await typeName("User.200");
  return { clickButton };
}

async function setupInvalidInputs() {
  const { clearName, typeName, clickButton } = setup();
  await clearName();
  await typeName("User.500");
  return { clickButton };
}

setupMockServer(...MyProfileEdit.handlers, ...MyProfile.handlers);
beforeEach(() => {
  mockRouter.setCurrentUrl("/my/profile/edit");
});

test("通信に成功した場合、画面遷移する", async () => {
  const { clickButton } = await setupValidInputs();
  await clickButton();
  await waitFor(() =>
    expect(mockRouter).toMatchObject({ pathname: "/my/posts" })
  );
});

test("通信に成功した場合「保存に成功しました」が表示される", async () => {
  const { clickButton } = await setupValidInputs();
  await clickButton();
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent("保存に成功しました")
  );
});

test("通信に失敗した場合「保存に失敗しました」が表示される", async () => {
  const { clickButton } = await setupInvalidInputs();
  await clickButton();
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent("保存に失敗しました")
  );
});
