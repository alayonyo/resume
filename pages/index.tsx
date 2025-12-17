import Head from 'next/head';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';
import ProfessionalQualities from '../components/ProfessionalQualities';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import RemoteChatWrapper from '../components/RemoteChatWrapper';

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Yonatan Ayalon - Senior Frontend Engineer | React TypeScript Expert
        </title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
      </Head>
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

        {/* Chat Widget - Microfrontend */}
        <RemoteChatWrapper
          botName='Resume Assistant'
          welcomeMessage="Hi! I'm here to help you learn more about Yonatan. Feel free to ask about his experience, skills, or download his resume!"
          position='bottom-right'
          size='medium'
          theme='light'
        />
      </main>
    </>
  );
}
