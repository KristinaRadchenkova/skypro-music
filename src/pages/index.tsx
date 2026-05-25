'use client';

import Nav from '../components/Nav/Nav';
import Centerblock from '../components/Centerblock/Centerblock';
import Sidebar from '../components/Sidebar/Sidebar';
import Bar from '../components/Bar/Bar';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { AudioPlayerProvider } from '@/contexts/AudioPlayerContext';
import { data } from '../components/Centerblock/data'; 

export default function Home() {
  return (
    <>
      <Head>
        <title>SkyPro Music</title>
        <meta name="description" content="Музыкальный плеер" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AudioPlayerProvider tracks={data}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <main className={styles.main}>
              <Nav />
              <Centerblock />
              <Sidebar />
            </main>
            <Bar />
            <footer className="footer"></footer>
          </div>
        </div>
      </AudioPlayerProvider>
    </>
  );
}
