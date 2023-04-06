import { PutInput } from "@/pages/api/my/posts/[postId]";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentPropsWithoutRef } from "react";
import { useForm } from "react-hook-form";
import { PostFormFooter } from "./";

const user = userEvent.setup();

function TestComponent(
  props: Omit<
    ComponentPropsWithoutRef<typeof PostFormFooter>,
    "register" | "control"
  >
) {
  const { register, control } = useForm<PutInput>();
  return <PostFormFooter {...props} register={register} control={control} />;
}

const setup = (isSubmitting = false) => {
  const onClickSave = jest.fn();
  const onClickDelete = jest.fn();
  const { getByRole, queryByRole } = render(
    <TestComponent
      isSubmitting={isSubmitting}
      onClickSave={onClickSave}
      onClickDelete={onClickDelete}
    />
  );
  const clickSwitch = () =>
    user.click(getByRole("switch", { name: "公開ステータス" }));
  const clickSaveButton = () =>
    user.click(
      queryByRole("button", { name: "記事を公開する" }) ||
        getByRole("button", { name: "下書き保存する" })
    );
  const clickDeleteButton = () =>
    user.click(getByRole("button", { name: "記事を削除する" }));
  return {
    getByRole,
    clickSwitch,
    clickSaveButton,
    clickDeleteButton,
    onClickSave,
    onClickDelete,
  };
};

test("「下書き保存する」ボタンを押下すると、イベントハンドラーが実行される", async () => {
  const { getByRole, clickSaveButton, onClickSave } = setup();
  await clickSaveButton();
  expect(getByRole("button", { name: "下書き保存する" })).toBeInTheDocument();
  expect(onClickSave).toHaveBeenCalled();
});

test("「記事を公開する」ボタンを押下すると、イベントハンドラーが実行される", async () => {
  const { getByRole, clickSwitch, clickSaveButton, onClickSave } = setup();
  await clickSwitch();
  expect(getByRole("button", { name: "記事を公開する" })).toBeInTheDocument();
  await clickSaveButton();
  expect(onClickSave).toHaveBeenCalled();
});

test("「記事を削除する」ボタンを押下すると、イベントハンドラーが実行される", async () => {
  const { clickDeleteButton, onClickDelete } = setup();
  await clickDeleteButton();
  expect(onClickDelete).toHaveBeenCalled();
});

test("送信中は全てのコントロールが非活性", async () => {
  const { getByRole } = setup(true);
  expect(getByRole("switch", { name: "公開ステータス" })).toBeDisabled();
  expect(getByRole("button", { name: "記事を削除する" })).toBeDisabled();
  expect(getByRole("button", { name: "下書き保存する" })).toBeDisabled();
});
