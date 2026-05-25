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
  tracks: Track[];
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.5,
  isRepeat: false,
  isShuffle: false,
  tracks: [],
};

const getRandomTrack = (tracks: Track[], currentTrack: Track | null) => {
  const availableTracks = tracks.filter(
    (track) => track._id !== currentTrack?._id,
  );
  if (availableTracks.length === 0) return tracks[0];
  const randomIndex = Math.floor(Math.random() * availableTracks.length);
  return availableTracks[randomIndex];
};

const getNextTrack = (
  tracks: Track[],
  currentTrack: Track | null,
  isShuffle: boolean,
) => {
  if (!currentTrack || tracks.length === 0) return null;

  if (isShuffle) {
    return getRandomTrack(tracks, currentTrack);
  }

  const currentIndex = tracks.findIndex((t) => t._id === currentTrack._id);
  const nextIndex = (currentIndex + 1) % tracks.length;
  return tracks[nextIndex];
};

const getPrevTrack = (
  tracks: Track[],
  currentTrack: Track | null,
  isShuffle: boolean,
) => {
  if (!currentTrack || tracks.length === 0) return null;

  if (isShuffle) {
    return getRandomTrack(tracks, currentTrack);
  }

  const currentIndex = tracks.findIndex((t) => t._id === currentTrack._id);
  const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  return tracks[prevIndex];
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setTracks: (state, action: PayloadAction<Track[]>) => {
      state.tracks = action.payload;
    },
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
      if (state.currentTrack && state.tracks.length > 0) {
        const nextTrack = getNextTrack(
          state.tracks,
          state.currentTrack,
          state.isShuffle,
        );
        if (nextTrack) {
          state.currentTrack = nextTrack;
          state.isPlaying = true;
          state.currentTime = 0;
        }
      }
    },
    playPrev: (state) => {
      if (state.currentTrack && state.tracks.length > 0) {
        const prevTrack = getPrevTrack(
          state.tracks,
          state.currentTrack,
          state.isShuffle,
        );
        if (prevTrack) {
          state.currentTrack = prevTrack;
          state.isPlaying = true;
          state.currentTime = 0;
        }
      }
    },
  },
});

export const {
  setTracks,
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
