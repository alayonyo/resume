# Chat Widget Microfrontend Integration

This document explains how the chat widget package is integrated with the main
resume application using microfrontend architecture.

## Architecture Overview

```
┌─────────────────────────────────┐
│        Main Resume App          │
│        (Host Application)       │
│     http://localhost:3500       │
│                                 │
│  ┌─────────────────────────────┐│
│  │    Module Federation        ││
│  │    Consumer Config          ││
│  └─────────────────────────────┘│
│                │                │
│                │ Remote Load     │
│                ▼                │
└─────────────────────────────────┘
                 │
                 │ HTTP Request
                 ▼
┌─────────────────────────────────┐
│       Chat Widget Package       │
│      (Remote Application)       │
│     http://localhost:3001       │
│                                 │
│  ┌─────────────────────────────┐│
│  │    Module Federation        ││
│  │    Provider Config          ││
│  └─────────────────────────────┘│
│                                 │
│  Exposes:                       │
│  • ./ChatWidget                 │
│  • ./ChatButton                 │
└─────────────────────────────────┘
```

## Key Benefits

1. **Independent Development**: The chat widget can be developed, tested, and
   deployed separately
2. **Runtime Integration**: The widget is loaded at runtime, not build time
3. **Shared Dependencies**: React/ReactDOM are shared between host and remote
4. **Fallback Handling**: Graceful fallback when the remote is unavailable
5. **Type Safety**: Full TypeScript support with proper type definitions

## File Structure

```
yonatan-resume/
├── packages/
│   └── chat-widget/              # Independent microfrontend package
│       ├── src/
│       │   ├── components/
│       │   │   ├── ChatWidget.tsx
│       │   │   ├── ChatWidget.css
│       │   │   ├── ChatButton.tsx
│       │   │   └── ChatButton.css
│       │   ├── index.tsx         # Entry point & standalone demo
│       │   └── types.d.ts        # Type definitions
│       ├── webpack.config.js     # Module Federation config
│       ├── package.json          # Independent dependencies
│       └── README.md
├── components/
│   └── RemoteChatWrapper.tsx     # Host-side wrapper component
├── scripts/
│   ├── build-chat-widget.sh      # Build script for widget
│   └── dev-with-chat.sh          # Development script
├── next.config.js                # Updated with Module Federation
└── package.json                  # Updated with new scripts
```

## Development Workflow

### 1. Standalone Widget Development

```bash
cd packages/chat-widget
npm run dev
# Visit http://localhost:3001 to see standalone widget
```

### 2. Integrated Development

```bash
# From project root
npm run dev:with-chat
# This starts both main app (3500) and widget (3001)
```

### 3. Production Build

```bash
npm run build:chat  # Build widget first
npm run build       # Build main app
```

## Module Federation Configuration

### Host Application (next.config.js)

```javascript
new ModuleFederationPlugin({
  name: 'resumeApp',
  remotes: {
    chatWidget: 'chatWidget@http://localhost:3001/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
  },
})
```

### Remote Application (webpack.config.js)

```javascript
new ModuleFederationPlugin({
  name: 'chatWidget',
  filename: 'remoteEntry.js',
  exposes: {
    './ChatWidget': './src/components/ChatWidget',
    './ChatButton': './src/components/ChatButton',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
  },
})
```

## Usage in Host Application

```tsx
import RemoteChatWrapper from '../components/RemoteChatWrapper';

function HomePage() {
  return (
    <div>
      {/* Your main content */}

      <RemoteChatWrapper
        botName="Resume Assistant"
        welcomeMessage="Hi! I'm here to help you learn more about Yonatan."
        position="bottom-right"
        size="medium"
        theme="light"
      />
    </div>
  );
}
```

## Error Handling & Fallbacks

The integration includes robust error handling:

1. **Network Failures**: If the remote widget can't be loaded, a fallback UI is
   shown
2. **Runtime Errors**: Component-level error boundaries prevent crashes
3. **Development Mode**: Clear logging and debugging information

## Deployment Considerations

### Development

- Widget: `http://localhost:3001/remoteEntry.js`
- Main App: `http://localhost:3500`

### Production

- Update `next.config.js` to point to production widget URL
- Deploy widget to CDN or separate domain
- Configure CORS headers appropriately

## Customization Options

The chat widget supports extensive customization:

### Visual Themes

- `theme: 'light' | 'dark'`
- `buttonColor: string`
- `position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'`
- `size: 'small' | 'medium' | 'large'`

### Functional Options

- `botName: string`
- `welcomeMessage: string`
- `placeholder: string`
- `onMessageSent: (message: string) => void`

## Performance Considerations

1. **Lazy Loading**: Widget is loaded only when needed
2. **Code Splitting**: Automatic chunk splitting by webpack
3. **Shared Dependencies**: React/ReactDOM shared to avoid duplication
4. **Caching**: Proper cache headers for production deployment

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure proper headers in widget dev server
2. **Module Not Found**: Check that widget dev server is running on port 3001
3. **Type Errors**: Update type definitions in `types.d.ts`

### Debug Commands

```bash
# Check if widget is serving correctly
curl http://localhost:3001/remoteEntry.js

# View development logs
tail -f chat-widget.log
tail -f main-app.log
```

## Future Enhancements

Potential improvements for the microfrontend setup:

1. **Dynamic Remote Discovery**: Load widget URL from configuration
2. **A/B Testing**: Multiple widget versions with runtime switching
3. **Analytics Integration**: Built-in event tracking
4. **Multi-language Support**: Internationalization for the widget
5. **Theme Synchronization**: Auto-sync with host application theme
