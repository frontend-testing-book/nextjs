import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Combobox } from "./";

export default {
  component: Combobox,
  parameters: {
    a11y: {
      config: { rules: [{ id: "label", enabled: false }] },
    },
  },
  args: {
    "aria-label": "ソート順",
    children: (
      <>
        <option>新着順</option>
        <option>スター順</option>
      </>
    ),
  },
} as ComponentMeta<typeof Combobox>;

type Story = ComponentStoryObj<typeof Combobox>;

export const Default: Story = {};
