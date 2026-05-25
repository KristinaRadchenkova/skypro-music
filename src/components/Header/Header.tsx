'use client';

import { useState } from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <button
          className={styles.header__menuBtn}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Меню"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
        <Image
          src="/img/logo.png"
          alt="logo"
          width={100}
          height={30}
          priority
        />

        {isMenuOpen && (
          <nav className={styles.header__menu}>
            <ul>
              <li>Главное</li>
              <li>Мои треки</li>
              <li>Выйти</li>
            </ul>
          </nav>
        )}
      </div>

      <div className={styles.header__search}>
        <span>🔍</span>
        <input type="text" placeholder="Поиск" />
      </div>
    </header>
  );
};
