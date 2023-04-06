import { BasicLayoutDecorator, PCStory, SPStory } from "@/tests/storybook";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { MyPostsCreate } from "./";

export default {
  component: MyPostsCreate,
  decorators: [BasicLayoutDecorator],
} as ComponentMeta<typeof MyPostsCreate>;

type Story = ComponentStoryObj<typeof MyPostsCreate>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
