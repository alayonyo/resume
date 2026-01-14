# Runtime Configuration for Chat Widget

## Overview

The chat widget supports **runtime configuration** that can be updated without
rebuilding. This is useful for changing the API endpoint in production without
recompiling the entire application.

## How It Works

### Development Mode

- Uses bundled default configuration from `src/config/runtime-config.js`
- Configuration changes require rebuild

### Production Mode

- Loads external `config.js` file from `/chat-widget/config.js`
- Falls back to bundled defaults if external config is not found
- **Configuration changes only require deploying the `config.js` file**

## Configuration File Location

**Source:** `packages/chat-widget/public/config.js`  
**Production build:** `deploy/chat-widget/config.js`

## Changing API Configuration in Production

### Step 1: Edit the Config File

Edit `deploy/chat-widget/config.js`:

```javascript
window.CHAT_WIDGET_RUNTIME_CONFIG = {
  apiUrl: 'https://your-new-api.com/api/chat',
  headers: {
    origin: 'https://your-domain.com',
  },
};
```

### Step 2: Deploy Only the Config File

You only need to deploy this single file:

- `deploy/chat-widget/config.js`

**No rebuild required!** The chat widget will automatically use the new
configuration on next page load.

## Configuration Priority

1. **External config** (`window.CHAT_WIDGET_RUNTIME_CONFIG`) - Highest priority
2. **Bundled defaults** (from `src/config/runtime-config.js`) - Fallback

## Configuration Options

```javascript
window.CHAT_WIDGET_RUNTIME_CONFIG = {
  // Required: Chat API endpoint URL
  apiUrl: 'https://your-api.com/api/chat',

  // Required: Headers sent with API requests
  headers: {
    origin: 'https://your-domain.com',
  },
};
```

## Development Workflow

1. **Build production:** `npm run build:production`
2. **Test locally:** `npm run serve:production` (http://localhost:8080)
3. **Edit config:** Modify `deploy/chat-widget/config.js`
4. **Refresh browser** to see changes (no rebuild needed)
5. **Deploy:** Upload `deploy/chat-widget/config.js` to your server

## Benefits

✅ **No rebuild required** for API endpoint changes  
✅ **Fast deployment** - single file update  
✅ **Environment-specific** - different configs per environment  
✅ **Hot-swappable** - change API without downtime  
✅ **Safe fallback** - uses bundled defaults if config missing
