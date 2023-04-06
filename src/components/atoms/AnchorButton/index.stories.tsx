import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { AnchorButton } from "./";

export default {
  component: AnchorButton,
  args: { children: "送信する" },
} as ComponentMeta<typeof AnchorButton>;

type Story = ComponentStoryObj<typeof AnchorButton>;

export const Default: Story = {};

export const Large: Story = {
  args: { variant: "large" },
};

export const Small: Story = {
  args: { variant: "small" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Dark: Story = {
  args: { theme: "dark" },
};

export const Light: Story = {
  args: { theme: "light" },
};

export const Transparent: Story = {
  args: { theme: "transparent" },
};

export const Blue: Story = {
  args: { theme: "blue" },
};

export const Error: Story = {
  args: { theme: "error" },
};
