import resumeData from '../data/resume.json';

export default function About() {
  return (
    <section className='hoverable-section bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg shadow-lg hover:shadow-2xl p-8 mb-8 border-l-4 border-blue-500 hover:border-l-6'>
      <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
        Professional Summary
      </h2>
      <div className='space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
        {resumeData.professionalSummary.map(
          (paragraph: string, index: number) => (
            <p
              key={index}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          )
        )}
      </div>
    </section>
  );
}
