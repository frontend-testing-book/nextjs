import { createContext } from "react";

export type ToastStyle = "succeed" | "failed" | "busy";

export type ToastState = {
  isShown: boolean;
  message: string;
  style: ToastStyle;
};

export const initialState: ToastState = {
  isShown: false,
  message: "",
  style: "succeed",
};

export const ToastStateContext = createContext(initialState);

export type ToastAction = {
  showToast: (state?: Partial<Omit<ToastState, "isShown">>) => void;
  hideToast: () => void;
};

export const initialAction: ToastAction = {
  showToast: () => {},
  hideToast: () => {},
};

export const ToastActionContext = createContext(initialAction);
