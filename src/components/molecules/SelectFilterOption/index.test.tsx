import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectFilterOption } from "./";

const user = userEvent.setup();

function setup() {
  const title = "公開ステータス";
  const options = [
    { value: "all", label: "すべて" },
    { value: "public", label: "公開" },
    { value: "private", label: "下書き" },
  ];
  render(
    <SelectFilterOption
      title={title}
      selectProps={{ name: "status" }}
      options={options}
    />
  );
  const combobox = screen.getByRole("combobox");
  const select = (index: number) =>
    user.selectOptions(combobox, options[index].label);
  return { title, options, combobox, select };
}

test("select 要素は title をアクセシブルネームとして参照する", async () => {
  const { title, combobox } = setup();
  expect(combobox).toHaveAccessibleName(title);
});

test("select 要素を変更すると値が変わる", async () => {
  const { combobox, options, select } = setup();
  expect(combobox).toHaveDisplayValue(options[0].label);
  await select(1);
  expect(combobox).toHaveDisplayValue(options[1].label);
});
