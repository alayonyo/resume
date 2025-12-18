# Chat Widget Microfrontend

A decoupled chat widget built as a microfrontend using React, TypeScript, and
Webpack Module Federation.

## Features

- 🚀 **Microfrontend Architecture**: Built with Webpack Module Federation for
  decoupled deployment
- 💬 **Interactive Chat**: Full-featured chat interface with typing indicators
- 🎨 **Customizable**: Multiple themes, positions, and styling options
- 📱 **Responsive**: Works on desktop and mobile devices
- ♿ **Accessible**: Built with accessibility best practices
- 🔧 **TypeScript**: Fully typed for better developer experience

## Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Python 3 (for development server with CORS)

### Setup

```bash
# Install dependencies
npm install
```

### Running in Development Mode

**⚠️ Important**: Due to webpack-dev-server injecting async chunks that prevent
Module Federation from working correctly, we use a two-process development
setup:

#### Option 1: Manual (Two Terminal Windows)

**Terminal 1** - Webpack Watch Mode:

```bash
cd packages/chat-widget
npm run dev
```

**Terminal 2** - Python CORS Server:

```bash
cd packages/chat-widget
npm run serve
```

The widget will be available at `http://localhost:3001` with:

- ✅ CORS headers enabled
- ✅ Auto-rebuild on file changes
- ✅ Module Federation working correctly

#### Option 2: Using the Dev Script

```bash
cd packages/chat-widget
npm run dev:full
```

This starts both webpack watch and the Python server in the background.

### Why Not webpack-dev-server?

webpack-dev-server injects HMR client code that creates async chunk
dependencies, preventing the `chatWidget` container from being assigned
synchronously. This causes the Module Federation remote to fail loading in the
host application.

**Solution**: We use webpack watch mode + a simple Python HTTP server with CORS
headers, which:

- Builds files to disk (no in-memory serving)
- Provides synchronous script execution
- Includes proper CORS headers
- Still rebuilds automatically on file changes

### Build

```bash
# Production build
npm run build

# Development build
npm run build:dev
```

## Integration

### As a Microfrontend

The widget exposes the following modules via Module Federation:

- `./ChatWidget` - The main chat interface component
- `./ChatButton` - A floating chat button with toggle functionality

### Usage Examples

#### Basic Chat Widget

```tsx
import { ChatWidget } from 'chatWidget/ChatWidget';

function App() {
  const handleMessage = (message: string) => {
    console.log('User sent:', message);
  };

  return (
    <ChatWidget
      onMessageSent={handleMessage}
      botName="Assistant"
      welcomeMessage="Hello! How can I help you?"
      theme="light"
    />
  );
}
```

#### Floating Chat Button

```tsx
import { ChatButton } from 'chatWidget/ChatButton';

function App() {
  return (
    <ChatButton
      position="bottom-right"
      size="medium"
      buttonColor="#667eea"
      botName="Support"
      welcomeMessage="Hi! Need help with anything?"
    />
  );
}
```

## Configuration Options

### ChatWidget Props

- `onMessageSent?: (message: string) => void` - Callback when user sends a
  message
- `botName?: string` - Display name for the bot (default: "Assistant")
- `welcomeMessage?: string` - Initial message from bot
- `placeholder?: string` - Input placeholder text
- `theme?: 'light' | 'dark'` - Visual theme

### ChatButton Props

Includes all ChatWidget props plus:

- `buttonText?: string` - Text/emoji for the toggle button (default: "💬")
- `position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'` -
  Button position
- `buttonColor?: string` - Custom button color (default: "#667eea")
- `size?: 'small' | 'medium' | 'large'` - Button size

## Architecture

This package is designed as a microfrontend that can be:

1. **Developed independently** - Has its own build system and dependencies
2. **Deployed separately** - Can be updated without touching the host
   application
3. **Runtime integrated** - Loaded dynamically by the host application
4. **Shared dependencies** - Efficiently shares React/ReactDOM with the host

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Production build with optimization
- `npm run build:dev` - Development build without minification
- `npm run type-check` - TypeScript type checking
- `npm run lint` - ESLint code linting
- `npm run clean` - Clean dist directory

## File Structure

```
src/
├── components/
│   ├── ChatWidget.tsx       # Main chat interface
│   ├── ChatWidget.css       # Chat widget styles
│   ├── ChatButton.tsx       # Floating chat button
│   └── ChatButton.css       # Button styles
├── index.tsx                # Entry point & exports
└── types.d.ts              # TypeScript definitions
```
