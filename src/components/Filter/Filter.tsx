'use client';

import { useState, useMemo } from 'react';
import styles from './Filter.module.css';

interface Track {
  _id: number;
  name: string;
  author: string;
  album: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  track_file: string;
}

interface FilterProps {
  tracks: Track[];
}

type FilterType = 'author' | 'year' | 'genre';

export default function Filter({ tracks }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);

  const authors = useMemo(() => {
    const uniqueAuthors = [...new Set(tracks.map((track) => track.author))];
    return uniqueAuthors.filter((author) => author !== '-');
  }, [tracks]);

  const years = useMemo(() => {
    const yearsList = tracks.map((track) => {
      const year = new Date(track.release_date).getFullYear();
      return year;
    });
    return [...new Set(yearsList)].sort((a, b) => b - a);
  }, [tracks]);

  const genres = useMemo(() => {
    const allGenres = tracks.flatMap((track) => track.genre);
    return [...new Set(allGenres)];
  }, [tracks]);

  const handleFilterClick = (filter: FilterType) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  const getCurrentList = () => {
    if (activeFilter === 'author') return authors;
    if (activeFilter === 'year') return years;
    if (activeFilter === 'genre') return genres;
    return [];
  };

  return (
    <div className={styles.filter}>
      <span className={styles.filter__label}>Искать по:</span>
      <div className={styles.filter__buttons}>
        <button
          className={`${styles.filter__button} ${activeFilter === 'author' ? styles.active : ''}`}
          onClick={() => handleFilterClick('author')}
        >
          исполнителю
        </button>
        <button
          className={`${styles.filter__button} ${activeFilter === 'year' ? styles.active : ''}`}
          onClick={() => handleFilterClick('year')}
        >
          году выпуска
        </button>
        <button
          className={`${styles.filter__button} ${activeFilter === 'genre' ? styles.active : ''}`}
          onClick={() => handleFilterClick('genre')}
        >
          жанру
        </button>
      </div>

      {activeFilter && (
        <ul className={styles.filter__list}>
          {getCurrentList().map((item, index) => (
            <li key={index} className={styles.filter__item}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
