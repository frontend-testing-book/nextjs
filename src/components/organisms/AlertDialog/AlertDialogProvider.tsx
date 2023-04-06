import { ReactNode, useCallback, useState } from "react";
import {
  AlertDialogActionContext,
  AlertDialogState,
  AlertDialogStateContext,
  initialState,
} from "./AlertDialogContext";

export const AlertDialogProvider = ({
  children,
  defaultState,
}: {
  children: ReactNode;
  defaultState?: Partial<AlertDialogState>;
}) => {
  const [state, setState] = useState({ ...initialState, ...defaultState });
  const showAlertDialog = useCallback(
    (props?: Partial<Omit<AlertDialogState, "isShown">>) => {
      setState((prev) => ({ ...prev, ...props, isShown: true }));
    },
    []
  );
  const hideAlertDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isShown: false }));
  }, []);
  return (
    <AlertDialogStateContext.Provider value={state}>
      <AlertDialogActionContext.Provider
        value={{ showAlertDialog, hideAlertDialog }}
      >
        {children}
      </AlertDialogActionContext.Provider>
    </AlertDialogStateContext.Provider>
  );
};
