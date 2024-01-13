import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Args, PartialStoryFn } from '@storybook/csf';
import { ReactRenderer } from '@storybook/react';

import { BasicLayout } from '@/components/layouts/BasicLayout';
import { LoginUserInfoProvider } from '@/components/providers/LoginUserInfo';

export const BasicLayoutDecorator = (
  Story: PartialStoryFn<ReactRenderer, Args>,
) => BasicLayout(<Story />);

export const LoginUserInfoProviderDecorator = (
  Story: PartialStoryFn<ReactRenderer, Args>,
) => (
  <LoginUserInfoProvider>
    <Story />
  </LoginUserInfoProvider>
);

export const SPStory = {
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
    screenshot: {
      viewport: {
        width: 375,
        height: 667,
        deviceScaleFactor: 1,
      },
      fullPage: false,
    },
  },
};

export const PCStory = {
  parameters: {
    screenshot: {
      viewport: {
        width: 1280,
        height: 800,
      },
      fullPage: false,
    },
  },
};
