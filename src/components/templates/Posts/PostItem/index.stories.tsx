import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import { getPostsData } from '@/services/server/Posts/__mock__/fixture';

import { PostItem } from './';

export default {
  component: PostItem,
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'label', enabled: false },
          { id: 'listitem', enabled: false },
        ],
      },
    },
  },
} as ComponentMeta<typeof PostItem>;

type Story = ComponentStoryObj<typeof PostItem>;

export const Default: Story = {
  args: { post: getPostsData.posts[0] },
};

export const Draft: Story = {
  args: { post: { ...getPostsData.posts[0], published: false } },
};
