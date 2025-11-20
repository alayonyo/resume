export default function Header() {
  return (
    <header className='text-center mb-16'>
      <h1 className='text-5xl font-bold text-gray-900 mb-4'>Yonatan Ayalon</h1>
      <p className='text-xl text-gray-600 mb-8'>
        Senior Front-End Software Engineer
      </p>
      <div className='flex justify-center space-x-6 mb-6'>
        <a
          href='mailto:yonatanayalon1@gmail.com'
          className='text-blue-600 hover:text-blue-800'
        >
          Email
        </a>
        <a
          href='https://www.linkedin.com/in/yonatan-ayalon-25992014/'
          className='text-blue-600 hover:text-blue-800'
          target='_blank'
        >
          LinkedIn
        </a>
        <a
          href='https://github.com/alayonyo'
          className='text-blue-600 hover:text-blue-800'
          target='_blank'
        >
          GitHub
        </a>
      </div>
      <div className='flex justify-center'>
        <a
          href='/yonatan-ayalon-resume-2025-10.pdf'
          download='Yonatan_Ayalon_Resume.pdf'
          className='inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl'
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
