import { generatePagination } from "@/lib/util/pagination";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Pagination } from "./";

export default {
  component: Pagination,
  args: { pathname: "/posts" },
} as ComponentMeta<typeof Pagination>;

type Story = ComponentStoryObj<typeof Pagination>;

const getStory = (page: number) => ({
  args: {
    pagination: generatePagination(page, 9),
  },
  parameters: {
    nextRouter: { query: { page: `${page}` } },
  },
});

export const Page1: Story = getStory(1);
export const Page2: Story = getStory(2);
export const Page3: Story = getStory(3);
export const Page4: Story = getStory(4);
export const Page5: Story = getStory(5);
export const Page9: Story = getStory(9);
