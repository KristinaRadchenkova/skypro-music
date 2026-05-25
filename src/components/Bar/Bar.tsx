'use client';

import styles from './Bar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import {
  togglePlay,
  seekTo,
  setVolume,
  playNext,
  playPrev,
  toggleRepeat,
  toggleShuffle,
} from '@/store/playerSlice';

export default function Bar() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isRepeat,
    isShuffle,
  } = useSelector((state: RootState) => state.player);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const time = (value / 100) * duration;
    dispatch(seekTo(time));
    const audio = document.querySelector('audio');
    if (audio) audio.currentTime = time;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    dispatch(setVolume(value));
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!currentTrack) {
    return null;
  }

  return (
    <div className={styles.bar}>
      <div className={styles.bar__content}>
        <div className={styles.bar__playerProgress}>
          <input
            type="range"
            className={styles.progressLine}
            value={progressPercent}
            onChange={handleProgressChange}
            min="0"
            max="100"
            step="0.1"
          />
        </div>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div
                className={`${styles.player__btnPrev} ${styles.btn}`}
                onClick={() => dispatch(playPrev())}
              >
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={`${styles.player__btnPlay} ${styles.btn}`}
                onClick={() => dispatch(togglePlay())}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={`/img/icon/sprite.svg#${isPlaying ? 'icon-pause' : 'icon-play'}`}
                  ></use>
                </svg>
              </div>
              <div
                className={`${styles.player__btnNext} ${styles.btn}`}
                onClick={() => dispatch(playNext())}
              >
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={`${styles.player__btnRepeat} ${styles.btn} ${isRepeat ? styles.active : ''}`}
                onClick={() => dispatch(toggleRepeat())}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={`${styles.player__btnShuffle} ${styles.btn} ${isShuffle ? styles.active : ''}`}
                onClick={() => dispatch(toggleShuffle())}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <span className={styles.trackPlay__authorLink}>
                    {currentTrack?.name || 'Не выбрано'}
                  </span>
                </div>
                <div className={styles.trackPlay__album}>
                  <span className={styles.trackPlay__albumLink}>
                    {currentTrack?.author || '—'}
                  </span>
                </div>
              </div>

              <div className={styles.trackPlay__likeDis}>
                <div className={`${styles.trackPlay__like} ${styles.btnIcon}`}>
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={`${styles.trackPlay__dislike} ${styles.btnIcon}`}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={styles.volume__progress}>
                <input
                  className={styles.volume__progressLine}
                  type="range"
                  name="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
