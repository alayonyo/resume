import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {/* Favicon */}
        <link
          rel='icon'
          href='/favicon.ico'
          sizes='any'
        />
        <link
          rel='icon'
          href='/favicon.svg'
          type='image/svg+xml'
        />
        <link
          rel='apple-touch-icon'
          href='/favicon.ico'
        />

        {/* SEO Meta Tags */}
        <meta
          name='description'
          content='Yonatan Ayalon | Senior Front-End Engineer architecting scalable React applications & A/B testing platforms at Vimeo. 15+ years mastering TypeScript, design systems, and high-performance web experiences that serve millions.'
        />
        <meta
          name='keywords'
          content='Senior Frontend Engineer, React Architecture Expert, TypeScript Specialist, Vimeo Engineering, A/B Testing Platforms, Design Systems Leadership, Micro Frontend Architecture, JavaScript Performance, Component Libraries, Frontend Team Lead, Staff Engineer Experience, Scalable Web Applications, Frontend Architecture, Engineering Leadership'
        />
        <meta
          name='author'
          content='Yonatan Ayalon'
        />
        <meta
          name='robots'
          content='index, follow'
        />
        <meta
          httpEquiv='Content-Security-Policy'
          content='upgrade-insecure-requests'
        />
        <link
          rel='canonical'
          href='https://yonatan-ayalon.com/'
        />

        {/* Open Graph / Facebook */}
        <meta
          property='og:type'
          content='website'
        />
        <meta
          property='og:title'
          content='Yonatan Ayalon | Senior Frontend Engineer & Architecture Expert at Vimeo'
        />
        <meta
          property='og:description'
          content='Senior Frontend Engineer leading architecture initiatives at Vimeo. Expert in building scalable React applications, A/B testing platforms, and design systems that serve millions of users worldwide.'
        />
        <meta
          property='og:url'
          content='https://yonatan-ayalon.com/'
        />
        <meta
          property='og:site_name'
          content='Yonatan Ayalon - Frontend Engineer'
        />
        <meta
          property='og:image'
          content='https://yonatan-ayalon.com/og-image.png'
        />
        <meta
          property='og:image:width'
          content='1200'
        />
        <meta
          property='og:image:height'
          content='630'
        />
        <meta
          property='og:image:alt'
          content='Yonatan Ayalon - Senior Frontend Engineer'
        />

        {/* Twitter */}
        <meta
          name='twitter:card'
          content='summary_large_image'
        />
        <meta
          name='twitter:title'
          content='Yonatan Ayalon | Senior Frontend Engineer & Architecture Expert'
        />
        <meta
          name='twitter:description'
          content='Senior Frontend Engineer at Vimeo specializing in React architecture, TypeScript systems, and A/B testing platforms. Building scalable solutions that impact millions of users worldwide.'
        />
        <meta
          name='twitter:image'
          content='https://yonatan-ayalon.com/og-image.png'
        />
        <meta
          name='twitter:image:alt'
          content='Yonatan Ayalon - Senior Frontend Engineer'
        />

        {/* Additional SEO */}
        <meta
          name='theme-color'
          content='#2563eb'
        />
        <meta
          name='msapplication-TileColor'
          content='#2563eb'
        />
        <meta
          name='application-name'
          content='Yonatan Ayalon Resume'
        />

        {/* Structured Data - JSON-LD */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Yonatan Ayalon',
              jobTitle: 'Senior Front-End Software Engineer',
              description:
                'Senior Front-End Software Engineer with 15+ years of experience in client architecture, micro frontend systems, and experimentation platforms',
              url: 'https://yonatan-ayalon.com',
              email: 'yonatanayalon1@gmail.com',
              sameAs: [
                'https://www.linkedin.com/in/yonatan-ayalon-25992014/',
                'https://github.com/alayonyo',
              ],
              knowsAbout: [
                'React',
                'TypeScript',
                'JavaScript',
                'Frontend Architecture',
                'Micro Frontend',
                'Design Systems',
                'A/B Testing',
                'Web Performance Optimization',
                'Component Libraries',
                'Experimentation Platforms',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Vimeo',
                description: 'Online Video Platform',
              },
              alumniOf: [
                {
                  '@type': 'Organization',
                  name: 'Credifi',
                },
                {
                  '@type': 'Organization',
                  name: 'Herolo',
                },
                {
                  '@type': 'Organization',
                  name: 'Optimal+',
                },
                {
                  '@type': 'Organization',
                  name: 'Perion',
                },
              ],
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
