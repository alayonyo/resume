export default function Contact() {
  return (
    <section className='hoverable-section bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg shadow-lg hover:shadow-2xl p-8 border-l-4 border-blue-500 hover:border-l-6'>
      <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
        Get In Touch
      </h2>
      <p className='text-gray-700 dark:text-gray-300 mb-4'>
        I'm always interested in new opportunities and collaborations.
      </p>
      <div className='flex flex-col sm:flex-row gap-4 justify-center'>
        <a
          href='mailto:yonatanayalon1@gmail.com'
          className='bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors inline-block text-center'
        >
          Contact Me
        </a>
        <a
          href='/yonatan-ayalon-resume-2025-10.pdf'
          download='Yonatan_Ayalon_Resume.pdf'
          className='inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 dark:border-white text-blue-600 dark:text-white font-medium rounded-lg hover:bg-blue-600 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-colors'
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
    </section>
  );
}
