export default function Skills() {
  const skillCategories = {
    'System Design & Architecture': [
      'Micro Frontend Architecture',
      'Scalable UI Systems',
      'Web Performance Optimization',
      'Design Systems',
      'Component Libraries',
      'State Management',
      'Application Monitoring',
      'Frontend Infrastructure',
    ],
    'User Experience & Optimization': [
      'A/B Testing',
      'Experimentation Platforms',
      'Conversion Optimization',
      'User Engagement',
      'Analytics Implementation',
      'Accessibility (WCAG)',
    ],
    Frontend: [
      'JavaScript',
      'TypeScript',
      'React',
      'Angular',
      'Next.js',
      'Redux',
      'HTML/CSS',
      'Tailwind CSS',
      'Chakra UI',
      'Storybook',
    ],
    'Backend & Databases': [
      'Node.js',
      'PHP',
      'Python',
      '.NET',
      'REST APIs',
      'GraphQL',
      'SQL Databases',
      'NoSQL Databases',
    ],
    'Testing & DevOps': [
      'Jest',
      'React Testing Library',
      'E2E Testing',
      'Code Reviews',
      'Git',
      'AWS',
      'Docker',
      'Documentation',
    ],
  };

  return (
    <section className='hoverable-section bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl p-8 mb-8'>
      <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
        Professional Skills
      </h2>
      <div className='space-y-5'>
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category}>
            <h3 className='text-base font-semibold text-gray-800 dark:text-gray-200 mb-2'>
              {category}
            </h3>
            <div className='flex flex-wrap gap-2'>
              {skills.map((skill) => (
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
