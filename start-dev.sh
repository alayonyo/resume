#!/bin/bash
# Development startup script for Yonatan Resume + Chat Widget

set -e

echo "🚀 Starting Development Environment"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "${YELLOW}⚠️  Python 3 is required but not found${NC}"
    echo "Please install Python 3 to run the development server"
    exit 1
fi

# Function to cleanup background processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping development servers..."
    pkill -P $$ 2>/dev/null || true
    exit
}

trap cleanup SIGINT SIGTERM

echo "${BLUE}📦 Step 1: Starting Chat Widget Build (webpack watch)${NC}"
cd packages/chat-widget
npx webpack --mode development --watch > /tmp/webpack-watch.log 2>&1 &
WEBPACK_PID=$!
echo "   Webpack watch started (PID: $WEBPACK_PID)"

echo ""
echo "${BLUE}🌐 Step 2: Starting Chat Widget Server (Python CORS server on port 3001)${NC}"
python3 dev-server.py > /tmp/chat-server.log 2>&1 &
SERVER_PID=$!
echo "   Python server started (PID: $SERVER_PID)"

# Wait for webpack to build
echo ""
echo "${YELLOW}⏳ Waiting for initial webpack build...${NC}"
sleep 5

cd ../..

echo ""
echo "${BLUE}🎯 Step 3: Starting Resume App (Next.js on port 3500)${NC}"
npm run dev > /tmp/nextjs.log 2>&1 &
NEXTJS_PID=$!
echo "   Next.js started (PID: $NEXTJS_PID)"

echo ""
echo "${GREEN}✅ All servers started!${NC}"
echo ""
echo "📍 URLs:"
echo "   • Resume App: ${GREEN}http://localhost:3500${NC}"
echo "   • Chat Widget: ${GREEN}http://localhost:3001${NC}"
echo ""
echo "📋 Logs:"
echo "   • Webpack watch: tail -f /tmp/webpack-watch.log"
echo "   • Chat server: tail -f /tmp/chat-server.log"
echo "   • Next.js: tail -f /tmp/nextjs.log"
echo ""
echo "🛑 Press Ctrl+C to stop all servers"
echo ""

# Wait for any process to exit
wait
