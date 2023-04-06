import { getPostsData } from "@/services/server/Posts/__mock__/fixture";
import { BasicLayoutDecorator, PCStory, SPStory } from "@/tests/storybook";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Posts } from "./";

export default {
  component: Posts,
  args: getPostsData,
  decorators: [BasicLayoutDecorator],
} as ComponentMeta<typeof Posts>;

type Story = ComponentStoryObj<typeof Posts>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
