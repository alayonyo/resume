import { useState, useEffect } from 'react';
import resumeData from '../data/resume.json';

export default function Footer() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <footer className='bg-gray-900 text-white py-8 mt-16' itemScope itemType="https://schema.org/Person">
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center space-y-6'>
          {/* Professional Links Section - SEO Enhancement */}
          <nav className='flex flex-wrap justify-center gap-6 text-sm' aria-label="Professional Links">
            <a
              href={resumeData.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className='text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1'
              itemProp="sameAs"
            >
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
              </svg>
              LinkedIn Profile
            </a>
            <a
              href={resumeData.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className='text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1'
              itemProp="sameAs"
            >
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/>
              </svg>
              GitHub Portfolio
            </a>
            <a
              href={resumeData.personalInfo.stackoverflow}
              target="_blank"
              rel="noopener noreferrer"
              className='text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1'
              itemProp="sameAs"
            >
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092L6.785 12.743zM24 22.25l-2.205.48L19.5 24l-1.295-.27 2.205-.48L24 22.25zm-2.25-2.25H0v2.25h21.75V20zm-2.25-2.25H2.25v2.25h17.25v-2.25zm-2.25-2.25H4.5v2.25h13.5v-2.25zm-2.25-2.25H6.75v2.25H9.75v-2.25zm-2.25-2.25H9v2.25h2.25v-2.25z'/>
              </svg>
              Stack Overflow
            </a>
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className='flex items-center space-x-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700 hover:border-gray-600'
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? (
              <>
                <svg
                  className='w-4 h-4 text-yellow-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  aria-hidden="true"
                >
                  <path
                    fillRule='evenodd'
                    d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='text-sm text-gray-300'>Light Mode</span>
              </>
            ) : (
              <>
                <svg
                  className='w-4 h-4 text-gray-300'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  aria-hidden="true"
                >
                  <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
                </svg>
                <span className='text-sm text-gray-300'>Dark Mode</span>
              </>
            )}
          </button>

          {/* Contact Information with Schema.org markup */}
          <address className='text-gray-400 text-center not-italic'>
            <span itemProp="name">© {new Date().getFullYear()} {resumeData.personalInfo.name}</span>
            <span className="mx-2">•</span>
            <span itemProp="jobTitle">{resumeData.personalInfo.title}</span>
            <br className="sm:hidden" />
            <span className="mx-2 hidden sm:inline">•</span>
            <a
              href={`mailto:${resumeData.personalInfo.email}`}
              className='text-blue-400 hover:text-blue-300 underline transition-colors'
              itemProp="email"
              aria-label={`Send email to ${resumeData.personalInfo.name}`}
            >
              {resumeData.personalInfo.email}
            </a>
            <span className="mx-2">•</span>
            <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="addressLocality">{resumeData.personalInfo.location}</span>
            </span>
          </address>

          {/* SEO Keywords - Hidden but crawlable */}
          <div className="sr-only" itemProp="description">
            Senior Frontend Engineer specializing in React, TypeScript, JavaScript, Next.js, and modern web development. 
            Experienced in micro frontend architecture, design systems, A/B testing, and performance optimization. 
            Available for senior software engineering positions in {resumeData.personalInfo.location} and remote opportunities.
          </div>
        </div>
      </div>
    </footer>
  );
}
