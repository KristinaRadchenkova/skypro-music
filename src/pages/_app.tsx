import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={montserrat.className}>
      <Component {...pageProps} />
    </div>
  );
}