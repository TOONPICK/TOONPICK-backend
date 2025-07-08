import React from 'react';
import styles from './style.module.css';

const SORT_OPTIONS = [
  { value: 'POPULARITY', label: '인기순' },
  { value: 'RATING', label: '별점순' },
  { value: 'LATEST', label: '최신순' },
  { value: 'UPDATE', label: '업데이트순' }
];

interface SortOptionsProps {
  sortBy: string;
  setSortBy: (v: any) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ sortBy, setSortBy }) => (
  <div className={styles.sortOptions}>
    {SORT_OPTIONS.map((option) => (
      <span
        key={option.value}
        onClick={() => setSortBy(option.value)}
        className={`${styles.option} ${sortBy === option.value ? styles.active : ''}`}
      >
        {option.label}
      </span>
    ))}
  </div>
);

export default SortOptions; 