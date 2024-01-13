import * as hooks from '../hooks';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('../hooks', () => ({
  __esModule: true,
  ...jest.requireActual('../hooks'),
}));

export function mockUseAlertDialogAction() {
  const showAlertDialog = jest.fn();
  const hideAlertDialog = jest.fn();
  jest.spyOn(hooks, 'useAlertDialogAction').mockImplementationOnce(() => ({
    showAlertDialog,
    hideAlertDialog,
  }));
  return { showAlertDialog, hideAlertDialog };
}
