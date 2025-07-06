import React from 'react';
import { Routes } from '@constants/routes';
import styles from './style.module.css';

interface TopMenuProps {
  navigate: (path: string) => void;
}

const TopMenu: React.FC<TopMenuProps> = ({ navigate }) => {
  return (
    <nav className={styles.menuBar}>
      <ul className={styles.menuList}>
        <li onClick={() => navigate(Routes.WEBTOON_ONGOING)} className={styles.menuItem}>연재</li>
        <li onClick={() => navigate(Routes.WEBTOON_EXPLORE)} className={styles.menuItem}>탐색</li>
        <li onClick={() => navigate(Routes.WEBTOON_NEW)} className={styles.menuItem}>신작</li>
        <li onClick={() => navigate(Routes.WEBTOON_COMPLETED)} className={styles.menuItem}>완결</li>
      </ul>
    </nav>
  );
};

export default TopMenu; 