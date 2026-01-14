#!/bin/bash

# Build script for chat-widget package
echo "🚀 Building chat-widget package from TypeScript source..."

# Navigate to chat-widget directory
cd "$(dirname "$0")/../packages/chat-widget"

# Check if node_modules exists, if not install with mirror registry
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (using mirror registry)..."
    npm config set registry https://registry.npmmirror.com
    npm install ajv@^8.0.0 --legacy-peer-deps
    npm install --legacy-peer-deps
    npm config set registry https://registry.npmjs.org
fi

# Run webpack build in production mode
if [ -f "node_modules/.bin/webpack" ]; then
    echo "🔨 Building with webpack (production mode)..."
    npx webpack --mode production
    
    # Append code to expose chatWidget on window object
    echo "🔧 Exposing container on window object..."
    echo "if(typeof window!=='undefined')window.chatWidget=chatWidget;" >> dist/remoteEntry.js
    
    # Copy runtime config file (unprocessed, preserving comments and formatting)
    echo "📝 Copying runtime config file..."
    cp public/config.js dist/config.js
    
    echo "✅ Chat widget build complete!"
else
    echo "⚠️  Webpack not found, skipping build..."
fi

echo "📁 Widget files available in packages/chat-widget/dist/"
echo "💡 remoteEntry.js is ready for Module Federation"
