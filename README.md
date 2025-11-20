# Yonatan Resume - Next.js React App

A modern, responsive resume website built with Next.js, React, TypeScript, and Tailwind CSS.

## 🚀 Project Status

✅ **READY TO USE** - The project is fully set up and running!

- Development server: http://localhost:3000
- Build system: Configured and tested
- All dependencies: Installed and working

## ✨ Features

- **Modern Tech Stack**: Built with Next.js 15, React 18, and TypeScript
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Fast Performance**: Optimized with Next.js App Router
- **SEO Friendly**: Built-in meta tags and structured data
- **Professional Layout**: Clean, modern design suitable for a professional resume
- **Type Safety**: Full TypeScript support for better development experience

## 🏃‍♂️ Getting Started

The project is already set up and ready to use! If you need to reinstall dependencies:

```bash
npm install
```

The development server is currently running. If you need to start it again:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your resume website.

## 📝 Available Scripts

- `npm run dev` - Start development server (currently running)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
├── src/
│   └── app/
│       ├── globals.css      # Global styles with Tailwind
│       ├── layout.tsx       # Root layout component
│       └── page.tsx         # Home page component
├── .github/
│   └── copilot-instructions.md
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Customization

To customize the resume content:

1. **Personal Information**: Edit `src/app/page.tsx` to update your:
   - Name and title
   - Contact information (email, LinkedIn, GitHub)
   - About me section
   - Skills and technologies
   - Work experience
   - Contact section

2. **Site Metadata**: Modify `src/app/layout.tsx` to change:
   - Page title and description
   - SEO metadata

3. **Styling**: Update `src/app/globals.css` for:
   - Custom colors and themes
   - Additional Tailwind customizations
   - Custom CSS styles

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [ESLint](https://eslint.org/) - Code linting tool

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Quick Deploy Options:

1. **Vercel** (Recommended)
   - Connect your GitHub repository
   - Automatic deployments on every push
   - Built-in CDN and optimizations

2. **Netlify**
   - Drag and drop the `out` folder after running `npm run build`
   - Or connect your Git repository

3. **GitHub Pages**
   - Configure static export in `next.config.js`
   - Use GitHub Actions for automated deployment

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 📧 Need Help?

If you encounter any issues or need to make changes, the project structure is well-organized and documented. All major files are in the `src/app/` directory for easy navigation.