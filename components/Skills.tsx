export default function Skills() {
  const skillCategories = {
    'Programming Languages': [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'Swift',
    ],
    Frontend: ['React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux'],
    Backend: ['Node.js', 'Express', 'Django', 'RESTful APIs', 'GraphQL'],
    Databases: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
    'Cloud & DevOps': ['AWS', 'Docker', 'CI/CD', 'Git', 'Linux'],
    Mobile: ['React Native', 'iOS Development'],
  };

  return (
    <section className='bg-white rounded-lg shadow-lg p-8 mb-8'>
      <h2 className='text-3xl font-bold text-gray-900 mb-6'>
        Technical Skills
      </h2>
      <div className='space-y-6'>
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category}>
            <h3 className='text-lg font-semibold text-gray-800 mb-3'>
              {category}
            </h3>
            <div className='flex flex-wrap gap-2'>
              {skills.map((skill) => (
                <span
                  key={skill}
                  className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'
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
