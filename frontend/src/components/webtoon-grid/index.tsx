import React from 'react';
import { Webtoon } from '@models/webtoon';
import WebtoonCard from '@components/webtoon-card';
import styles from './style.module.css';

const isApp = process.env.REACT_APP_PLATFORM === 'app';

interface WebtoonGridProps {
  webtoons: Webtoon[];
  lastWebtoonRef?: React.RefObject<HTMLDivElement>;
  rowLimit?: number;
  onWebtoonClick?: (webtoonId: number) => void;
  showRemoveButton?: boolean;
  onRemoveWebtoon?: (webtoonId: number) => void | Promise<void>;
}

const WebtoonGrid: React.FC<WebtoonGridProps> = ({ 
  webtoons, 
  lastWebtoonRef, 
  rowLimit,
  onWebtoonClick,
  showRemoveButton = false,
  onRemoveWebtoon
}) => {
  const itemsPerRow = 5;
  const maxItems = rowLimit ? rowLimit * itemsPerRow : webtoons.length;
  const displayWebtoons = webtoons.slice(0, maxItems);

  const handleWebtoonClick = (webtoonId: number) => {
    if (onWebtoonClick) {
      onWebtoonClick(webtoonId);
    }
  };

  const handleRemoveWebtoon = async (webtoonId: number) => {
    if (onRemoveWebtoon) {
      await onRemoveWebtoon(webtoonId);
    }
  };

  return (
    <div className={`${styles.grid} ${isApp ? styles.app : styles.web}`}>
      {displayWebtoons.map((webtoon, index) => (
        <div
          className={styles.gridItem}
          key={webtoon.id || index}
          ref={index === displayWebtoons.length - 1 ? lastWebtoonRef : null} 
        >
          <WebtoonCard 
            webtoon={webtoon}
            onClick={handleWebtoonClick}
            showRemoveButton={showRemoveButton}
            onRemove={handleRemoveWebtoon}
          />
        </div>
      ))}
    </div>
  );
};

export default WebtoonGrid;
