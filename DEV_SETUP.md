# Development Quick Start

## Running in Development Mode

### Option 1: Automated Script (Recommended)

```bash
./start-dev.sh
```

This single script starts all three processes:

1. Chat widget webpack watch (auto-rebuild on changes)
2. Chat widget Python CORS server (port 3001)
3. Resume Next.js app (port 3500)

Press `Ctrl+C` to stop all servers at once.

### Option 2: Manual (Three Terminals)

**Terminal 1** - Chat Widget Build:

```bash
cd packages/chat-widget
npm run dev
```

**Terminal 2** - Chat Widget Server:

```bash
cd packages/chat-widget
npm run serve
```

**Terminal 3** - Resume App:

```bash
npm run dev
```

## URLs

- **Resume App**: http://localhost:3500
- **Chat Widget**: http://localhost:3001
- **Test Page**: http://localhost:8888/test-remoteentry-v3.html (if Python
  server running on 8888)

## Troubleshooting

### Chat widget not loading?

1. Check all three processes are running:

   - Webpack watch: `ps aux | grep webpack`
   - Python server: `lsof -ti:3001`
   - Next.js: `lsof -ti:3500`

2. Check browser console for errors

3. Verify remoteEntry.js is accessible:

   ```bash
   curl http://localhost:3001/remoteEntry.js | head -20
   ```

4. Clear browser cache and hard refresh (Cmd+Shift+R)

### CORS errors?

Make sure you're using the Python dev server (`npm run serve`), not the standard
`python3 -m http.server`.

### Port already in use?

Kill existing processes:

```bash
lsof -ti:3001,3500 | xargs kill -9
```

## Architecture

The development setup uses:

- **Webpack Watch Mode**: Builds chat widget on file changes
- **Python HTTP Server**: Serves built files with CORS headers
- **Next.js Dev Server**: Hot reload for main app

This avoids webpack-dev-server's HMR client injection which breaks Module
Federation's synchronous container assignment.
