import { useContext } from "react";
import { ToastActionContext, ToastStateContext } from "./ToastContext";

export function useToastAction() {
  return useContext(ToastActionContext);
}

export function useToastState() {
  return useContext(ToastStateContext);
}
