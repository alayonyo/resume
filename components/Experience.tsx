import resumeData from '../data/resume.json';

export default function Experience() {
  return (
    <section className='hoverable-section bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl p-8 mb-8'>
      <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
        Professional Experience
      </h2>
      <div className='space-y-8'>
        {resumeData.experience.map((exp, index) => (
          <div
            key={index}
            className='border-l-4 border-blue-500 pl-6'
          >
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
              {exp.title}
            </h3>
            <p className='text-blue-600 dark:text-blue-400 font-medium'>
              {exp.company} • {exp.period}
            </p>
            <ul className='mt-3 space-y-1'>
              {exp.achievements.map((achievement, i) => (
                <li
                  key={i}
                  className='text-gray-600 dark:text-gray-400 flex items-start'
                >
                  <span className='text-blue-500 dark:text-blue-400 mr-2'>
                    •
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: achievement }} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
