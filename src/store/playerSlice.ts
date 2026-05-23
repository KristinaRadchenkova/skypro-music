import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Track {
  _id: number; 
  name: string;
  author: string;
  album: string;
  duration_in_seconds?: number; 
  track_file?: string; 
  release_date?: string;
  genre?: string[];
  logo?: string | null;
  stared_user?: number[];
}

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isRepeat: boolean;
  isShuffle: boolean;
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.5,
  isRepeat: false,
  isShuffle: false,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
      state.currentTime = 0;
    },
    togglePlay: (state) => {
      if (state.currentTrack) {
        state.isPlaying = !state.isPlaying;
      }
    },
    pauseTrack: (state) => {
      state.isPlaying = false;
    },
    resumeTrack: (state) => {
      state.isPlaying = true;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    seekTo: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    toggleRepeat: (state) => {
      state.isRepeat = !state.isRepeat;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    playNext: (state) => {
      console.log('playNext — заглушка');
    },
    playPrev: (state) => {
      console.log('playPrev — заглушка');
    },
  },
});

export const {
  playTrack,
  togglePlay,
  pauseTrack,
  resumeTrack,
  setProgress,
  setDuration,
  setVolume,
  seekTo,
  toggleRepeat,
  toggleShuffle,
  playNext,
  playPrev,
} = playerSlice.actions;

export default playerSlice.reducer;