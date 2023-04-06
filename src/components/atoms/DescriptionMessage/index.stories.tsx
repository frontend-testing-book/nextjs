import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { DescriptionMessage } from "./";

export default {
  component: DescriptionMessage,
  args: { children: "概要" },
} as ComponentMeta<typeof DescriptionMessage>;

type Story = ComponentStoryObj<typeof DescriptionMessage>;

export const Default: Story = {};
