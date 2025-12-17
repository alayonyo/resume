#!/bin/bash

# Simple development script for running both apps
echo "🚀 Starting both resume app and chat widget..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this from the project root directory"
    exit 1
fi

# Function to kill background processes on exit
cleanup() {
    echo "🛑 Shutting down all servers..."
    pkill -f "next dev"
    pkill -f "webpack serve"
    exit 0
}

# Set up cleanup on script exit
trap cleanup SIGINT SIGTERM EXIT

# Start chat widget in background
echo "📦 Starting chat widget (port 3001)..."
cd packages/chat-widget
npm run dev &
CHAT_PID=$!

# Give it a moment to start
sleep 2

# Go back to root and start main app
cd ../..
echo "📦 Starting main app (port 3500)..."
npm run dev:app &
APP_PID=$!

echo ""
echo "🎉 Both servers are starting..."
echo "📍 Main app: http://localhost:3500"
echo "📍 Chat widget: http://localhost:3001"
echo "📍 Press Ctrl+C to stop all servers"
echo ""
echo "⏳ Waiting for servers to be ready..."

# Wait for user to stop
wait