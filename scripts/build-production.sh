#!/bin/bash

# Production Build Script - Unified SPA Deployment
echo "🚀 Starting unified production build..."

# Clean any existing build
echo "🧹 Cleaning previous builds..."
rm -rf deploy
rm -rf .next

# Step 1: Generate PDFs and documents
echo "📄 Generating resume documents..."
npm run generate:documents

# Step 2: Build chat widget (if dependencies are available)
echo "📦 Building chat widget..."
if [ -d "packages/chat-widget/node_modules" ]; then
    echo "   → Chat widget dependencies found, building..."
    npm run build:chat
else
    echo "   → Using static chat widget (dependencies not installed)"
fi

# Step 3: Build main Next.js app
echo "🔨 Building main application..."
npm run build

# Step 4: Create unified deployment
echo "📁 Creating unified deployment structure..."
npm run export:unified

# Step 5: Verify build
echo "✅ Build complete! Verifying structure..."
echo ""
echo "📋 Deployment structure:"
echo "deploy/"
ls -la deploy/ | head -10
echo ""
if [ -d "deploy/chat-widget" ]; then
    echo "   chat-widget/ (microfrontend assets)"
    ls -la deploy/chat-widget/
else
    echo "   ⚠️  chat-widget/ not found - using inline fallback"
fi

echo ""
echo "🎉 Production build ready!"
echo "📍 Deploy the 'deploy/' folder to your hosting provider"
echo "📍 Test locally: npm run serve:production"
echo ""