export default function ProfessionalQualities() {
  const qualities = [
    'Strong Team Player',
    'High Integrity & Work Ethic',
    'Fast Learner',
    'Hands-on Mindset',
    'Excellent Communication',
    'Mentorship Skills',
    'UI/UX Enthusiasm',
    'Continuous Learning',
  ];

  return (
    <section className='bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg shadow-lg p-8 mb-8 border-l-4 border-blue-500 transition-colors'>
      <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
        Personal Skills / Character
      </h2>
      <div className='flex flex-wrap gap-3'>
        {qualities.map((quality) => (
          <span
            key={quality}
            className='bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow'
          >
            {quality}
          </span>
        ))}
      </div>
    </section>
  );
}
