# Production Deployment Guide

## 🚀 Unified SPA Deployment

This project is now configured for **Option 3: Hybrid Microfrontend
Architecture**:

- **Development**: True microfrontends (separate servers)
- **Production**: Unified SPA (single domain, no HTTP calls)

## 📦 Build Commands

### Development Mode

```bash
npm run dev                    # Main app only (port 3500)
npm run dev:with-chat         # Both apps (ports 3500 + 3001)
```

### Production Build

```bash
npm run build:production      # Creates unified SPA in deploy/
npm run serve:static         # Test production build locally (port 8080)
```

## 📁 Production Structure

After running `npm run build:production`, you get:

```
deploy/
├── index.html              # Main resume app
├── 404.html               # Error page
├── _next/                 # Next.js assets
├── favicon.ico            # Site assets
├── yonatan-ayalon-resume.pdf    # Generated resume
├── yonatan-ayalon-resume.docx   # Generated resume
└── chat-widget/           # Microfrontend assets
    ├── remoteEntry.js     # Chat widget module
    └── index.html         # Standalone widget page
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

```bash
npm run build:production
# Deploy deploy/ folder to Vercel
```

### Option 2: Netlify

```bash
npm run build:production
# Drag deploy/ folder to Netlify deploy
```

### Option 3: GitHub Pages

```bash
npm run build:production
# Push deploy/ contents to gh-pages branch
```

### Option 4: AWS S3 + CloudFront

```bash
npm run build:production
aws s3 sync deploy/ s3://your-bucket --delete
```

## 🔧 How It Works

### Development Environment

- **Main App**: `http://localhost:3500`
- **Chat Widget**: `http://localhost:3001`
- **Integration**: HTTP calls between separate servers
- **Benefits**: True microfrontend development experience

### Production Environment

- **Unified App**: `https://yourdomain.com`
- **Chat Widget**: `https://yourdomain.com/chat-widget/remoteEntry.js`
- **Integration**: Same-origin loading (no CORS issues)
- **Benefits**: Fast SPA performance, simple deployment

### Smart Loading Logic

The `RemoteChatWrapper` component automatically detects the environment:

```javascript
const isProduction = process.env.NODE_ENV === 'production' ||
                    !window.location.hostname.includes('localhost');

const widgetUrl = isProduction
  ? '/chat-widget/remoteEntry.js'        // Production: same domain
  : 'http://localhost:3001/remoteEntry.js'; // Dev: separate server
```

### Fallback Strategy

The system has multiple fallback layers:

1. **Primary**: Load external microfrontend
2. **Secondary**: Try same-domain widget assets
3. **Tertiary**: Use inline widget component
4. **Final**: Show error message with instructions

## ✅ Benefits of This Architecture

### For Development:

- ✅ True microfrontend experience
- ✅ Independent development of components
- ✅ Separate build systems and dependencies
- ✅ Team autonomy (if multiple developers)

### For Production:

- ✅ Fast SPA performance (no network calls)
- ✅ Simple deployment (single static folder)
- ✅ SEO-friendly (everything on same domain)
- ✅ No CORS issues
- ✅ Excellent lighthouse scores

### For Maintenance:

- ✅ Modular architecture
- ✅ Isolated concerns
- ✅ Graceful degradation
- ✅ Future-proof for scaling

This gives you the best of both worlds: microfrontend development benefits with
SPA production performance! 🎉
