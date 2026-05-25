import Nav from '../components/Nav/Nav';
import Centerblock from '../components/Centerblock/Centerblock';
import Sidebar from '../components/Sidebar/Sidebar';
import Bar from '../components/Bar/Bar';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function Home() {
  return (
    <Provider store={store}>
      <Head>
        <title>SkyPro Music</title>
        <meta name="description" content="Музыкальный пленэр" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
            <Nav />
            <Centerblock />
            <Sidebar />
          </main>
          <Bar />
        </div>
      </div>
    </Provider>
  );
}
