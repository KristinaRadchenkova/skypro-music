import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider, useDispatch } from 'react-redux';
import { store } from '@/store/store';
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer';
import { data } from '@/components/Centerblock/data';
import { setTracks } from '@/store/playerSlice';
import { useEffect } from 'react';

function AppWrapper({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTracks(data));
  }, [dispatch]);

  return (
    <>
      <AudioPlayer />
      <Component {...pageProps} />
    </>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppWrapper Component={Component} pageProps={pageProps} />
    </Provider>
  );
}
