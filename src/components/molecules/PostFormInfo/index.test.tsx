import { PutInput } from "@/pages/api/my/posts/[postId]";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { PostFormInfo } from "./";

const user = userEvent.setup();

function TestComponent() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<PutInput>();
  return <PostFormInfo register={register} control={control} errors={errors} />;
}

const setup = () => {
  const { getByRole } = render(<TestComponent />);
  const title = getByRole("textbox", { name: "記事タイトル" });
  const description = getByRole("textbox", { name: "記事概要" });
  const typeTitle = (text: string) => user.type(title, text);
  const typeDescription = (text: string) => user.type(description, text);
  return { typeTitle, typeDescription };
};

test("「記事タイトル」に文字入力すると、カウンターがカウントアップされる", async () => {
  const { typeTitle } = setup();
  expect(screen.getByText("0 / 64")).toBeInTheDocument();
  await typeTitle("テスト");
  expect(screen.getByText("3 / 64")).toBeInTheDocument();
});

test("「記事概要」に文字入力すると、カウンターがカウントアップされる", async () => {
  const { typeDescription } = setup();
  expect(screen.getByText("0 / 128")).toBeInTheDocument();
  await typeDescription("あいうえお");
  expect(screen.getByText("5 / 128")).toBeInTheDocument();
});
