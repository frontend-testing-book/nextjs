import { getMyProfileData } from "@/services/server/MyProfile/__mock__/fixture";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { Profile } from "./";

const user = userEvent.setup();

test("アクセシブルネーム「プロフィール」で識別できる", () => {
  render(<Profile {...getMyProfileData} />);
  expect(
    screen.getByRole("region", { name: "プロフィール" })
  ).toBeInTheDocument();
});

test("「変更する」リンクを押下すると画面遷移する", async () => {
  render(<Profile {...getMyProfileData} />);
  await user.click(screen.getByRole("link", { name: "変更する" }));
  expect(mockRouter).toMatchObject({ pathname: "/my/profile/edit" });
});
