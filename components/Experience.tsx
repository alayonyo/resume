export default function Experience() {
  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Vimeo – Online Video Platform',
      period: '07/2020 – Present',
      description: '',
      achievements: [
        'Architected and maintained <strong>React (TypeScript) + Redux</strong> infrastructure for the core application serving <strong>millions of users</strong>.',
        'Designed and implemented <strong>micro frontend architecture</strong> enabling independent team deployments and scalability.',
        'Built comprehensive <strong>performance monitoring</strong> and logging systems, improving application load times by <strong>40%</strong>.',
        'Led <strong>A/B testing initiatives</strong> and conversion optimization strategies, driving measurable improvements in user engagement and retention.',
        'Constructed robust <strong>E2E testing infrastructure</strong> using Selenium & WebDriverIO, integrated with BrowserStack.',
        'Led <strong>design system implementation</strong> across multiple product teams, ensuring UI consistency and developer efficiency.',
        'Collaborated cross-functionally with product, design, and backend teams to ensure <strong>performance and accessibility</strong>.',
      ],
    },
    {
      title: 'Lead Front-End Developer',
      company: 'Credifi – FinTech, Commercial Real Estate Analytics',
      period: '01/2019 – 05/2020',
      description: '',
      achievements: [
        'Sole <strong>front-end developer</strong> responsible for the UX/UI of the flagship <strong>FinTech customer application</strong>.',
        'Refactored and maintained <strong>Angular (v1 and v2+)</strong> applications in <strong>TypeScript</strong>, significantly improving performance.',
        'Directed UI/UX strategy and ensured <strong>design system consistency</strong> across views.',
      ],
    },
    {
      title: 'Front-End Team Lead',
      company: 'Herolo – Tailoring Front-End Solutions',
      period: '04/2017 – 12/2018',
      description: '',
      achievements: [
        'Guided a team of <strong>front-end engineers</strong> in developing <strong>Angular-based applications</strong> tailored to customer specifications.',
        'Managed projects <strong>end-to-end</strong>: client scoping, UX collaboration, architecture, development, and delivery.',
        'Promoted <strong>test-driven development</strong> utilizing Karma and Jasmine.',
      ],
    },
    {
      title: 'Senior Software Engineer & Scrum Master',
      company: 'Optimal+ – Electronics Analytics',
      period: '10/2015 – 03/2017',
      description: '',
      achievements: [
        'Spearheaded the <strong>Angular 2 migration</strong> and <strong>TypeScript implementation</strong> for new applications.',
        'Shared <strong>front-end expertise</strong> within the team; introduced <strong>unit testing best practices</strong>.',
        'Served as <strong>Scrum Master</strong>, effectively facilitating <strong>Agile development cycles</strong>.',
      ],
    },
    {
      title: 'Senior Software Engineer',
      company: 'Perion (Ex. Conduit) – Search Solutions',
      period: '06/2011 – 09/2015',
      description: '',
      achievements: [
        'Provided <strong>technical leadership</strong> for the SearchApps team, developing multiple <strong>high-scale web applications</strong>.',
        'Created web UIs and extensions for <strong>millions of daily users</strong>, implementing <strong>A/B testing frameworks</strong> that significantly improved conversion rates and user engagement.',
        'Developed <strong>responsive layouts</strong>, browser extensions, and image portal experiences focused on <strong>user experience optimization</strong>.',
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
    <section className='hoverable-section bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl p-8 mb-8'>
      <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
        Professional Experience
      </h2>
      <div className='space-y-8'>
        {experiences.map((exp, index) => (
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
            <p className='text-gray-600 dark:text-gray-400 font-medium'>
              {exp.period}
            </p>
            <p className='text-gray-700 dark:text-gray-300 mt-3 leading-relaxed'>
              {exp.description}
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
