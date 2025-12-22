import ActionButton from './ActionButton';

export default function Contact() {
  return (
    <section className='hoverable-section bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg shadow-lg hover:shadow-2xl p-8 border-l-4 border-blue-500 hover:border-l-6'>
      <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
        Get In Touch
      </h2>
      <p className='text-gray-700 dark:text-gray-300 mb-4'>
        I&apos;m always interested in new opportunities and collaborations.
      </p>
      <div className='flex flex-col lg:flex-row gap-4 justify-center items-stretch lg:items-center'>
        <ActionButton
          href='mailto:yonatanayalon1@gmail.com'
          label='Contact Me'
          type='email'
          variant='primary'
          className='flex-shrink-0'
        />
        <ActionButton
          href='/yonatan-ayalon-resume.pdf'
          label='Download Resume - PDF'
          type='download'
          fileType='PDF'
          variant='outline'
          className='flex-shrink-0'
        />
        <ActionButton
          href='/yonatan-ayalon-resume.docx'
          label='Download Resume - DOCX'
          type='download'
          fileType='DOCX'
          variant='outline'
          className='flex-shrink-0'
        />
      </div>
    </section>
  );
}
