#!/bin/bash

# Alternative method to run chat widget without npm install
echo "🔧 Alternative chat widget setup (without npm dependencies)"
echo ""

# Check if we're in the right directory
if [ ! -f "packages/chat-widget/package.json" ]; then
    echo "❌ Please run this from the project root directory"
    exit 1
fi

echo "📋 MICROFRONTEND STATUS CHECK:"
echo "================================"

# Check if main app is running
if curl -s http://localhost:3500 > /dev/null 2>&1; then
    echo "✅ Main app is running on http://localhost:3500"
else
    echo "❌ Main app is NOT running on http://localhost:3500"
    echo "   Run: npm run dev (in another terminal)"
fi

# Check if chat widget is running  
if curl -s http://localhost:3001/remoteEntry.js > /dev/null 2>&1; then
    echo "✅ Chat widget is running on http://localhost:3001"
    echo "🎉 Microfrontend setup is complete!"
else
    echo "❌ Chat widget is NOT running on http://localhost:3001"
    echo ""
    echo "🔧 SOLUTIONS TO FIX CHAT WIDGET:"
    echo "================================"
    echo "1. Try installing dependencies with different registry:"
    echo "   cd packages/chat-widget"
    echo "   npm install --registry https://registry.npmjs.org/"
    echo ""
    echo "2. Or try with yarn:"
    echo "   cd packages/chat-widget"  
    echo "   yarn install"
    echo ""
    echo "3. Or use a different Node version:"
    echo "   nvm use 18"
    echo "   cd packages/chat-widget"
    echo "   npm install"
    echo ""
    echo "4. Manual webpack setup:"
    echo "   npx create-react-app temp-widget --template typescript"
    echo "   # Copy webpack config and components"
    echo ""
    echo "📍 The main app will show a fallback button until the widget is running."
fi

echo ""
echo "🎯 CURRENT ARCHITECTURE:"
echo "========================"
echo "Host App (Resume):     http://localhost:3500"
echo "Remote App (Widget):   http://localhost:3001" 
echo "Integration:           Runtime Module Federation"
echo ""
echo "The microfrontend architecture is preserved!"
echo "The widget loads dynamically when available."