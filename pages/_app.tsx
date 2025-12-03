import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Yonatan Resume</title>
        <meta
          name='description'
          content='Professional resume website built with Next.js'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>

      {/* Google Analytics */}
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-F5DRLQZC9Z'
        strategy='afterInteractive'
      />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-F5DRLQZC9Z', {
            cookie_flags: 'SameSite=None;Secure',
            anonymize_ip: true,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>

      <div className='font-sans'>
        <Component {...pageProps} />
      </div>
    </>
  );
}
