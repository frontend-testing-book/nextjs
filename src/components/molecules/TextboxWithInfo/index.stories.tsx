import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { TextboxWithInfo } from "./";

export default {
  component: TextboxWithInfo,
  args: { title: "記事タイトル" },
} as ComponentMeta<typeof TextboxWithInfo>;

type Story = ComponentStoryObj<typeof TextboxWithInfo>;

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
