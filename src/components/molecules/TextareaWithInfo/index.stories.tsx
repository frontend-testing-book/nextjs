import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { TextareaWithInfo } from "./";

export default {
  component: TextareaWithInfo,
  args: { title: "記事本文" },
} as ComponentMeta<typeof TextareaWithInfo>;

type Story = ComponentStoryObj<typeof TextareaWithInfo>;

export const Default: Story = {};

export const Info: Story = {
  args: { info: "0 / 64" },
};

export const Description: Story = {
  args: { description: "不正な文字が含まれています" },
};

export const Error: Story = {
  args: { error: "不正な文字が含まれています" },
};

export const FullProps: Story = {
  args: {
    info: "0 / 64",
    description: "半角英数64文字以内で入力してください",
    error: "不正な文字が含まれています",
  },
};
