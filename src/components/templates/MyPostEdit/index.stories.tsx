import { getMyPostData } from "@/services/server/MyPost/__mock__/fixture";
import { BasicLayoutDecorator, PCStory, SPStory } from "@/tests/storybook";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { MyPostEdit } from "./";

export default {
  component: MyPostEdit,
  args: { post: getMyPostData },
  decorators: [BasicLayoutDecorator],
} as ComponentMeta<typeof MyPostEdit>;

type Story = ComponentStoryObj<typeof MyPostEdit>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
