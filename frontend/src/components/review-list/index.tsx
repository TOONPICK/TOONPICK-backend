import React from 'react';
import { Review } from '@models/review';
import ReviewCard from '@components/review-card';
import styles from './style.module.css';

interface ReviewListProps {
  reviews: Review[];
  isLoading: boolean;
  sortBy: 'latest' | 'popular';
  onSortChange: (sort: 'latest' | 'popular') => void;
  onLikeToggle: (reviewId: number) => void;
  showMoreMenu: number | null;
  setShowMoreMenu: (id: number | null) => void;
  handleReport: (reviewId: number) => void;
  formatDate: (dateString: string) => string;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  isLoading,
  sortBy,
  onSortChange,
  onLikeToggle,
  showMoreMenu,
  setShowMoreMenu,
  handleReport,
  formatDate,
}) => {
  return (
    <div className={styles.reviewsSection}>
      <div className={styles.reviewsHeader}>
        <h3 className={styles.reviewsTitle}>사용자 리뷰</h3>
        <div className={styles.sortOptions}>
          <button 
            className={`${styles.sortButton} ${sortBy === 'latest' ? styles.active : ''}`}
            onClick={() => onSortChange('latest')}
          >
            최신순
          </button>
          <button 
            className={`${styles.sortButton} ${sortBy === 'popular' ? styles.active : ''}`}
            onClick={() => onSortChange('popular')}
          >
            인기순
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner} />
          <p>리뷰를 불러오는 중...</p>
        </div>
      ) : reviews.length > 0 ? (
        <div className={styles.reviewsList}>
          {reviews.map(review => (
            <ReviewCard
              key={review.id}
              review={review}
              onLikeToggle={onLikeToggle}
              showMoreMenu={showMoreMenu}
              setShowMoreMenu={setShowMoreMenu}
              handleReport={handleReport}
              formatDate={formatDate}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>💬</div>
          <p>아직 리뷰가 없습니다</p>
          <span>첫 번째 리뷰를 남겨보세요!</span>
        </div>
      )}
    </div>
  );
};

export default ReviewList; 