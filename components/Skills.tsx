export default function Skills() {
  const skillCategories = {
    'System Design & Architecture': [
      'Micro Frontend Architecture',
      'Scalable UI Systems',
      'Performance Engineering',
      'Design Systems',
      'Component Libraries',
      'State Management',
      'Application Monitoring',
      'Frontend Infrastructure',
    ],
    'User Experience & Optimization': [
      'A/B Testing',
      'Conversion Optimization',
      'User Engagement',
      'Analytics Implementation',
      'User Journey Optimization',
      'Performance Metrics',
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
      'Responsive Design',
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
      'Unit Testing',
      'E2E Testing',
      'Git',
      'GCP',
      'AWS',
      'Docker',
      'Build Optimization',
      'Logging & Analytics',
    ],
  };

  return (
    <section className='bg-white rounded-lg shadow-lg p-8 mb-8'>
      <h2 className='text-3xl font-bold text-gray-900 mb-6'>
        Professional Skills
      </h2>
      <div className='space-y-5'>
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category}>
            <h3 className='text-base font-semibold text-gray-800 mb-2'>
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
