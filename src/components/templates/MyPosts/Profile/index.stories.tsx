import { getMyProfileData } from "@/services/server/MyProfile/__mock__/fixture";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Profile } from "./";

export default {
  component: Profile,
  args: getMyProfileData,
} as ComponentMeta<typeof Profile>;

type Story = ComponentStoryObj<typeof Profile>;

export const Default: Story = {};
