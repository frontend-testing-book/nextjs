import {
  BadRequestError,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  UnauthorizedError,
} from "@/lib/error";
import { BasicLayoutDecorator, PCStory, SPStory } from "@/tests/storybook";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Error } from "./";

export default {
  component: Error,
  decorators: [BasicLayoutDecorator],
  parameters: {
    ...PCStory.parameters,
  },
} as ComponentMeta<typeof Error>;

type Story = ComponentStoryObj<typeof Error>;

export const BadRequest: Story = {
  args: new BadRequestError().serialize(),
};

export const Unauthorized: Story = {
  args: new UnauthorizedError().serialize(),
};

export const NotFound: Story = {
  args: new NotFoundError().serialize(),
};

export const MethodNotAllowed: Story = {
  args: new MethodNotAllowedError().serialize(),
};

export const InternalServer: Story = {
  args: new InternalServerError().serialize(),
};

export const SP: Story = {
  ...BadRequest,
  parameters: {
    ...SPStory.parameters,
  },
};
