import {ToastProvider, ToastState, useToastAction} from "@/components/providers/ToastProvider/index";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

const clickToShowMessage = "click to show";

const ChildComponent = () => {
  const {showToast, hideToast} = useToastAction();
  return (
    <>
      <button onClick={() => showToast({message: clickToShowMessage}) }>show</button>
      <button onClick={() => hideToast() }>hide</button>
    </>
  );
};

const setUp = (defaultState?: Partial<ToastState>) => {
  const toast = render(
    <ToastProvider defaultState={defaultState}>
      <ChildComponent />
    </ToastProvider>
  )

  return { toast }
}

test("The toast shows when you use defaultState", () => {
  const toastMessage = "Toast message is here."
  setUp({isShown: true, message: toastMessage, style: "succeed"});
  expect(screen.getByText(toastMessage)).toBeInTheDocument();
});

test("The toast doesn't show when you use defaultState", () => {
  const toastMessage = "Toast message is here."
  setUp({isShown: false, message: toastMessage, style: "succeed"});
  expect(screen.queryByText(toastMessage)).not.toBeInTheDocument();
});

test("can show the toast from child components", async () => {
  setUp();
  await user.click(screen.getByRole("button", { name: "show" }));
  expect(screen.getByText(clickToShowMessage)).toBeInTheDocument();
});

test("can hide the toast from child components", async () => {
  setUp();
  await user.click(screen.getByRole("button", { name: "hide" }));
  expect(screen.queryByText(clickToShowMessage)).not.toBeInTheDocument();
});
