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
    <header className='text-center mb-16'>
      <h1 className='text-5xl font-bold text-gray-900 dark:text-white mb-4'>
        {resumeData.personalInfo.name}
      </h1>
      <h2 className='text-xl font-semibold text-gray-600 dark:text-gray-300 mb-8'>
        {resumeData.personalInfo.title}
      </h2>
      <div className='flex justify-center space-x-6 mb-6'>
        <a
          href={`mailto:${resumeData.personalInfo.email}`}
          className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'
        >
          Email
        </a>
        <a
          href={resumeData.personalInfo.linkedin}
          className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'
          target='_blank'
        >
          LinkedIn
        </a>
        <a
          href={resumeData.personalInfo.github}
          className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'
          target='_blank'
        >
          GitHub
        </a>
        <a
          href={resumeData.personalInfo.stackoverflow}
          className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'
          target='_blank'
        >
          Stack Overflow
        </a>
      </div>
      <div className='flex justify-center gap-4'>
        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF || isGeneratingDocx}
          className='inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
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
              Download PDF
            </>
          )}
        </button>
        
        <button
          onClick={handleDownloadDocx}
          disabled={isGeneratingPDF || isGeneratingDocx}
          className='inline-flex items-center px-6 py-3 bg-green-600 dark:bg-green-500 text-white font-medium rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
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
              Download DOCX
            </>
          )}
        </button>
      </div>
    </header>
  );
}
