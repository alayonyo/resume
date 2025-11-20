export default function Skills() {
  const skills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL'];

  return (
    <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <div key={skill} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-center text-sm font-medium">
            {skill}
          </div>
        ))}
      </div>
    </section>
  )
}