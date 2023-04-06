import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { LinkButton } from "./";

export default {
  component: LinkButton,
  args: { children: "送信する", href: "/", className: "hoge" },
} as ComponentMeta<typeof LinkButton>;

type Story = ComponentStoryObj<typeof LinkButton>;

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
