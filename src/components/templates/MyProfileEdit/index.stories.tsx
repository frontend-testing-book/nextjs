import { getMyProfileData } from "@/services/server/MyProfile/__mock__/fixture";
import { BasicLayoutDecorator, PCStory, SPStory } from "@/tests/storybook";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { MyProfileEdit } from "./";

export default {
  component: MyProfileEdit,
  args: { profile: getMyProfileData },
  decorators: [BasicLayoutDecorator],
} as ComponentMeta<typeof MyProfileEdit>;

type Story = ComponentStoryObj<typeof MyProfileEdit>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };
