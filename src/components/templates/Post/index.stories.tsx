import { getPostData } from "@/services/server/Post/__mock__/fixture";
import { BasicLayoutDecorator, PCStory, SPStory } from "@/tests/storybook";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Post } from "./";

export default {
  component: Post,
  args: { post: getPostData, user: null },
  decorators: [BasicLayoutDecorator],
} as ComponentMeta<typeof Post>;

type Story = ComponentStoryObj<typeof Post>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
