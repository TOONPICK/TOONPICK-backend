import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { WebtoonSummary } from '@models/webtoon';
import styles from './style.module.css';
import PlatformIcon from '@components/platform-icon';

const isApp = process.env.REACT_APP_PLATFORM === 'app';

interface WebtoonCardProps {
  webtoon: WebtoonSummary;
  showTags?: boolean;
  isClickable?: boolean;
  onRemove?: (webtoonId: number) => void;
  showRemoveButton?: boolean;
}

const WebtoonCard: React.FC<WebtoonCardProps> = ({ 
  webtoon, 
  showTags = true,
  isClickable = true,
  onRemove,
  showRemoveButton = false
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) {
      onRemove(webtoon.id);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const authors = getAuthors(webtoon.authors);
  const averageRating = formatAverageRating(webtoon.averageRating ?? 0);
  const truncatedTitle = truncateTitle(webtoon.title);

  const cardContent = (
    <>
      <div className={`${styles.thumbnailContainer} ${imageError ? styles.error : ''}`}>
        {!imageError && (
          <img 
            src={webtoon.thumbnailUrl} 
            alt={`${webtoon.title} 썸네일`}
            className={styles.thumbnailImage}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ opacity: imageLoaded ? 1 : 0 }}
            loading="lazy"
          />
        )}
        {imageError && (
          <div className={styles.errorPlaceholder}>
            <span>이미지 없음</span>
          </div>
        )}
        {!imageLoaded && !imageError && (
          <div className={styles.loadingPlaceholder}>
            <div className={styles.loadingSpinner}></div>
          </div>
        )}
        {showTags && (
          <div className={styles.tagsContainer}>
            {webtoon.platforms.map((platform) => (
              <PlatformIcon platform={platform} size={24} key={platform} />
            ))}
          </div>
        )}
        {showRemoveButton && onRemove && (
          <button 
            className={styles.removeButton}
            onClick={handleRemove}
            aria-label={`${webtoon.title} 제거`}
            title={`${webtoon.title} 제거`}
          >
            ×
          </button>
        )}
      </div>
      
      <div className={styles.webtoonInfo}>
        <span className={styles.webtoonTitle} title={webtoon.title}>
          {truncatedTitle}
        </span>
        <div className={styles.webtoonMeta}>
          <span className={styles.webtoonAuthor} title={authors}>
            {authors}
          </span>
          <span className={styles.webtoonRating} title={`평점: ${averageRating}`}>
            {averageRating}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <div 
      className={`${styles.webtoonCard} ${isApp ? styles.app : styles.web}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={isClickable ? "link" : "article"}
      tabIndex={isClickable ? 0 : undefined}
    >
      {isClickable ? (
        <Link 
          to={`/webtoon/${webtoon.id}`}
          aria-label={`${webtoon.title} 상세보기`}
          style={{ textDecoration: 'none' }}
          className={styles.webtoonLink}
        >
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