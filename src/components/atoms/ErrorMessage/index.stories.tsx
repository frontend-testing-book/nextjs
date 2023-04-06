import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { ErrorMessage } from "./";

export default {
  component: ErrorMessage,
  args: { children: "エラー" },
} as ComponentMeta<typeof ErrorMessage>;

type Story = ComponentStoryObj<typeof ErrorMessage>;

export const Default: Story = {};
