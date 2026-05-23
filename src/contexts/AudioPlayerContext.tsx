'use client';

import { createContext, useContext, useRef, useState, ReactNode } from 'react';

interface Track {
  _id: number;
  name: string;
  author: string;
  album: string;
  duration_in_seconds: number;
  track_file: string;
}

interface AudioPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isRepeat: boolean;
  isShuffle: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  formatTime: (seconds: number) => string;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined,
);

export function AudioPlayerProvider({
  children,
  tracks,
}: {
  children: ReactNode;
  tracks: Track[];
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.5);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playTrack = (track: Track) => {
    if (audioRef.current) {
      if (currentTrack?._id === track._id) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.src = track.track_file;
        audioRef.current.load();
        audioRef.current.play();
        setCurrentTrack(track);
        setIsPlaying(true);
      }
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getRandomTrack = () => {
    if (!tracks.length) return null;
    const randomIndex = Math.floor(Math.random() * tracks.length);
    return tracks[randomIndex];
  };

  const getNextTrack = () => {
    if (!currentTrack || !tracks.length) return null;

    if (isShuffle) {
      return getRandomTrack();
    }

    const currentIndex = tracks.findIndex((t) => t._id === currentTrack._id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    return tracks[nextIndex];
  };

  const getPrevTrack = () => {
    if (!currentTrack || !tracks.length) return null;

    if (isShuffle) {
      return getRandomTrack();
    }

    const currentIndex = tracks.findIndex((t) => t._id === currentTrack._id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    return tracks[prevIndex];
  };

  const playNext = () => {
    const nextTrack = getNextTrack();
    if (nextTrack) {
      playTrack(nextTrack);
    }
  };

  const playPrev = () => {
    const prevTrack = getPrevTrack();
    if (prevTrack) {
      playTrack(prevTrack);
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolumeState(newVolume);
    }
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
    if (audioRef.current) {
      audioRef.current.loop = !isRepeat;
    }
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      playNext();
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isRepeat,
        isShuffle,
        playTrack,
        togglePlay,
        playNext,
        playPrev,
        seekTo,
        setVolume,
        toggleRepeat,
        toggleShuffle,
        formatTime,
      }}
    >
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error(
      'useAudioPlayer must be used within an AudioPlayerProvider',
    );
  }
  return context;
}
