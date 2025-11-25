import resumeData from '../data/resume.json';

export default function Skills() {
  return (
    <section className='hoverable-section bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl p-8 mb-8'>
      <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
        Professional Skills
      </h2>
      <div className='space-y-5'>
        {Object.entries(resumeData.skills).map(([category, skills]) => (
          <div key={category}>
            <h3 className='text-base font-semibold text-gray-800 dark:text-gray-200 mb-2'>
              {category}
            </h3>
            <div className='flex flex-wrap gap-2'>
              {skills.map((skill: string) => (
                <span
                  key={skill}
                  className='bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-600'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
