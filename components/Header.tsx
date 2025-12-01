import { useState } from 'react';
import { generateResumePDF } from '@/utils/pdfGenerator';
import { generateResumeDocx } from '@/utils/docxGenerator';
import resumeData from '../data/resume.json';

export default function Header() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingDocx, setIsGeneratingDocx] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      await generateResumePDF(resumeData);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Sorry, there was an error generating the PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadDocx = async () => {
    try {
      setIsGeneratingDocx(true);
      await generateResumeDocx(resumeData);
    } catch (error) {
      console.error('Failed to generate DOCX:', error);
      alert('Sorry, there was an error generating the DOCX. Please try again.');
    } finally {
      setIsGeneratingDocx(false);
    }
  };

  return (
    <header
      className='text-center mb-16'
      itemScope
      itemType='https://schema.org/Person'
    >
      <h1
        className='text-5xl font-bold text-gray-900 dark:text-white mb-4'
        itemProp='name'
      >
        {resumeData.personalInfo.name}
      </h1>
      <h2
        className='text-xl font-semibold text-gray-600 dark:text-gray-300 mb-8'
        itemProp='jobTitle'
      >
        {resumeData.personalInfo.title}
      </h2>

      {/* SEO-Enhanced Contact Links */}
      <nav
        className='flex justify-center space-x-6 mb-6'
        aria-label='Contact Information'
      >
        <a
          href={`mailto:${resumeData.personalInfo.email}`}
          className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1'
          itemProp='email'
          aria-label={`Send email to ${resumeData.personalInfo.name}`}
        >
          <svg
            className='w-4 h-4'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
          </svg>
          Email
        </a>
        <a
          href={resumeData.personalInfo.linkedin}
          className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1'
          target='_blank'
          rel='noopener noreferrer'
          itemProp='sameAs'
          aria-label={`Visit ${resumeData.personalInfo.name}'s LinkedIn profile`}
        >
          <svg
            className='w-4 h-4'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
          </svg>
          LinkedIn
        </a>
        <a
          href={resumeData.personalInfo.github}
          className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1'
          target='_blank'
          rel='noopener noreferrer'
          itemProp='sameAs'
          aria-label={`Visit ${resumeData.personalInfo.name}'s GitHub profile`}
        >
          <svg
            className='w-4 h-4'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
          </svg>
          GitHub
        </a>
        <a
          href={resumeData.personalInfo.stackoverflow}
          className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1'
          target='_blank'
          rel='noopener noreferrer'
          itemProp='sameAs'
          aria-label={`Visit ${resumeData.personalInfo.name}'s Stack Overflow profile`}
        >
          <svg
            className='w-4 h-4'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092L6.785 12.743zM24 22.25l-2.205.48L19.5 24l-1.295-.27 2.205-.48L24 22.25zm-2.25-2.25H0v2.25h21.75V20zm-2.25-2.25H2.25v2.25h17.25v-2.25zm-2.25-2.25H4.5v2.25h13.5v-2.25zm-2.25-2.25H6.75v2.25H9.75v-2.25zm-2.25-2.25H9v2.25h2.25v-2.25z' />
          </svg>
          Stack Overflow
        </a>
      </nav>

      {/* SEO Keywords - Hidden but crawlable */}
      <div
        className='sr-only'
        itemProp='description'
      >
        {resumeData.personalInfo.name} is a {resumeData.personalInfo.title}{' '}
        based in {resumeData.personalInfo.location}. Specializing in React,
        TypeScript, JavaScript, Next.js, and modern frontend development. Expert
        in micro frontend architecture, design systems, and performance
        optimization.
      </div>
      <div className='flex flex-col sm:flex-row justify-center gap-4'>
        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF || isGeneratingDocx}
          className='inline-flex items-center justify-center px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isGeneratingPDF ? (
            <>
              <svg
                className='animate-spin w-5 h-5 mr-2'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                />
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                />
              </svg>
              Generating PDF...
            </>
          ) : (
            <>
              <svg
                className='w-5 h-5 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
              Download Resume - PDF
            </>
          )}
        </button>

        <button
          onClick={handleDownloadDocx}
          disabled={isGeneratingPDF || isGeneratingDocx}
          className='inline-flex items-center justify-center px-6 py-3 bg-green-600 dark:bg-green-500 text-white font-medium rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isGeneratingDocx ? (
            <>
              <svg
                className='animate-spin w-5 h-5 mr-2'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                />
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                />
              </svg>
              Generating DOCX...
            </>
          ) : (
            <>
              <svg
                className='w-5 h-5 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
              Download Resume - DOCX
            </>
          )}
        </button>
      </div>
    </header>
  );
}
