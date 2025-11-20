export default function Contact() {
  return (
    <section className='bg-white rounded-lg shadow-lg p-8'>
      <h2 className='text-3xl font-bold text-gray-900 mb-6'>Get In Touch</h2>
      <p className='text-gray-700 mb-4'>
        I&apos;m always interested in new opportunities and collaborations.
      </p>
      <div className='flex flex-col sm:flex-row gap-4 justify-center'>
        <button className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'>
          Contact Me
        </button>
        <a
          href='/yonatan-ayalon-resume-2025-10.pdf'
          download='Yonatan_Ayalon_Resume.pdf'
          className='inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-colors'
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
