import {
  ToastProvider,
  ToastState,
} from "@/components/providers/ToastProvider";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Toast } from ".";

function createDecorator(defaultState?: Partial<ToastState>) {
  return function Decorator() {
    return (
      <ToastProvider defaultState={{ ...defaultState, isShown: true }}>
        {null}
      </ToastProvider>
    );
  };
}

export default {
  component: Toast,
} as ComponentMeta<typeof Toast>;

type Story = ComponentStoryObj<typeof Toast>;

export const Succeed: Story = {
  decorators: [createDecorator({ message: "成功しました", style: "succeed" })],
};

export const Failed: Story = {
  decorators: [createDecorator({ message: "失敗しました", style: "failed" })],
};

export const Busy: Story = {
  decorators: [createDecorator({ message: "通信中…", style: "busy" })],
};
