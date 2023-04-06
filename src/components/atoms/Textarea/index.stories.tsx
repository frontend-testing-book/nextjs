import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Textarea } from "./";

export default {
  component: Textarea,
  args: { placeholder: "ここに文字を入力します" },
} as ComponentMeta<typeof Textarea>;

type Story = ComponentStoryObj<typeof Textarea>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
