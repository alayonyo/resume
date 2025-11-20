export default function Header() {
  return (
    <header className='text-center mb-16'>
      <h1 className='text-5xl font-bold text-gray-900 mb-4'>Yonatan Ayalon</h1>
      <p className='text-xl text-gray-600 mb-8'>
        Full Stack Developer & Software Engineer
      </p>
      <div className='flex justify-center space-x-6'>
        <a
          href='mailto:yonatanayalon1@gmail.com
'
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
    </header>
  );
}
