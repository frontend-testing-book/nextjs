import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { withScreenshot } from "storycap";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  msw: { handlers: [handleGetMyProfile()] },
  layout: "fullscreen",
};

export const decorators = [mswDecorator, withScreenshot];

initialize();
