import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { getMyPostsData } from "@/services/server/MyPosts/__mock__/fixture";
import { setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import * as stories from "./index.stories";

const { Default } = composeStories(stories);
setupMockServer(handleGetMyProfile());

test("主要コンテンツが表示されている", async () => {
  render(<Default posts={getMyPostsData} />);
  expect(
    await screen.findByRole("region", { name: "プロフィール" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("region", { name: "投稿記事一覧" })
  ).toBeInTheDocument();
});
