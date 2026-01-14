# Chat Widget Configuration

## Overview

The chat widget configuration is now managed via a simple JavaScript file that
gets imported directly into the widget code. No window object, no dynamic script
loading - just a clean ES module import!

## Configuration File Location

```
/packages/chat-widget/src/config/runtime-config.js
```

## How to Change API URL

1. **Edit the runtime config file:**

   ```bash
   # Open the config file
   vim packages/chat-widget/src/config/runtime-config.js
   ```

2. **Update the configuration:**

   ```javascript
   export const CHAT_CONFIG = {
     apiUrl: 'https://your-new-api-url.vercel.app/api/chat',
     headers: {
       origin: 'https://yonatan-ayalon.com'
     }
   };
   ```

3. **Rebuild the chat widget:**

   ```bash
   npm run build:chat
   ```

4. **Rebuild the main app (optional - if you want to test locally):**

   ```bash
   npm run build
   ```

5. **Commit and push:**
   ```bash
   git add packages/chat-widget/src/config/runtime-config.js
   git commit -m "Update chat API endpoint"
   git push
   ```

## Why This Approach?

- ✅ **Clean ES Module**: Standard JavaScript import/export
- ✅ **No Window Object**: No global namespace pollution
- ✅ **Type Safe**: Works seamlessly with TypeScript
- ✅ **Version Control**: Track configuration changes via Git
- ✅ **Simple**: Just a plain JavaScript file with an export

## Configuration Priority

The chat widget uses this priority order:

1. **Runtime Config** (`CHAT_CONFIG` from runtime-config.js) - Highest priority
2. **Built-in Config** - Fallback if runtime config is not available

This means you can:

- Edit `runtime-config.js` for quick API URL changes
- Modify built-in config in `/packages/chat-widget/src/config/api.ts` for
  development defaults

## Example Configurations

### Production API

```javascript
export const CHAT_CONFIG = {
  apiUrl: 'https://mcp-resume-acqopagtp-alayonyos-projects.vercel.app/api/chat',
  headers: {
    origin: 'https://yonatan-ayalon.com'
  }
};
```

### Testing/Staging API

```javascript
export const CHAT_CONFIG = {
  apiUrl: 'https://staging-api.vercel.app/api/chat',
  headers: {
    origin: 'https://staging.yonatan-ayalon.com'
  }
};
```

### Local Development

```javascript
export const CHAT_CONFIG = {
  apiUrl: 'http://localhost:3000/api/chat',
  headers: {
    origin: 'http://localhost:3500'
  }
};
```

## Testing Changes

After updating `runtime-config.js`:

1. **Rebuild chat widget:**

   ```bash
   npm run build:chat
   ```

2. **Build for production:**

   ```bash
   npm run build:production
   npm run serve:static
   ```

   Visit http://localhost:8080?chat_widget=true

3. **Check browser console:**
   - Open DevTools
   - Look for chat widget logs to verify API URL is correct

## Troubleshooting

### Config not loading?

- Ensure you've rebuilt the chat widget: `npm run build:chat`
- Check the import statement in `packages/chat-widget/src/config/api.ts`
- Verify the file exports are correct

### API URL not changing?

- Clear browser cache
- Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Verify you edited: `/packages/chat-widget/src/config/runtime-config.js`
- Make sure you rebuilt: `npm run build:chat`

## Related Files

- **Runtime Config**: `/packages/chat-widget/src/config/runtime-config.js` (edit
  this!)
- **API Config**: `/packages/chat-widget/src/config/api.ts` (imports runtime
  config)
- **Chat Widget Loader**: `/components/RemoteChatWrapper.tsx` (loads the widget)
- **Chat Widget Source**: `/packages/chat-widget/src/` (widget components)

---

**Last Updated**: January 13, 2026
