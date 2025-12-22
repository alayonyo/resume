interface ActionButtonProps {
  href: string;
  label: string;
  type?: 'download' | 'email';
  fileType?: 'PDF' | 'DOCX';
  variant?: 'primary' | 'outline';
  className?: string;
}

export default function ActionButton({
  href,
  label,
  type = 'download',
  fileType,
  variant = 'primary',
  className = '',
}: ActionButtonProps) {
  const isPDF = fileType === 'PDF';
  const isEmail = type === 'email';
  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-colors';

  const variantStyles = {
    primary: isPDF
      ? 'border-2 border-transparent bg-blue-700 dark:bg-blue-600 text-white hover:bg-blue-800 dark:hover:bg-blue-700 shadow-lg hover:shadow-xl'
      : isEmail
      ? 'border-2 border-transparent bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
      : 'border-2 border-transparent bg-green-700 dark:bg-green-700 text-white hover:bg-green-800 dark:hover:bg-green-800 shadow-lg hover:shadow-xl',
    outline: isPDF
      ? 'border-2 border-blue-600 dark:border-white text-blue-600 dark:text-white hover:bg-blue-600 dark:hover:bg-white hover:text-white dark:hover:text-gray-900'
      : 'border-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-600 dark:hover:bg-green-400 hover:text-white dark:hover:text-gray-900',
  };

  const downloadAttr =
    type === 'download' && fileType
      ? `Yonatan-Ayalon-Resume.${fileType.toLowerCase()}`
      : undefined;

  return (
    <a
      href={href}
      download={downloadAttr}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {isEmail ? (
        <svg
          className='w-5 h-5 mr-2'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
        </svg>
      ) : (
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
      )}
      {label}
    </a>
  );
}
