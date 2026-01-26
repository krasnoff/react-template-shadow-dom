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
    text: { 
      control: 'text',
      description: 'Text content for the template component'
    },
  },
} satisfies Meta<typeof Template>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};

export const WithText: Story = {
  args: {
    text: 'Custom text content',
  },
};

export const ShadowDOMExample: Story = {
  args: {
    text: 'This demonstrates Shadow DOM encapsulation',
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how the React component is rendered within Shadow DOM, providing style encapsulation.',
      },
    },
  },
};