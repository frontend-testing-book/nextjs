import {
  getMyPostsData,
  getMyPostsEmptyData,
} from "@/services/server/MyPosts/__mock__/fixture";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Posts } from "./";

export default {
  component: Posts,
  args: getMyPostsData,
} as ComponentMeta<typeof Posts>;

type Story = ComponentStoryObj<typeof Posts>;

export const Default: Story = {};

export const NoItems: Story = {
  args: getMyPostsEmptyData,
};
