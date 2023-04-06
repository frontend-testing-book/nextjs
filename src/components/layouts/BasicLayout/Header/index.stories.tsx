import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { LoginUserInfoProviderDecorator, SPStory } from "@/tests/storybook";
import { expect } from "@storybook/jest";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { userEvent as user, waitFor, within } from "@storybook/testing-library";
import { Header } from "./";

export default {
  component: Header,
  decorators: [LoginUserInfoProviderDecorator],
} as ComponentMeta<typeof Header>;

type Story = ComponentStoryObj<typeof Header>;

export const NotLoggedIn: Story = {
  parameters: {
    msw: { handlers: [handleGetMyProfile({ status: 401 })] },
  },
};

export const LoggedIn: Story = {};

export const RouteMyPosts: Story = {
  parameters: {
    nextRouter: { pathname: "/my/posts" },
  },
};

export const RouteMyPostsCreate: Story = {
  parameters: {
    nextRouter: { pathname: "/my/posts/create" },
  },
};

export const SPNotLogIn: Story = {
  parameters: {
    ...SPStory.parameters,
    ...NotLoggedIn.parameters,
  },
};

export const SPLoggedIn: Story = {
  parameters: {
    ...SPStory.parameters,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const navigation = canvas.queryByRole("navigation", {
      name: "ナビゲーション",
    });
    await expect(navigation).not.toBeInTheDocument();
  },
};

export const SPLoggedInOpenedMenu: Story = {
  storyName: "SPレイアウトでドロワーメニューを開ける",
  parameters: {
    ...SPStory.parameters,
    screenshot: {
      ...SPStory.parameters.screenshot,
      delay: 200,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button", {
      name: "メニューを開く",
    });
    await user.click(button);
    const navigation = canvas.getByRole("navigation", {
      name: "ナビゲーション",
    });
    await expect(navigation).toBeInTheDocument();
  },
};

export const SPLoggedInClosedMenu: Story = {
  storyName: "SPレイアウトでドロワーメニューを閉じれる",
  parameters: {
    ...SPStory.parameters,
    screenshot: {
      ...SPStory.parameters.screenshot,
      delay: 200,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonOpen = await canvas.findByRole("button", {
      name: "メニューを開く",
    });
    await user.click(buttonOpen);
    const buttonClose = await canvas.findByRole("button", {
      name: "メニューを閉じる",
    });
    await expect(buttonClose).toBeInTheDocument();
    await user.click(buttonClose);
  },
};

export const PCLoggedInNotHaveOpenMenu: Story = {
  storyName: "PCレイアウトで「メニューを開く」は表示されない",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() =>
      expect(
        canvas.queryByRole("button", {
          name: "メニューを開く",
        })
      ).toBeNull()
    );
  },
};
