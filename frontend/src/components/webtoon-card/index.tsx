import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Webtoon } from '@models/webtoon';
import styles from './style.module.css';
import PlatformIcon from '@components/platform-icon';

const isApp = process.env.REACT_APP_PLATFORM === 'app';

interface WebtoonCardProps {
  webtoon: Webtoon;
  showTags?: boolean;
  isClickable?: boolean;
}

const WebtoonCard: React.FC<WebtoonCardProps> = ({ 
  webtoon, 
  showTags = true,
  isClickable = true
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getAuthors = (authors: { name: string }[] | undefined): string => {
    return authors?.map(author => author.name).join(', ') || '작가 없음';
  };

  const formatAverageRating = (rating: number | undefined): string => {
    return rating ? rating.toFixed(1) : '0';
  };

  const truncateTitle = (title: string): string => {
    return title.length > 30 ? `${title.substring(0, 30)}...` : title;
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const authors = getAuthors(webtoon.authors);
  const averageRating = formatAverageRating(webtoon.averageRating);
  const truncatedTitle = truncateTitle(webtoon.title);

  const cardContent = (
    <>
      <div className={`${styles.thumbnailContainer} ${imageError ? styles.error : ''}`}>
        {!imageError && (
          <img 
            src={webtoon.thumbnailUrl} 
            alt={webtoon.title} 
            className={styles.thumbnailImage}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
        )}
        {imageError && (
          <div className={styles.errorPlaceholder}>
            이미지 없음
          </div>
        )}
        {showTags && (
          <div className={styles.tagsContainer}>
            <PlatformIcon platform={webtoon.platform} size={24} />
          </div>
        )}
      </div>
      
      <div className={styles.webtoonInfo}>
        <span className={styles.webtoonTitle}>{truncatedTitle}</span>
        <div className={styles.webtoonMeta}>
          <span className={styles.webtoonAuthor}>{authors}</span>
          <span className={styles.webtoonRating}>{averageRating}</span>
        </div>
      </div>
    </>
  );

  return (
    <div className={`${styles.webtoonCard} ${isApp ? styles.app : styles.web}`}>
      {isClickable ? (
        <Link to={`/webtoon/${webtoon.id}`}>
          {cardContent}
        </Link>
      ) : (
        <div className={styles.nonClickable}>
          {cardContent}
        </div>
      )}
    </div>
  );
};

export default WebtoonCard; 