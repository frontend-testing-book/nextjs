import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import { getMyPostsData } from '@/services/server/MyPosts/__mock__/fixture';

import { NoItems } from './';

export default {
  component: NoItems,
  args: getMyPostsData,
} as ComponentMeta<typeof NoItems>;

type Story = ComponentStoryObj<typeof NoItems>;

export const Default: Story = {};
