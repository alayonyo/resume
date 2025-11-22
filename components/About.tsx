export default function About() {
  return (
    <section className='hoverable-section bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg shadow-lg hover:shadow-2xl p-8 mb-8 border-l-4 border-blue-500 hover:border-l-6'>
      <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
        Professional Summary
      </h2>
      <div className='space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
        <p>
          Seasoned <strong>Senior Front-End Engineer</strong> with over{' '}
          <strong>15 years of experience</strong> architecting high-performance,
          scalable web applications and micro frontend systems. Proven track
          record of designing robust UI architectures, implementing
          enterprise-scale design systems, and driving measurable improvements
          in performance, accessibility, and user experience.
        </p>
        <p>
          Expert in <strong>React</strong>, <strong>TypeScript</strong>, and
          modern frontend frameworks, with deep experience in design systems,
          component library development, experimentation platforms, and A/B
          testing infrastructure. Proven track record of implementing scalable,
          accessible solutions that improve user engagement and accelerate
          development velocity across engineering teams.
        </p>
        <p>
          Passionate about building scalable frontend infrastructure,
          translating complex system requirements into elegant user experiences,
          and leading cross-functional teams to deliver high-quality web
          applications.
        </p>
      </div>
    </section>
  );
}
