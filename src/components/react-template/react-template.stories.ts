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
    shadowrootclonable: {
      control: 'boolean',
      description: 'Whether the shadow root is clonable'
    },
    shadowrootdelegatesfocus: {
      control: 'boolean',
      description: 'Whether the shadow root delegates focus'
    },
    shadowrootserializable: {
      control: 'boolean',
      description: 'Whether the shadow root is serializable'
    },
    slotAssignment: {
      control: { type: 'select' },
      options: ['manual', 'named'],
      description: 'How slots are assigned: manual or named'
    },
    connectedCallback: {
      control: false,
      description: 'Callback function called when shadow DOM is connected (controlled programmatically)'
    },
  },
} satisfies Meta<typeof Template>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: "Hello from children prop!",
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


export const SlotAssignmentDemo: Story = {
  args: {
    children: React.createElement('div', { className: 'slot-demo' },
      React.createElement('h3', null, 'Slot Assignment Demo'),
      React.createElement('slot', { name: 'header' }),
      React.createElement('p', null, 'This content demonstrates different slot assignment modes.'),
      React.createElement('slot', { name: 'content' }),
      React.createElement('div', { slot: 'footer' }, 'Footer content'),
      React.createElement('slot', { name: 'footer' })
    ),
    shadowrootmode: 'open',
    slotAssignment: 'named',
    sheet: (() => {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(`
        .slot-demo {
          padding: 20px;
          border: 2px dashed #4f46e5;
          border-radius: 8px;
          font-family: Arial, sans-serif;
        }
        .slot-demo h3 {
          color: #4f46e5;
          margin-top: 0;
        }
        slot {
          display: block;
          padding: 10px;
          margin: 5px 0;
          background: #f3f4f6;
          border: 1px solid #d1d5db;
          border-radius: 4px;
        }
        slot:before {
          content: "Slot: " attr(name);
          font-weight: bold;
          color: #6b7280;
          font-size: 12px;
        }
        div[slot] {
          background: #dbeafe;
          padding: 8px;
          margin: 4px 0;
          border-radius: 4px;
        }
      `);
      return sheet;
    })(),
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates slot assignment functionality. Switch between "named" and "manual" to see how slot assignment behavior changes in Shadow DOM.',
      },
    },
  },
};

export const ConnectedCallbackDemo: Story = {
  args: {
    children: React.createElement('div', { className: 'callback-demo' },
      React.createElement('h3', null, 'Connected Callback Demo'),
      React.createElement('p', null, 'Check the browser console to see the connected callback output!'),
      React.createElement('div', { id: 'callback-info' }, 'Callback info will be logged to console'),
      React.createElement('button', { 
        onClick: () => console.log('Button clicked inside Shadow DOM') 
      }, 'Click me to test event handling')
    ),
    shadowrootmode: 'open',
    connectedCallback: (shadowRoot: ShadowRoot, hostElement: HTMLDivElement) => {
      console.log('🎉 Shadow DOM Connected!');
      console.log('Shadow Root:', shadowRoot);
      console.log('Host Element:', hostElement);
      console.log('Shadow Root Mode:', shadowRoot.mode);
      console.log('Host Element Tag:', hostElement.tagName);
      
      // Example: Add some dynamic content after connection
      const infoDiv = shadowRoot.querySelector('#callback-info') as HTMLElement;
      if (infoDiv) {
        infoDiv.textContent = `Connected at: ${new Date().toLocaleTimeString()}`;
        infoDiv.style.color = '#059669';
        infoDiv.style.fontWeight = 'bold';
      }
      
      // Example: Add a custom event listener
      shadowRoot.addEventListener('click', (event) => {
        console.log('Click event in Shadow DOM:', event.target);
      });
      
      // Example: Modify host element
      hostElement.style.border = '2px solid #10b981';
      hostElement.style.borderRadius = '8px';
      hostElement.style.padding = '4px';
    },
    sheet: (() => {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(`
        .callback-demo {
          padding: 20px;
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-radius: 8px;
        }
        .callback-demo h3 {
          color: #059669;
          margin-top: 0;
        }
        .callback-demo button {
          background: #059669;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 12px;
        }
        .callback-demo button:hover {
          background: #047857;
        }
        #callback-info {
          background: #ecfdf5;
          border: 1px solid #bbf7d0;
          padding: 8px 12px;
          border-radius: 4px;
          margin: 12px 0;
          font-family: monospace;
        }
      `);
      return sheet;
    })(),
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the connectedCallback functionality. The callback is executed when the Shadow DOM is successfully created and provides access to both the shadow root and host element. Open the browser console to see the callback output and interactions.',
      },
    },
  },
};

