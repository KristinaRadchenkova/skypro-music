'use client';

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import {
  setProgress,
  setDuration,
  pauseTrack,
  playNext,
} from '@/store/playerSlice';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { currentTrack, isPlaying, volume, currentTime, isRepeat } =
    useSelector((state: RootState) => state.player);

  const prevTrackRef = useRef<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const trackSrc = currentTrack?.track_file || '';

    if (prevTrackRef.current !== trackSrc && trackSrc) {
      prevTrackRef.current = trackSrc;
      audio.pause();
      audio.src = trackSrc;
      audio.load();
      audio.volume = volume;
      audio.currentTime = currentTime;

      if (isPlaying) {
        audio.play().catch((err) => console.warn('Play error:', err));
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.warn('Play error:', err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && Math.abs(audio.currentTime - currentTime) > 0.5) {
      audio.currentTime = currentTime;
    }
  }, [currentTime]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch(setProgress(audioRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      dispatch(setDuration(audioRef.current.duration));
    }
  };

  const handleEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      dispatch(playNext());
    }
  };

  return (
    <audio
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={handleEnded}
      style={{ display: 'none' }}
      preload="auto"
    />
  );
}
