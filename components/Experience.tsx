export default function Experience() {
  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Vimeo – Online Video Platform',
      period: '07/2020 – Present',
      description: '',
      achievements: [
        'Architected and maintained React (TS) + Redux infrastructure for the core application serving millions of users.',
        'Designed and implemented micro frontend architecture enabling independent team deployments and scalability.',
        'Built comprehensive performance monitoring and logging systems, improving application load times by 40%.',
        'Constructed robust E2E testing infrastructure using Selenium & WebDriverIO, integrated with BrowserStack.',
        'Led design system implementation across multiple product teams, ensuring UI consistency and developer efficiency.',
        'Collaborated cross-functionally with product, design, and backend teams to ensure performance and accessibility.',
      ],
    },
    {
      title: 'Lead Front-End Developer',
      company: 'Credifi – FinTech, Commercial Real Estate Analytics',
      period: '01/2019 – 05/2020',
      description: '',
      achievements: [
        'Sole front-end developer responsible for the UX/UI of the flagship customer application.',
        'Refactored and maintained Angular (v1 and v2+) applications in TypeScript, significantly improving performance.',
        'Directed UI/UX strategy and ensured design system consistency across views.',
      ],
    },
    {
      title: 'Front-End Team Lead',
      company: 'Herolo – Tailoring Front-End Solutions',
      period: '04/2017 – 12/2018',
      description: '',
      achievements: [
        'Guided a team of front-end engineers in developing Angular-based applications tailored to customer specifications.',
        'Managed projects end-to-end: client scoping, UX collaboration, architecture, development, and delivery.',
        'Promoted test-driven development utilizing Karma and Jasmine.',
      ],
    },
    {
      title: 'Senior Software Engineer & Scrum Master',
      company: 'Optimal+ – Electronics Analytics',
      period: '10/2015 – 03/2017',
      description: '',
      achievements: [
        'Spearheaded the Angular 2 migration and TypeScript implementation for new applications.',
        'Shared front-end expertise within the team; introduced unit testing best practices.',
        'Served as Scrum Master, effectively facilitating Agile development cycles.',
      ],
    },
    {
      title: 'Senior Software Engineer',
      company: 'Perion (Ex. Conduit) – Search Solutions',
      period: '06/2011 – 09/2015',
      description: '',
      achievements: [
        'Provided technical leadership for the SearchApps team, developing multiple high-scale web applications.',
        'Created web UIs and extensions for millions of daily users, optimizing conversion through A/B testing.',
        'Developed responsive layouts, browser extensions, and image portal experiences.',
        'Delivered internal front-end training courses on MVC4, JavaScript best practices, and scalable design patterns.',
        'Full-stack experience: .NET MVC4/5, WebAPI, MySQL/MSSQL, CDN optimization, Amazon EC2 deployment.',
      ],
    },
    {
      title: 'Front-End Developer',
      company: 'Convertonet – Online Marketing',
      period: '03/2010 – 06/2011',
      description: '',
      achievements: [
        'Maintained and enhanced Flash CMS-based portals.',
        'Delivered pixel-perfect landing pages and templates for various marketing campaigns.',
        'Advanced the use of jQuery and ensured cross-browser compatibility.',
      ],
    },
    {
      title: 'Full-Stack Developer',
      company: 'Walla! – Major Israeli Web Portal',
      period: '12/2007 – 02/2010',
      description: '',
      achievements: [
        'Developed cross-browser dynamic UI components for the new portal version.',
        'Utilized internal scripting language (TScript), PHP, and MySQL for development.',
        'Optimized database performance through indexing and refined queries.',
      ],
    },
    {
      title: 'Web Developer',
      company: 'Excelang (Ex. Octava) – Startup',
      period: '10/2006 – 10/2007',
      description: '',
      achievements: [
        'Delivered dynamic UI solutions from PSDs utilizing HTML/CSS, Photoshop, and Freehand.',
        'Engineered Ruby on Rails web applications integrated with external PHP systems.',
        'Managed company servers, implementing custom permissions and purchasing modules.',
      ],
    },
  ];

  return (
    <section className='bg-white rounded-lg shadow-lg p-8 mb-8'>
      <h2 className='text-3xl font-bold text-gray-900 mb-6'>
        Professional Experience
      </h2>
      <div className='space-y-8'>
        {experiences.map((exp, index) => (
          <div
            key={index}
            className='border-l-4 border-blue-500 pl-6'
          >
            <h3 className='text-xl font-semibold text-gray-900'>{exp.title}</h3>
            <p className='text-blue-600 font-medium'>
              {exp.company} • {exp.period}
            </p>
            <p className='text-gray-700 mt-3 leading-relaxed'>
              {exp.description}
            </p>
            <ul className='mt-3 space-y-1'>
              {exp.achievements.map((achievement, i) => (
                <li
                  key={i}
                  className='text-gray-600 text-sm flex items-start'
                >
                  <span className='text-blue-500 mr-2'>•</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
