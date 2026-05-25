export interface Track {
  id: number;
  name: string;
  author: string;
  genre: string;
  year: number;
  duration: string;
}

export type FilterType = 'author' | 'year' | 'genre';

export interface MockTrack {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: string | null;
  track_file: string;
  stared_user: number[];
}
