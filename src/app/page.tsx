export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Yonatan Ayalon
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Full Stack Developer & Software Engineer
            </p>
            <div className="flex justify-center space-x-6">
              <a href="mailto:yonatan@example.com" className="text-blue-600 hover:text-blue-800">
                Email
              </a>
              <a href="https://www.linkedin.com/in/yonatan-ayalon-25992014/" className="text-blue-600 hover:text-blue-800">
                LinkedIn
              </a>
              <a href="https://github.com/alayonyo" className="text-blue-600 hover:text-blue-800">
                GitHub
              </a>
            </div>
          </header>

          {/* About Section */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
            <p className="text-gray-700 leading-relaxed">
              Passionate software engineer with expertise in modern web technologies. 
              Experienced in building scalable applications using React, Next.js, and various backend technologies.
              Always eager to learn new technologies and solve complex problems.
            </p>
          </section>

          {/* Skills Section */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL'].map((skill) => (
                <div key={skill} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-center text-sm font-medium">
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-900">Senior Full Stack Developer</h3>
                <p className="text-gray-600">Company Name • 2022 - Present</p>
                <p className="text-gray-700 mt-2">
                  Led development of scalable web applications using React and Node.js. 
                  Improved application performance by 40% through optimization techniques.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-900">Software Engineer</h3>
                <p className="text-gray-600">Previous Company • 2020 - 2022</p>
                <p className="text-gray-700 mt-2">
                  Developed and maintained web applications using modern JavaScript frameworks.
                  Collaborated with cross-functional teams to deliver high-quality software solutions.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <p className="text-gray-700 mb-4">
              I&apos;m always interested in new opportunities and collaborations.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Me
            </button>
          </section>
        </div>
      </div>
    </main>
  )
}