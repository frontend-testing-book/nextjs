import { getMyPostData } from "@/services/server/MyPost/__mock__/fixture";
import { BasicLayoutDecorator, PCStory, SPStory } from "@/tests/storybook";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { MyPost } from "./";

export default {
  component: MyPost,
  args: { post: getMyPostData },
  decorators: [BasicLayoutDecorator],
} as ComponentMeta<typeof MyPost>;

type Story = ComponentStoryObj<typeof MyPost>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
