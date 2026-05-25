'use client';

import styles from './Centerblock.module.css';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import Filter from '../Filter/Filter';
import { data } from './data';

export default function Centerblock() {
  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.centerblock__h2}>Треки</h2>

      <Filter tracks={data} />

      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={`${styles.playlistTitle__col} ${styles.col01}`}>
            Трек
          </div>
          <div className={`${styles.playlistTitle__col} ${styles.col02}`}>
            Исполнитель
          </div>
          <div className={`${styles.playlistTitle__col} ${styles.col03}`}>
            Альбом
          </div>
          <div className={`${styles.playlistTitle__col} ${styles.col04}`}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {data.map((track) => (
            <PlaylistItem key={track._id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}
