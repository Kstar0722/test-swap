import type { Metadata } from 'next';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import { defaultNS, fallbackLng, namespaces } from 'src/i18n';

import { sofiaProSoftFont } from '@/assets/fonts';
import { description, title } from '@/const/metadata';
import TranslationsProvider from '@/providers/TranslationProvider';
import { WalletProvider } from '@/providers/WalletProvider';
import initTranslations from '@/providers/i18n';
import { Background, Header } from '@/sections/root';

import 'react-toastify/dist/ReactToastify.css';

import '@/assets/styles/index.css';

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { resources } = await initTranslations(fallbackLng, namespaces);

  return (
    <html lang={fallbackLng} suppressHydrationWarning style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}`}
        />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}');
          `}
        </Script>
        <Script id="addressable-tracker">
          {`
            !function(w, d){
              w.__adrsbl = {
                  queue: [],
                  run: function(){
                      this.queue.push(arguments);
                  }
              };
              var s = d.createElement('script');
              s.async = true;
              s.src = 'https://tag.adrsbl.io/p.js?tid=${process.env.NEXT_PUBLIC_ADDRESSABLE_TID}';
              var b = d.getElementsByTagName('script')[0];
              b.parentNode.insertBefore(s, b);
            }(window, document);
          `}
        </Script>
      </head>
      <body className={`${sofiaProSoftFont.className} bg-pink-1`}>
        <WalletProvider>
          <TranslationsProvider namespaces={[defaultNS]} locale={'en'} resources={resources}>
            <Header />
            <main>
              <div className="h-[70px] lg:h-24" />
              <Background />
              {children}
              <ToastContainer position="bottom-right" />
            </main>
          </TranslationsProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
