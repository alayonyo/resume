import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';
import ProfessionalQualities from '../components/ProfessionalQualities';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors'>
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-4xl mx-auto'>
          <Header />
          <About />
          <Skills />
          <ProfessionalQualities />
          <Experience />
          <Contact />
        </div>
      </div>
      <Footer />
    </main>
  );
}
