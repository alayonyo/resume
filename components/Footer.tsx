export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white py-8 mt-16'>
      <div className='container mx-auto px-4 text-center'>
        <p className='text-gray-400'>
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
    </footer>
  );
}
