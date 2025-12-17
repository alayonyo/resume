# Yonatan Resume - Next.js Project with Microfrontend Architecture

This is a professional resume website built with Next.js, React, TypeScript, and
Tailwind CSS. Features a **microfrontend chat widget** using Webpack Module
Federation.

## Architecture

### Two Independent Applications

1. **Host Application (Next.js)**

   - Main resume website
   - Static site generation (port 3500 dev / 8080 prod)
   - Consumes chat widget as remote module

2. **Chat Widget Microfrontend** (`/packages/chat-widget`)
   - Standalone TypeScript/React application
   - Built with Webpack 5 + Module Federation
   - Exposes components via `remoteEntry.js`
   - Uses **externalized React** from host (no duplicate bundles)

## Project Completed Successfully ✅

- [x] Created copilot-instructions.md file in .github directory
- [x] Clarified project requirements (Next.js React app)
- [x] Scaffolded Next.js project with TypeScript and Tailwind CSS
- [x] Customized project structure with resume content
- [x] Compiled project successfully
- [x] Created and ran development task
- [x] Launched project at http://localhost:3500
- [x] Implemented microfrontend chat widget with Module Federation
- [x] Fixed React duplication issue using externals
- [x] Configured mirror registry workaround for corporate firewalls
- [x] Documentation complete with comprehensive README.md

## Project Structure

- `src/app/` - Next.js App Router pages and components
- `src/app/page.tsx` - Main resume page
- `src/app/layout.tsx` - Root layout
- `src/app/globals.css` - Global styles with Tailwind
- `components/` - React components including `RemoteChatWrapper.tsx` (Module
  Federation consumer)
- `packages/chat-widget/` - **Microfrontend**: Standalone chat widget
  - `src/` - TypeScript source files
  - `dist/` - Webpack build output (gitignored)
  - `webpack.config.js` - Module Federation configuration
- `data/resume.json` - Single source of truth for resume content
- `scripts/` - Build automation (includes mirror registry workaround)
- `deploy/` - Production build output (gitignored)
- `package.json` - Dependencies and scripts
- `next.config.js` - Next.js configuration (static export)
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

## Development Commands

- `npm run dev` - Start development server (port 3500)
- `npm run build` - Build Next.js application
- `npm run build:chat` - Build chat widget microfrontend
- `npm run build:production` - **Full production build** (documents + chat
  widget + Next.js)
- `npm run serve:static` - Serve production build locally (port 8080)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate:pdf` - Generate ATS-optimized PDF
- `npm run generate:docx` - Generate ATS-optimized DOCX
- `npm run test:chat-widget` - Run chat widget tests

The development server runs at http://localhost:3500 The production server runs
at http://localhost:8080

## Key Features

- ATS-optimized PDF and DOCX resume generation
- Single source of truth from `data/resume.json`
- Dual download buttons: "Download Resume - PDF" and "Download Resume - DOCX"
- Static and dynamic document generation
- Professional design optimized for recruiters
- **Microfrontend chat widget** with Module Federation
- React externalization (no duplicate React bundles)
- Mirror registry support for corporate firewall bypass
- TypeScript-first development workflow

## Technical Architecture

### Module Federation Setup

**Host (Next.js)**:

- Exposes `React` and `ReactDOM` globally via `window` object
- Dynamically loads chat widget via `remoteEntry.js`
- No Webpack Module Federation plugin needed (host side)

**Remote (Chat Widget)**:

- Webpack 5 with Module Federation plugin
- Externalizes React: `externals: { react: 'React', 'react-dom': 'ReactDOM' }`
- Exposes `./ChatButton` and `./ChatWidget` modules
- Builds to `dist/remoteEntry.js` (~4 KiB without React)

### Build Process

1. **TypeScript Compilation**: `packages/chat-widget/src/*.tsx` → `dist/*.js`
2. **Webpack Bundling**: Module Federation + CSS extraction
3. **Next.js Build**: Static site generation
4. **Unified Export**: Combine all assets into `/deploy` folder

### Network Workarounds

- **Mirror Registry**: `registry.npmmirror.com` for npm 403 errors
- **Legacy Peer Deps**: `--legacy-peer-deps` for dependency conflicts
- Auto-configured in `scripts/build-chat-widget.sh`
