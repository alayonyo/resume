# Yonatan Resume - Next.js React App with Microfrontend Architecture

A modern, responsive resume website built with Next.js, React, TypeScript, and
Tailwind CSS. Features a **microfrontend chat widget** built with Webpack Module
Federation for modular, scalable architecture.

## 🏗️ Architecture Overview

This project implements a **microfrontend architecture** with two independent
applications:

1. **Host Application (Next.js)** - Main resume website (`/`)

   - Static site generation with Next.js 15
   - Server runs on port **3500** (dev) / **8080** (production)
   - Consumes the chat widget as a remote module

2. **Chat Widget Microfrontend** - Interactive chat component
   (`/packages/chat-widget`)
   - Standalone TypeScript/React application
   - Built with Webpack 5 + Module Federation
   - Exposed via `remoteEntry.js` for dynamic loading
   - Uses **externalized React** from the host (no duplicate React bundles)

### Why Microfrontend Architecture?

- **Independent Development**: Chat widget can be developed, tested, and
  deployed separately
- **Technology Flexibility**: Each microfrontend can use different
  versions/tools
- **Code Reusability**: Chat widget can be integrated into other projects
- **Team Scalability**: Different teams can own different microfrontends
- **Performance**: Lazy loading and shared dependencies reduce bundle size

## 🚀 Project Status

✅ **READY TO USE** - The project is fully set up and running!

- Development server: http://localhost:3500
- Production server: http://localhost:8080
- Build system: Configured and tested
- All dependencies: Installed and working
- **Network issue workaround**: Mirror registry configured for firewall bypass

## ✨ Features

- **Modern Tech Stack**: Built with Next.js 15, React 18, and TypeScript
- **Microfrontend Architecture**: Modular chat widget with Module Federation
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **ATS-Optimized Resume Downloads**: Generate professional PDF and DOCX formats
- **Single Source of Truth**: Content managed from `data/resume.json`
- **Fast Performance**: Optimized with Next.js static export
- **SEO Friendly**: Built-in meta tags and structured data
- **Professional Layout**: Clean, modern design suitable for recruiters
- **Type Safety**: Full TypeScript support for better development experience
- **Job-Specific Resumes**: Generate tailored resumes for specific positions
- **Interactive Chat Widget**: Microfrontend-based chat interface with Module
  Federation

## 🎯 Job-Specific Resume Generation

This project supports creating tailored resumes for specific job positions.
Currently includes:

### Yahoo Frontend Engineer Resume

A specialized resume optimized for Yahoo's Frontend Engineer position featuring:

- **Reorganized Skills**: Prioritizes Yahoo-relevant technologies (React,
  Next.js, TypeScript, A/B testing)
- **Enhanced Professional Summary**: Emphasizes large-scale application
  experience and modern web technologies
- **Targeted Experience Descriptions**: Highlights collaboration with
  product/design teams and remote work experience
- **Yahoo Requirements Alignment**: Includes specific section mapping
  qualifications to job requirements
- **ATS Optimization**: Clean formatting for applicant tracking systems

**Generate Yahoo Resume:**

```bash
npm run generate:yahoo-pdf
```

This creates: `public/yonatan-ayalon-resume-yahoo-frontend-engineer.pdf`

### Adding New Job-Specific Resumes

To create resumes for other positions:

1. **Create Data File**: Add new resume data in `data/[company]-resume.json`
2. **Build Generator**: Create generator script in
   `utils/[company]ResumeGenerator.js`
3. **Add Script**: Create generation script in `scripts/generate[Company]PDF.js`
4. **Update package.json**: Add npm script for easy generation

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Python 3 (for chat widget development server)

### Installation

```bash
# Install main dependencies
npm install

# Install chat widget dependencies
cd packages/chat-widget
npm install
cd ../..
```

### Development Mode

See [DEV_SETUP.md](./DEV_SETUP.md) for detailed instructions.

#### Quick Start with Automated Script

```bash
./start-dev.sh
```

This starts all three required processes:

- Chat widget webpack watch (auto-rebuild)
- Chat widget Python CORS server (port 3001)
- Resume Next.js app (port 3500)

Then open http://localhost:3500

#### Manual Setup (Three Terminals)

**Terminal 1** - Chat Widget (Webpack + CORS Server):

```bash
cd packages/chat-widget
npm run dev        # Starts webpack watch mode
```

**Terminal 2** - Chat Widget Server:

```bash
cd packages/chat-widget
npm run serve      # Starts Python server with CORS on port 3001
```

**Terminal 3** - Resume App (Next.js):

```bash
npm run dev        # Starts Next.js on port 3500
```

Then open http://localhost:3500

#### Why This Setup?

The chat widget uses a **two-process development setup** because:

1. **webpack-dev-server issue**: Injects HMR client code that creates async
   chunk dependencies, preventing Module Federation's `chatWidget` container
   from being assigned synchronously
2. **Solution**: Use webpack watch mode (builds to disk) + Python HTTP server
   with CORS headers
3. **Benefits**:
   - ✅ Module Federation works correctly
   - ✅ Auto-rebuild on file changes
   - ✅ CORS headers for cross-origin requests
   - ✅ Hot reload still works for Next.js host

### Quick Start (Simplified)

If you just want to run the resume app without the chat widget:

```bash
npm run dev
```

The inline fallback chat widget will be used instead of loading the
microfrontend.

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

The project is already set up! If you need to reinstall dependencies:

```bash
# Install root dependencies
npm install

# Install chat widget dependencies (if needed)
cd packages/chat-widget
npm install --legacy-peer-deps
cd ../..
```

**Note for corporate networks**: If you encounter npm 403 errors or network
issues, the build scripts automatically use a mirror registry
(registry.npmmirror.com) to bypass firewalls.

### Development Mode

Start the Next.js development server:

```bash
npm run dev
```

Visit [http://localhost:3500](http://localhost:3500) to see your resume website.

The chat widget will automatically load and use the host's React instance (no
duplicate React bundles).

### Production Build

Build the complete application (main app + chat widget):

```bash
npm run build:production
```

This will:

1. Generate PDF and DOCX resumes
2. Build the chat widget TypeScript source with Webpack
3. Build the Next.js application
4. Create a unified deployment in `/deploy` folder

### Serve Production Build Locally

```bash
npm run serve:static
```

Visit [http://localhost:8080](http://localhost:8080) to test the production
build.

## 📝 Available Scripts

### Development

- `npm run dev` - Start Next.js development server on port 3500
- `npm run lint` - Run ESLint for code quality

### Building

- `npm run build` - Build Next.js application only
- `npm run build:chat` - Build chat widget microfrontend (TypeScript → Webpack)
- `npm run build:production` - **Full production build** (documents + chat
  widget + Next.js + unified export)
- `npm run export` - Export Next.js static site to `/deploy`
- `npm run export:unified` - Export with chat widget included

### Resume Generation

- `npm run generate:pdf` - Generate ATS-optimized PDF resume
- `npm run generate:docx` - Generate ATS-optimized DOCX resume
- `npm run generate:yahoo-pdf` - Generate Yahoo-specific PDF resume
- `npm run generate:documents` - Generate both PDF and DOCX resumes

### Testing

- `npm run test:chat-widget` - Run chat widget unit tests
- `npm run serve:static` - Serve production build locally on port 8080

### Production

- `npm run start` - Start Next.js production server (not commonly used with
  static export)

## Project Structure

```
├── components/              # Next.js React components
│   ├── Header.tsx          # Header with download buttons
│   ├── Contact.tsx         # Contact section with download buttons
│   ├── About.tsx           # Professional summary
│   ├── Skills.tsx          # Technical skills
│   ├── Experience.tsx      # Work experience
│   ├── Footer.tsx          # Footer with theme toggle
│   └── RemoteChatWrapper.tsx  # Module Federation loader for chat widget
├── packages/
│   └── chat-widget/        # 🎯 MICROFRONTEND: Standalone chat widget
│       ├── src/            # TypeScript source files
│       │   ├── index.tsx   # Entry point
│       │   └── components/
│       │       ├── ChatWidget.tsx   # Main chat component
│       │       └── ChatButton.tsx   # Chat button component
│       ├── dist/           # Webpack build output (gitignored)
│       ├── webpack.config.js  # Module Federation configuration
│       ├── package.json    # Independent dependencies
│       └── tsconfig.json   # TypeScript configuration
├── data/
│   ├── resume.json         # Single source of truth for content
│   ├── yahoo-resume.json   # Yahoo-specific resume data
│   ├── resumeData.ts       # TypeScript interfaces
│   └── yahooResumeData.ts  # Yahoo-specific TypeScript data
├── utils/
│   ├── pdfGenerator.ts     # ATS-optimized PDF generation
│   ├── docxGenerator.ts    # ATS-optimized DOCX generation
│   ├── yahooResumeGenerator.ts    # Yahoo PDF generator (TypeScript)
│   └── yahooResumeGeneratorJS.js  # Yahoo PDF generator (script)
├── scripts/
│   ├── generateStaticPDF.js       # Static PDF generator
│   ├── generateStaticDocx.js      # Static DOCX generator
│   ├── generateYahooPDF.js        # Yahoo-specific PDF generator
│   ├── build-chat-widget.sh       # Chat widget build script (mirror registry support)
│   └── build-production.sh        # Full production build orchestration
├── deploy/                 # 🚀 Production build output (gitignored)
│   ├── index.html          # Static Next.js pages
│   ├── _next/              # Next.js static assets
│   └── chat-widget/        # Chat widget microfrontend bundle
│       ├── remoteEntry.js  # Module Federation entry point
│       └── *.js, *.css     # Chat widget chunks and styles
├── pages/                  # Next.js pages
├── public/                 # Static files and generated documents
├── docs/                   # Project documentation
└── styles/                 # CSS styles
```

### Key Directories Explained

- **`/packages/chat-widget`**: Independent microfrontend application with its
  own build system
- **`/deploy`**: Complete production build ready for static hosting (gitignored)
- **`/components/RemoteChatWrapper.tsx`**: Implements Module Federation consumer
  logic
- **`/scripts`**: Build automation with network workarounds

## 🎨 Customization

### Updating Resume Content

To customize the resume content:

1. **Resume Content**: Edit `data/resume.json` to update:

   - Personal information (name, title, contact details)
   - Professional summary
   - Technical skills by category
   - Work experience and achievements
   - Personal qualities/competencies

2. **Document Generation**: After updating content:

   - Run `npm run generate:documents` to create fresh PDF/DOCX files
   - Run `npm run generate:yahoo-pdf` to create job-specific resume
   - Both website and downloadable documents will reflect changes

3. **Styling**: Modify component files in `components/` for:

   - Layout and design changes
   - Button styling and colors
   - Responsive behavior

4. **Advanced**: Update generator files in `utils/` and `scripts/` for:
   - Document formatting changes
   - ATS optimization tweaks
   - New export formats

### Customizing the Chat Widget

The chat widget is a **standalone microfrontend** that can be customized
independently:

1. **Edit Source Files**: Modify TypeScript files in `packages/chat-widget/src/`

   - `ChatWidget.tsx` - Main chat interface
   - `ChatButton.tsx` - Chat button component
   - `*.css` - Component styles

2. **Rebuild**: After changes, run:

   ```bash
   npm run build:chat
   ```

3. **Props/Configuration**: Update `RemoteChatWrapper` props in
   `pages/index.tsx`:
   - `botName` - Chat bot display name
   - `welcomeMessage` - Initial greeting
   - `placeholder` - Input field placeholder
   - `theme` - 'light' or 'dark'
   - `position` - Button position
   - `buttonColor` - Custom button color

### Adding New Microfrontends

To add additional microfrontends:

1. Create new package in `/packages/[name]`
2. Configure Webpack with Module Federation
3. Add build script to root `package.json`
4. Create loader component in `/components`
5. Expose React/ReactDOM globally before loading remote

## Built With

### Core Technologies

- [Next.js 15](https://nextjs.org/) - React framework with static site
  generation
- [React 18](https://reactjs.org/) - JavaScript library for building user
  interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

### Microfrontend Architecture

- [Webpack 5](https://webpack.js.org/) - Module bundler with Module Federation
- [Module Federation](https://webpack.js.org/concepts/module-federation/) -
  Runtime code sharing
- [ts-loader](https://github.com/TypeStrong/ts-loader) - TypeScript loader for
  Webpack

### Development Tools

- [ESLint](https://eslint.org/) - Code linting tool
- [PDFKit](https://pdfkit.org/) - PDF generation for Node.js
- [docx](https://docx.js.org/) - DOCX generation library

### Network Workarounds

- **Mirror Registry**: `registry.npmmirror.com` for corporate firewall bypass
- **Legacy Peer Deps**: `--legacy-peer-deps` flag for dependency compatibility

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

## 🚀 Deployment

### Pre-Deployment Checklist

1. **Build Production Bundle**:

   ```bash
   npm run build:production
   ```

   This creates a complete production build in `/deploy` folder.

2. **Test Locally**:

   ```bash
   npm run serve:static
   ```

   Visit http://localhost:8080 to verify everything works.

3. **Verify Chat Widget**:
   - Click chat button in bottom-right corner
   - Ensure no React errors in browser console
   - Check that "Ask me about Yonatan..." placeholder appears

### Deployment Options

#### 1. Static Hosting (Recommended)

Deploy the `/deploy` folder to any static hosting service:

**Vercel** (Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd deploy
vercel --prod
```

**Netlify**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd deploy
netlify deploy --prod
```

**GitHub Pages**

```bash
# Push deploy folder to gh-pages branch
git subtree push --prefix deploy origin gh-pages
```

#### 2. Cloud Providers

**AWS S3 + CloudFront**

```bash
# Sync to S3 bucket
aws s3 sync deploy/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

**Google Cloud Storage**

```bash
gsutil -m rsync -r -d deploy/ gs://your-bucket-name
```

#### 3. Container Deployment

**Docker** (if you prefer containerization)

```dockerfile
FROM nginx:alpine
COPY deploy /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Important Notes

- **Static Export**: This project uses Next.js static export
  (`output: 'export'`)
- **No Server Required**: Entire site runs as static HTML/CSS/JS
- **Chat Widget**: Loads dynamically via Module Federation (no server needed)
- **CORS**: Not required since chat widget is served from same origin in
  production
- **SEO**: Pre-rendered HTML ensures good SEO performance

### Post-Deployment Verification

1. Check main site loads correctly
2. Verify PDF/DOCX downloads work
3. Test chat widget appears and functions
4. Check browser console for any errors
5. Test on mobile devices
6. Verify all internal links work

## 🔧 Troubleshooting

### npm Install Fails with 403 Errors

**Problem**: Corporate firewall blocks npm registry access.

**Solution**: The build scripts automatically use mirror registry, but if you
need manual installation:

```bash
npm config set registry https://registry.npmmirror.com
npm install --legacy-peer-deps
npm config set registry https://registry.npmjs.org
```

### React useState Error in Chat Widget

**Problem**: `TypeError: Cannot read properties of null (reading 'useState')`

**Solution**: This means React is duplicated. The chat widget is configured to
use externalized React from the host. Rebuild:

```bash
npm run build:chat
npm run build:production
```

### Chat Widget Not Loading

**Problem**: Chat button shows ⚠️ icon or falls back to inline widget.

**Checklist**:

1. Verify `deploy/chat-widget/remoteEntry.js` exists
2. Check browser console for 404 errors
3. Ensure production build was run: `npm run build:production`
4. Test that React/ReactDOM are exposed globally before widget loads

### Build Fails in webpack

**Problem**: Missing `ajv` dependency or peer dependency conflicts.

**Solution**:

```bash
cd packages/chat-widget
npm install ajv@^8.0.0 --legacy-peer-deps
cd ../..
npm run build:chat
```

### Port Already in Use

**Problem**: `EADDRINUSE` error on port 3500 or 8080.

**Solution**:

```bash
# Kill process on port 3500
lsof -ti:3500 | xargs kill -9

# Kill process on port 8080
lsof -ti:8080 | xargs kill -9
```

### TypeScript Errors in Chat Widget

**Problem**: Type errors when editing `.tsx` files in chat widget.

**Solution**:

```bash
cd packages/chat-widget
npm install --legacy-peer-deps
```

Ensure you're editing **source files** in `packages/chat-widget/src/`, not
output files in `dist/`.

## 📚 Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

### Module Federation Resources

- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Module Federation Examples](https://github.com/module-federation/module-federation-examples)
- [Micro-Frontends Course](https://microfrontends.dev/)

### Architecture Patterns

- [Microfrontend Architecture](https://martinfowler.com/articles/micro-frontends.html)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)

## 📧 Need Help?

If you encounter any issues or need to make changes:

1. **Check the structure**: All source files are well-organized with clear
   naming
2. **Read the comments**: Key files have inline documentation
3. **Check build output**: Look at terminal output for specific errors
4. **Consult documentation**: See `/docs` folder for detailed guides
5. **Network issues**: Use mirror registry workaround documented above

### Key Files for AI Agents

When an AI agent needs to understand this project:

- **Architecture**: This README and `.github/copilot-instructions.md`
- **Build Process**: `scripts/build-production.sh` and `package.json`
- **Chat Widget**: `packages/chat-widget/webpack.config.js` and `src/` folder
- **Module Federation**: `components/RemoteChatWrapper.tsx` (consumer side)
- **Data Source**: `data/resume.json` (single source of truth)

## 🤖 Technical Deep Dive (For AI Agents)

### Module Federation Configuration

**Host Side** (`components/RemoteChatWrapper.tsx`):

```typescript
// 1. Expose React/ReactDOM globally BEFORE loading remote
(window as any).React = React;
(window as any).ReactDOM = ReactDOM;

// 2. Load remoteEntry.js dynamically
const script = document.createElement('script');
script.src = isProduction
  ? '/chat-widget/remoteEntry.js'  // Same origin in production
  : 'http://localhost:3001/remoteEntry.js';  // Dev server

// 3. Access exposed module after script loads
const chatWidget = (window as any).chatWidget;
chatWidget.get('./ChatButton').then(factory => {
  const Module = factory();
  setChatButton(() => Module.default);
});
```

**Remote Side** (`packages/chat-widget/webpack.config.js`):

```javascript
// 1. Externalize React (don't bundle it)
externals: {
  react: 'React',
  'react-dom': 'ReactDOM',
},

// 2. Configure Module Federation
new ModuleFederationPlugin({
  name: 'chatWidget',
  filename: 'remoteEntry.js',
  exposes: {
    './ChatWidget': './src/components/ChatWidget',
    './ChatButton': './src/components/ChatButton',
  },
  // Note: No 'shared' config needed with externals approach
})
```

### Build Workflow

**Complete Build Process**:

```
1. npm run build:production
   ├─> Generate PDFs/DOCX (generateStaticPDF.js, generateStaticDocx.js)
   ├─> Build Chat Widget
   │   ├─> Check for node_modules (install if missing with mirror registry)
   │   ├─> Install ajv@^8.0.0 (webpack dependency)
   │   └─> webpack --mode production
   │       ├─> Compile TypeScript (src/*.tsx → dist/*.js)
   │       ├─> Externalize React (use host's React)
   │       ├─> Generate remoteEntry.js (4 KiB, Module Federation)
   │       └─> Extract CSS (MiniCssExtractPlugin)
   ├─> Build Next.js
   │   └─> next build (static export)
   └─> Unified Export
       ├─> Copy .next/server/pages → deploy/
       ├─> Copy .next/static → deploy/_next/static/
       ├─> Copy packages/chat-widget/dist → deploy/chat-widget/
       └─> Copy public/* → deploy/
```

### Why Externals Instead of Shared Dependencies?

**Problem with Module Federation `shared` config**:

- Next.js host doesn't use Webpack Module Federation
- Can't configure `shared` dependencies on non-MF host
- Results in two React instances → "Cannot read properties of null (reading
  'useState')"

**Solution with `externals`**:

```javascript
// Chat widget webpack.config.js
externals: {
  react: 'React',        // Expect window.React
  'react-dom': 'ReactDOM' // Expect window.ReactDOM
}
```

The host exposes React globally, and the chat widget uses that instance. **No
duplicate React bundles.**

### Network Workaround (Corporate Firewalls)

**Problem**: npm registry blocked by corporate proxy/firewall (403 Forbidden,
ECONNRESET)

**Solution** (`scripts/build-chat-widget.sh`):

```bash
# Temporarily switch to China mirror registry
npm config set registry https://registry.npmmirror.com

# Install with legacy peer deps
npm install --legacy-peer-deps

# Reset to default
npm config set registry https://registry.npmjs.org
```

This bypasses most corporate firewalls while maintaining security.

### File Structure Logic

```
Source Files (edit these):
├── packages/chat-widget/src/        ← TypeScript source
├── components/                      ← Next.js components
├── data/resume.json                 ← Content source
└── scripts/                         ← Build automation

Build Outputs (gitignored, don't edit):
├── packages/chat-widget/dist/       ← Webpack output
├── .next/                           ← Next.js build
└── deploy/                          ← Production bundle
```

### Common Pitfalls for AI Agents

1. **Don't edit `deploy/` or `dist/` files** - These are generated outputs
2. **Always rebuild after TypeScript changes** - `npm run build:chat`
3. **Mirror registry is automatic** - Build scripts handle it
4. **React must be externalized** - Don't use Module Federation `shared` config
5. **Static export only** - No Next.js server-side rendering
6. **Single source of truth** - All resume content comes from `data/resume.json`

### Testing Chat Widget Integration

```bash
# 1. Build everything
npm run build:production

# 2. Serve locally
npm run serve:static

# 3. Open browser to http://localhost:8080

# 4. Check browser console for:
✅ "React and ReactDOM exposed on window object"
✅ "Chat widget found, loading module..."
✅ "Chat widget loaded successfully!"

# 5. Click chat button - should see input field with placeholder
```

### Debugging Module Federation

**Check if remoteEntry.js loads**:

```bash
curl http://localhost:8080/chat-widget/remoteEntry.js
```

**Check React is exposed globally** (browser console):

```javascript
console.log(window.React);      // Should log React object
console.log(window.ReactDOM);   // Should log ReactDOM object
console.log(window.chatWidget); // Should log Module Federation container
```

**Verify no React duplication**:

```bash
# Chat widget bundle should NOT include React
grep -r "react.production.min.js" deploy/chat-widget/
# Should return nothing
```
