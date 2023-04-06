import { PutInput } from "@/pages/api/my/posts/[postId]";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";
import { PostFormFooter } from "./";

function TestComponent(
  props: Omit<
    ComponentPropsWithoutRef<typeof PostFormFooter>,
    "register" | "control"
  >
) {
  const { register, control } = useForm<PutInput>();
  return <PostFormFooter {...props} register={register} control={control} />;
}

export default {
  component: TestComponent,
} as ComponentMeta<typeof PostFormFooter>;

type Story = ComponentStoryObj<typeof PostFormFooter>;

export const Default: Story = {};

export const HasDeleteButton: Story = {
  args: { onClickDelete: () => {} },
};

export const IsSubmitting: Story = {
  args: { isSubmitting: true },
};
