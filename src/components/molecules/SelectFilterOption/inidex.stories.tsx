import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { SelectFilterOption } from "./";

export default {
  component: SelectFilterOption,
} as ComponentMeta<typeof SelectFilterOption>;

type Story = ComponentStoryObj<typeof SelectFilterOption>;

export const Default: Story = {
  args: {
    title: "公開ステータス",
    options: [
      { value: "all", label: "すべて" },
      { value: "public", label: "公開" },
      { value: "private", label: "下書き" },
    ],
  },
};
