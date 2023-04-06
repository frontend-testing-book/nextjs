import { PutInput } from "@/pages/api/my/posts/[postId]";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { PostFormHeroImage } from "./";

function TestComponent() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<PutInput>();
  return (
    <div style={{ display: "flex", height: "120px" }}>
      <PostFormHeroImage
        register={register}
        setValue={setValue}
        name="imageUrl"
        error={errors.imageUrl?.message}
      />
    </div>
  );
}

export default {
  component: TestComponent,
} as ComponentMeta<typeof PostFormHeroImage>;

type Story = ComponentStoryObj<typeof PostFormHeroImage>;

export const Default: Story = {};
