import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { InputFileButton } from "./";

export default {
  component: InputFileButton,
  args: {
    buttonProps: { children: "画像を選択" },
  },
  parameters: {
    a11y: {
      config: { rules: [{ id: "label", enabled: false }] },
    },
  },
} as ComponentMeta<typeof InputFileButton>;

type Story = ComponentStoryObj<typeof InputFileButton>;

export const Default: Story = {};
