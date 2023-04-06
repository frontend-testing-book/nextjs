import { useCallback, useState } from "react";
import { initialState, ToastState } from "./ToastContext";

export function useToastProvider(defaultState?: Partial<ToastState>) {
  const [{ isShown, message, style }, setState] = useState({
    ...initialState,
    ...defaultState,
  });
  const showToast = useCallback(
    (props?: Partial<Omit<ToastState, "isShown">>) => {
      setState((prev) => ({ ...prev, ...props, isShown: true }));
    },
    []
  );
  const hideToast = useCallback(() => {
    setState((prev) => ({ ...prev, isShown: false }));
  }, []);
  return { isShown, message, style, showToast, hideToast };
}
