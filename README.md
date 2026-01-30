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

### TypeScript Interface

```tsx
export interface TemplateProps {
    children?: React.ReactNode;
    shadowrootmode?: 'open' | 'closed';
    sheet?: CSSStyleSheet;
    shadowrootclonable?: boolean;
    shadowrootdelegatesfocus?: boolean;
    shadowrootserializable?: boolean;
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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)
- 🐛 [Issue Tracker](https://github.com/your-username/react-template-shadow-dom/issues)
- 💬 [Discussions](https://github.com/your-username/react-template-shadow-dom/discussions)