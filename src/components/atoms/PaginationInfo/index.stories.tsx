import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { PaginationInfo } from "./";

export default {
  component: PaginationInfo,
  args: { start: 1, end: 10, hitCount: 100 },
} as ComponentMeta<typeof PaginationInfo>;

type Story = ComponentStoryObj<typeof PaginationInfo>;

export const Default: Story = {};
