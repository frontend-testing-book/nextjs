import { act, renderHook } from "@testing-library/react";
import { ToastStyle } from "./ToastContext";
import { useToastProvider } from "./useToastProvider";

test("showToast, hideToast で表示を切り替え", () => {
  const { result } = renderHook(() => useToastProvider());
  expect(result.current).toMatchObject({ isShown: false });
  act(() => {
    result.current.showToast();
  });
  expect(result.current).toMatchObject({ isShown: true });
  act(() => {
    result.current.hideToast();
  });
  expect(result.current).toMatchObject({ isShown: false });
});

test("message, style で見た目を変更", () => {
  const { result } = renderHook(() => useToastProvider());
  expect(result.current).toMatchObject({ message: "", style: "succeed" });
  const message = "...loading";
  const style: ToastStyle = "busy";
  act(() => {
    result.current.showToast({ message, style });
  });
  expect(result.current).toMatchObject({ message, style });
});
