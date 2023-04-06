import { BasicLayoutDecorator, PCStory } from "@/tests/storybook";
import { expect } from "@storybook/jest";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { userEvent as user, waitFor, within } from "@storybook/testing-library";
import { PostForm } from "./";

export default {
  component: PostForm,
  decorators: [BasicLayoutDecorator],
  parameters: {
    ...PCStory.parameters,
    nextRouter: { pathname: "/my/posts/create" },
  },
  args: {
    title: "新規記事",
    description: "公開ステータスを変更するまで、記事は公開されません",
    onClickSave: () => {},
  },
} as ComponentMeta<typeof PostForm>;

type Story = ComponentStoryObj<typeof PostForm>;

export const Default: Story = {};

export const SucceedSaveAsDraft: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await user.type(
      canvas.getByRole("textbox", { name: "記事タイトル" }),
      "私の技術記事"
    );
  },
};

export const FailedSaveAsDraft: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await user.click(canvas.getByRole("button", { name: "下書き保存する" }));
    const textbox = canvas.getByRole("textbox", { name: "記事タイトル" });
    await waitFor(() =>
      expect(textbox).toHaveErrorMessage("1文字以上入力してください")
    );
  },
};

export const SavePublish: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await user.type(
      canvas.getByRole("textbox", { name: "記事タイトル" }),
      "私の技術記事"
    );
    await user.click(canvas.getByRole("switch", { name: "公開ステータス" }));
    await expect(
      canvas.getByRole("button", { name: "記事を公開する" })
    ).toBeInTheDocument();
  },
};
