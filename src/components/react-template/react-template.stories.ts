import type { Meta, StoryObj } from '@storybook/react-vite';
import { Template } from './react-template';
import React from 'react';

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
    sheet: {
      control: false, // Disable control for programmatically created CSSStyleSheet
      description: 'CSSStyleSheet object to apply to Shadow DOM (controlled programmatically)'
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

export const WithCustomStyles: Story = {
  args: {
    children: React.createElement('div', { className: 'custom-styled' }, 
      React.createElement('h2', null, 'Custom Styled Content'),
      React.createElement('p', null, 'This content has custom styles applied via CSSStyleSheet in Shadow DOM'),
      React.createElement('button', null, 'Click me')
    ),
    shadowrootmode: 'open',
    sheet: (() => {
      // Create a new CSSStyleSheet
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(`
        .custom-styled {
          font-family: Arial, sans-serif;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 8px;
        }
        .custom-styled h2 {
          margin-top: 0;
          color: #fff;
        }
        .custom-styled p {
          opacity: 0.9;
        }
        .custom-styled button {
          background: white;
          color: #667eea;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        .custom-styled button:hover {
          background: #f0f0f0;
        }
      `);
      return sheet;
    })(),
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how to use a CSSStyleSheet with adoptedStyleSheets in Shadow DOM for style encapsulation.',
      },
    },
  },
};

export const MultipleStyleSheets: Story = {
  args: {
    children: React.createElement('div', { className: 'multi-styled' },
        React.createElement('h2', { className: 'title' }, 'Multiple StyleSheets Example'),
        React.createElement('div', { className: 'card' },
        React.createElement('p', null, 'This demonstrates multiple stylesheets applied to Shadow DOM')
      )
    ),
    shadowrootmode: 'open',
    sheet: (() => {
      // Create base styles
      const baseSheet = new CSSStyleSheet();
      baseSheet.replaceSync(`
        .multi-styled {
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .title {
          color: #2563eb;
          margin-bottom: 16px;
        }
        .card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 12px;
        }
      `);
      return baseSheet;
    })(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing how CSSStyleSheet can provide encapsulated styling within Shadow DOM.',
      },
    },
  },
};


