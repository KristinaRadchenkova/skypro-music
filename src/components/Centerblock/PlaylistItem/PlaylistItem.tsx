'use client';

import styles from './PlaylistItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { playTrack, togglePlay } from '@/store/playerSlice';
import { Track } from '@/store/playerSlice';

interface PlaylistItemProps {
  track: Track;
}

export default function PlaylistItem({ track }: PlaylistItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentTrack, isPlaying } = useSelector((state: RootState) => state.player);

  const isActive = currentTrack?._id === track._id;
  const isPulsing = isActive && isPlaying;

  const handleClick = () => {
    if (isActive) {
      dispatch(togglePlay());
    } else {
      dispatch(playTrack(track));
    }
  };

  const formatTime = (seconds?: number) => {
    if (!seconds) return '3:45';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      className={`${styles.playlist__item} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
    >
      <div className={styles.playlist__track}>
        <div className={`${styles.playlist__dot} ${isPulsing ? styles.pulse : ''}`} />
        <div className={styles.track__icon_wrapper}>
          <svg className={styles.track__icon}>
            <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
          </svg>
        </div>
        <div className={styles.playlist__title}>{track.name}</div>
      </div>
      <div className={styles.playlist__author}>{track.author}</div>
      <div className={styles.playlist__album}>{track.album}</div>
      <div className={styles.playlist__time}>
        <svg className={styles.time__like}>
          <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
        </svg>
        {formatTime(track.duration_in_seconds)}
      </div>
    </div>
  );
}