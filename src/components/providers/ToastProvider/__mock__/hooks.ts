import * as Hooks from "../hooks";

jest.mock("../hooks", () => ({
  __esModule: true,
  ...jest.requireActual("../hooks"),
}));

export function mockUseToastAction() {
  const showToast = jest.fn();
  const hideToast = jest.fn();
  jest.spyOn(Hooks, "useToastAction").mockImplementationOnce(() => ({
    showToast,
    hideToast,
  }));
  return { showToast, hideToast };
}
