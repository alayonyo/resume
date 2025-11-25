import { useState, useEffect } from 'react';

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
    <footer className='bg-gray-900 text-white py-8 mt-16'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center space-y-4'>
          <button
            onClick={toggleTheme}
            className='flex items-center space-x-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700 hover:border-gray-600'
            aria-label='Toggle dark mode'
          >
            {isDark ? (
              <>
                <svg
                  className='w-4 h-4 text-yellow-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
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
                >
                  <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
                </svg>
                <span className='text-sm text-gray-300'>Dark Mode</span>
              </>
            )}
          </button>
          <p className='text-gray-400 text-center'>
            © {new Date().getFullYear()} Yonatan Ayalon |{' '}
            <a
              href='mailto:yonatanayalon1@gmail.com'
              className='text-blue-400 hover:text-blue-300 underline transition-colors'
            >
              yonatanayalon1@gmail.com
            </a>{' '}
            | Rockville, MD
          </p>
        </div>
      </div>
    </footer>
  );
}
