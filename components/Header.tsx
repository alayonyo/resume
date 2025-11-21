import { useState, useEffect } from 'react';

export default function Header() {
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
    <header className='text-center mb-16 relative'>
      <button
        onClick={toggleTheme}
        className='absolute top-0 right-0 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200 border border-gray-200 dark:border-gray-700'
        aria-label='Toggle dark mode'
      >
        {isDark ? (
          <svg
            className='w-5 h-5 text-yellow-500'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
              clipRule='evenodd'
            />
          </svg>
        ) : (
          <svg
            className='w-5 h-5 text-gray-700'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
          </svg>
        )}
      </button>

      <h1 className='text-5xl font-bold text-gray-900 dark:text-white mb-4'>
        Yonatan Ayalon
      </h1>
      <p className='text-xl text-gray-600 dark:text-gray-300 mb-8'>
        Senior Front-End Software Engineer
      </p>
      <div className='flex justify-center space-x-6 mb-6'>
        <a
          href='mailto:yonatanayalon1@gmail.com'
          className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'
        >
          Email
        </a>
        <a
          href='https://www.linkedin.com/in/yonatan-ayalon-25992014/'
          className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'
          target='_blank'
        >
          LinkedIn
        </a>
        <a
          href='https://github.com/alayonyo'
          className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'
          target='_blank'
        >
          GitHub
        </a>
        <a
          href='https://stackoverflow.com/users/2633390/yonatan-ayalon'
          className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'
          target='_blank'
        >
          Stack Overflow
        </a>
      </div>
      <div className='flex justify-center'>
        <a
          href='/yonatan-ayalon-resume-2025-10.pdf'
          download='Yonatan_Ayalon_Resume.pdf'
          className='inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl'
        >
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
          Download Resume
        </a>
      </div>
    </header>
  );
}
