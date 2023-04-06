import { getMyPostsData } from "@/services/server/MyPosts/__mock__/fixture";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Header } from "./";

export default {
  component: Header,
  args: getMyPostsData,
} as ComponentMeta<typeof Header>;

type Story = ComponentStoryObj<typeof Header>;

export const Default: Story = {};
