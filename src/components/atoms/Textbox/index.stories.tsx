import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Textbox } from "./";

export default {
  component: Textbox,
  args: { placeholder: "ここに文字を入力します" },
} as ComponentMeta<typeof Textbox>;

type Story = ComponentStoryObj<typeof Textbox>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
