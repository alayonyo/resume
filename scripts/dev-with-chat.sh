#!/bin/bash

# Development script for running both main app and chat widget
echo "🚀 Starting development environment..."

# Function to kill background processes on exit
cleanup() {
    echo "🛑 Shutting down development servers..."
    kill $CHAT_PID 2>/dev/null
    kill $MAIN_PID 2>/dev/null
    exit 0
}

# Set up cleanup on script exit
trap cleanup SIGINT SIGTERM

# Navigate to project root
cd "$(dirname "$0")/.."

echo "📦 Starting chat widget development server..."
cd packages/chat-widget

# Start chat widget dev server in background (webpack + Python server)
if [ -f "package.json" ]; then
    npm run dev:full > ../../chat-widget.log 2>&1 &
    CHAT_PID=$!
    echo "🟢 Chat widget dev server started (PID: $CHAT_PID) - webpack watch + Python server on http://localhost:3001"
else
    echo "⚠️  Chat widget package.json not found, skipping..."
fi

# Navigate back to main app
cd ../..

echo "📦 Starting main application development server..."
# Start main app dev server in background  
npm run dev > main-app.log 2>&1 &
MAIN_PID=$!
echo "🟢 Main app dev server started (PID: $MAIN_PID) on http://localhost:3500"

echo ""
echo "🎉 Development environment is ready!"
echo "📍 Main app: http://localhost:3500"
echo "📍 Chat widget: http://localhost:3001"
echo "📍 Press Ctrl+C to stop all servers"
echo ""

# Wait for user to stop the servers
wait