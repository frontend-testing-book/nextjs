import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { setupMockServer } from "@/tests/jest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginUserInfoProvider } from "./LoginUserInfoProvider";
import {
  useLoginUserInfoAction,
  useLoginUserInfoState,
} from "./useLoginUserInfo";

const user = userEvent.setup();
const server = setupMockServer(handleGetMyProfile());

function TestComponent() {
  const { value } = useLoginUserInfoState();
  const { updateProfile } = useLoginUserInfoAction();
  return (
    <div>
      <p data-testid="name">{value?.name}</p>
      <button onClick={updateProfile}>update</button>
    </div>
  );
}

function setup() {
  const getMyProfile = jest.fn();
  server.use(handleGetMyProfile({ mock: getMyProfile }));
  render(
    <LoginUserInfoProvider>
      <TestComponent />
    </LoginUserInfoProvider>
  );
  return { getMyProfile };
}

describe("LoginUserInfo", () => {
  test("初回マウント時、ログインユーザー取得APIを呼ぶ", async () => {
    const { getMyProfile } = setup();
    await waitFor(() =>
      expect(screen.getByTestId("name")).toHaveTextContent("TaroYamada")
    );
    expect(getMyProfile).toHaveBeenCalledTimes(1);
  });

  test("updateProfile を呼ぶと、ログインユーザー取得APIを再度呼ぶ", async () => {
    const { getMyProfile } = setup();
    await user.click(screen.getByRole("button"));
    expect(getMyProfile).toHaveBeenCalledTimes(2);
  });
});
