import styles from './PlaylistItem.module.css';

interface Track {
  _id: number;
  name: string;
  author: string;
  album: string;
  duration_in_seconds: number;
}

interface PlaylistItemProps {
  track: Track;
}

export default function PlaylistItem({ track }: PlaylistItemProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg className={styles.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className={styles.track__titleText}>
            <a className={styles.track__titleLink} href="">
              {track.name}
              <span className={styles.track__titleSpan}></span>
            </a>
          </div>
        </div>
        <div className={styles.track__author}>
          <a className={styles.track__authorLink} href="">
            {track.author}
          </a>
        </div>
        <div className={styles.track__album}>
          <a className={styles.track__albumLink} href="">
            {track.album}
          </a>
        </div>
        <div className={styles.track__time}>
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatDuration(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}