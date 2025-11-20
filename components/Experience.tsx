export default function Experience() {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Company Name",
      period: "2022 - Present",
      description: "Led development of scalable web applications using React and Node.js. Improved application performance by 40% through optimization techniques."
    },
    {
      title: "Software Engineer",
      company: "Previous Company",
      period: "2020 - 2022",
      description: "Developed and maintained web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality software solutions."
    }
  ];

  return (
    <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
            <p className="text-gray-600">{exp.company} • {exp.period}</p>
            <p className="text-gray-700 mt-2">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}