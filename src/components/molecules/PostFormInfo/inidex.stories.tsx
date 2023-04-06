import { PutInput } from "@/pages/api/my/posts/[postId]";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { PostFormInfo } from "./";

function TestComponent() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<PutInput>();
  return <PostFormInfo register={register} control={control} errors={errors} />;
}

export default {
  component: TestComponent,
} as ComponentMeta<typeof PostFormInfo>;

type Story = ComponentStoryObj<typeof PostFormInfo>;

export const Default: Story = {};
