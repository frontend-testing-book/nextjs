import { createContext } from 'react';

export type AlertDialogState = {
  isShown: boolean;
  message: string;
  cancelButtonLabel?: string;
  okButtonLabel?: string;
};

export const initialState: AlertDialogState = {
  isShown: false,
  message: '',
  cancelButtonLabel: 'いいえ',
  okButtonLabel: 'はい',
};

export const AlertDialogStateContext =
  createContext<AlertDialogState>(initialState);

export const AlertDialogActionContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showAlertDialog: (_?: Partial<Omit<AlertDialogState, 'isShown'>>) => {},
  hideAlertDialog: () => {},
});
