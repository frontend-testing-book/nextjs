import { useContext } from "react";
import {
  AlertDialogActionContext,
  AlertDialogStateContext,
} from "./AlertDialogContext";

export function useAlertDialogAction() {
  return useContext(AlertDialogActionContext);
}

export function useAlertDialogState() {
  return useContext(AlertDialogStateContext);
}
