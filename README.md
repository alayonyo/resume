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
- **ATS-Optimized Resume Downloads**: Generate professional PDF and DOCX formats
- **Single Source of Truth**: Content managed from `data/resume.json`
- **Fast Performance**: Optimized with Next.js App Router
- **SEO Friendly**: Built-in meta tags and structured data
- **Professional Layout**: Clean, modern design suitable for recruiters
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

Visit [http://localhost:3500](http://localhost:3500) to see your resume website.

## 📝 Available Scripts

- `npm run dev` - Start development server on port 3500
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run generate:pdf` - Generate ATS-optimized PDF resume
- `npm run generate:docx` - Generate ATS-optimized DOCX resume
- `npm run generate:documents` - Generate both PDF and DOCX resumes
- `npm run build:static` - Build static site with generated documents

## Project Structure

```
├── components/              # React components
│   ├── Header.tsx          # Header with download buttons
│   ├── Contact.tsx         # Contact section with download buttons
│   ├── About.tsx           # Professional summary
│   ├── Skills.tsx          # Technical skills
│   ├── Experience.tsx      # Work experience
│   └── Footer.tsx          # Footer with theme toggle
├── data/
│   ├── resume.json         # Single source of truth for content
│   └── resumeData.ts       # TypeScript interfaces
├── utils/
│   ├── pdfGenerator.ts     # ATS-optimized PDF generation
│   └── docxGenerator.ts    # ATS-optimized DOCX generation
├── scripts/
│   ├── generateStaticPDF.js    # Static PDF generator
│   └── generateStaticDocx.js   # Static DOCX generator
├── pages/                  # Next.js pages
├── public/                 # Static files and generated documents
├── docs/                   # Project documentation
└── styles/                 # CSS styles
```

## 🎨 Customization

To customize the resume content:

1. **Resume Content**: Edit `data/resume.json` to update:
   - Personal information (name, title, contact details)
   - Professional summary
   - Technical skills by category
   - Work experience and achievements
   - Personal qualities/competencies

2. **Document Generation**: After updating content:
   - Run `npm run generate:documents` to create fresh PDF/DOCX files
   - Both website and downloadable documents will reflect changes

3. **Styling**: Modify component files in `components/` for:
   - Layout and design changes
   - Button styling and colors
   - Responsive behavior

4. **Advanced**: Update generator files in `utils/` and `scripts/` for:
   - Document formatting changes
   - ATS optimization tweaks
   - New export formats

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