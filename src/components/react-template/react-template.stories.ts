import type { Meta, StoryObj } from '@storybook/react-vite';

import { Template } from './react-template';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Template',
  component: Template,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: {
      control: 'text',
      description: 'React children to be rendered inside the shadow DOM'
    },
    shadowrootmode: {
      control: { type: 'select' },
      options: ['open', 'closed'],
      description: 'Shadow DOM mode: open allows access from outside, closed does not'
    },
  },
} satisfies Meta<typeof Template>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: "Hello from children prop!sds",
    shadowrootmode: "closed"
  },
};

export const WithText: Story = {
  args: {
    children: 'Hello from children prop!',
  },
};

export const ShadowDOMExample: Story = {
  args: {
    children: 'This content is rendered as children inside Shadow DOM',
    shadowrootmode: 'open',
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how the React component is rendered within Shadow DOM, providing style encapsulation.',
      },
    },
  },
};

export const ClosedShadowDOM: Story = {
  args: {
    children: 'This content is in a closed Shadow DOM',
    shadowrootmode: 'closed',
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates a closed Shadow DOM where the shadow root is not accessible from outside the component.',
      },
    },
  },
};
