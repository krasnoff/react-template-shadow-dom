# React Shadow DOM Template Component

A React component that enables easy integration of Shadow DOM functionality in your React applications. This component provides a declarative way to create and manage Shadow DOM with full React compatibility.

## Features

- 🔒 **Shadow DOM Encapsulation** - Isolate styles and DOM structure
- ⚛️ **React Compatible** - Render React components inside Shadow DOM
- 🎨 **Styling Support** - Use CSS Stylesheets with `adoptedStyleSheets`
- ⚙️ **Configurable** - Full control over Shadow DOM options
- 🔄 **Dynamic Updates** - Automatically handles prop changes and remounting

## Installation

```bash
npm install react-vite-npm-template
```

## Basic Usage

```tsx
import React from 'react';
import { Template } from 'react-vite-npm-template';

function App() {
  return (
    <Template shadowrootmode="open">
      <div style={{ padding: '20px', backgroundColor: 'lightblue' }}>
        <h1>This content is rendered inside Shadow DOM!</h1>
        <p>Styles are encapsulated and won't affect the parent document.</p>
      </div>
    </Template>
  );
}
```

## Advanced Usage with CSS Stylesheets

```tsx
import React from 'react';
import { Template } from 'react-vite-npm-template';

function StyledComponent() {
  // Create a CSS stylesheet for the Shadow DOM
  const stylesheet = new CSSStyleSheet();
  stylesheet.replaceSync(`
    .container {
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      padding: 2rem;
      border-radius: 10px;
      color: white;
      font-family: Arial, sans-serif;
    }
    .title {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  `);

  return (
    <Template 
      shadowrootmode="open" 
      sheet={stylesheet}
      shadowrootdelegatesfocus={true}
    >
      <div className="container">
        <h1 className="title">Styled Shadow DOM Content</h1>
        <p>This component uses adopted stylesheets for styling.</p>
        <button>This button won't be styled by parent CSS!</button>
      </div>
    </Template>
  );
}
```

## Component API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | `undefined` | React elements to render inside the Shadow DOM |
| `shadowrootmode` | `'open' \| 'closed'` | `'open'` | Shadow DOM mode - 'open' allows external access, 'closed' doesn't |
| `sheet` | `CSSStyleSheet` | `undefined` | CSS stylesheet to apply to the Shadow DOM using adoptedStyleSheets |
| `shadowrootclonable` | `boolean` | `false` | Whether the shadow root can be cloned |
| `shadowrootdelegatesfocus` | `boolean` | `false` | Whether focus delegation is enabled |
| `shadowrootserializable` | `boolean` | `false` | Whether the shadow root can be serialized |
| `slotAssignment` | `'manual' \| 'named'` | `'named'` | How slots are assigned in the shadow tree - 'named' for automatic assignment, 'manual' for programmatic control |
| `connectedCallback` | `(shadowRoot: ShadowRoot, hostElement: HTMLDivElement) => void` | `undefined` | Callback function executed when Shadow DOM is successfully created and connected |

### TypeScript Interface

```tsx
export interface TemplateProps {
    children?: React.ReactNode;
    shadowrootmode?: 'open' | 'closed';
    sheet?: CSSStyleSheet;
    shadowrootclonable?: boolean;
    shadowrootdelegatesfocus?: boolean;
    shadowrootserializable?: boolean;
    slotAssignment?: 'manual' | 'named';
    connectedCallback?: (shadowRoot: ShadowRoot, hostElement: HTMLDivElement) => void;
}
```

## Use Cases

### 1. Widget Isolation

Perfect for creating widgets that need to be embedded in third-party websites without style conflicts:

```tsx
function EmbeddableWidget() {
  const widgetStyles = new CSSStyleSheet();
  widgetStyles.replaceSync(`
    .widget {
      border: 2px solid #007bff;
      padding: 1rem;
      background: white;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    }
  `);

  return (
    <Template shadowrootmode="open" sheet={widgetStyles}>
      <div className="widget">
        <h3>My Embeddable Widget</h3>
        <p>This widget is completely isolated from the host page!</p>
      </div>
    </Template>
  );
}
```

### 2. Micro Frontend Components

Isolate micro frontend components to prevent style bleeding:

```tsx
function MicroFrontend({ apiEndpoint }: { apiEndpoint: string }) {
  const [data, setData] = useState(null);

  const microfrontendStyles = new CSSStyleSheet();
  microfrontendStyles.replaceSync(`
    .micro-app {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .card { /* ... */ }
  `);

  return (
    <Template 
      shadowrootmode="open" 
      sheet={microfrontendStyles}
      shadowrootdelegatesfocus={true}
    >
      <div className="micro-app">
        {/* Your micro frontend content */}
      </div>
    </Template>
  );
}
```

### 3. Library Components with Theme Isolation

```tsx
function ThemeIsolatedButton({ theme, children, onClick }: ButtonProps) {
  const buttonTheme = new CSSStyleSheet();
  buttonTheme.replaceSync(`
    .theme-button {
      background: ${theme.primaryColor};
      color: ${theme.textColor};
      padding: ${theme.spacing}px;
      border: none;
      border-radius: ${theme.borderRadius}px;
      cursor: pointer;
      font-size: 1rem;
    }
    .theme-button:hover {
      opacity: 0.8;
    }
  `);

  return (
    <Template shadowrootmode="open" sheet={buttonTheme}>
      <button className="theme-button" onClick={onClick}>
        {children}
      </button>
    </Template>
  );
}
```

### 4. Using Slot Assignment

Control how slots are assigned within the Shadow DOM:

```tsx
function SlotAssignmentExample() {
  return (
    <Template 
      shadowrootmode="open" 
      slotAssignment="named"
    >
      <div>
        <h2>Content with Named Slots</h2>
        <slot name="header"></slot>
        <p>Main content area</p>
        <slot name="content"></slot>
        <footer>
          <slot name="footer"></slot>
        </footer>
      </div>
    </Template>
  );
}

// Usage with slotted content
function App() {
  return (
    <SlotAssignmentExample>
      <div slot="header">This goes in the header slot</div>
      <div slot="content">This goes in the content slot</div>
      <div slot="footer">This goes in the footer slot</div>
    </SlotAssignmentExample>
  );
}
```

### 5. Using Connected Callback

Execute custom logic when Shadow DOM is created:

```tsx
function ConnectedCallbackExample() {
  const handleConnected = (shadowRoot: ShadowRoot, hostElement: HTMLDivElement) => {
    console.log('Shadow DOM connected!', shadowRoot);
    
    // Add custom event listeners
    shadowRoot.addEventListener('click', (e) => {
      console.log('Clicked inside Shadow DOM:', e.target);
    });
    
    // Modify host element
    hostElement.style.border = '2px solid #10b981';
    hostElement.style.borderRadius = '8px';
    
    // Access shadow DOM elements
    const button = shadowRoot.querySelector('.my-button');
    if (button) {
      button.addEventListener('mouseenter', () => {
        console.log('Button hovered');
      });
    }
    
    // Dynamic content updates
    const timestamp = shadowRoot.querySelector('#timestamp');
    if (timestamp) {
      timestamp.textContent = `Connected at: ${new Date().toLocaleTimeString()}`;
    }
  };

  return (
    <Template 
      shadowrootmode="open" 
      connectedCallback={handleConnected}
    >
      <div>
        <h3>Connected Callback Demo</h3>
        <button className="my-button">Click me!</button>
        <p id="timestamp">Connection time will appear here</p>
      </div>
    </Template>
  );
}
```

## Important Notes

### Browser Compatibility

- **Shadow DOM**: Supported in all modern browsers (Chrome 53+, Firefox 63+, Safari 10+)
- **Declarative Shadow DOM**: Limited support - mainly Chrome 90+
- **Adopted Stylesheets**: Chrome 73+, Firefox 101+, Safari 16.4+

### Behavior

1. **Remounting**: The component automatically remounts when key props change to ensure Shadow DOM is recreated properly
2. **Style Isolation**: Styles inside Shadow DOM don't affect the parent document and vice versa
3. **Event Handling**: Events work normally, with optional focus delegation
4. **Slot Assignment**: The component uses named slot assignment by default

### Performance Considerations

- Shadow DOM creation has a small overhead
- Adopted stylesheets are more performant than inline styles
- The component handles cleanup automatically to prevent memory leaks

## Examples Repository

Check out the [Storybook stories](./src/components/react-template/react-template.stories.ts) for more interactive examples and use cases.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.