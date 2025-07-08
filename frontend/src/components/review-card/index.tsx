import React from 'react';
import { Review } from '@models/review';
import { FiThumbsUp, FiFlag, FiStar } from 'react-icons/fi';
import styles from './style.module.css';

interface ReviewCardProps {
  review: Review;
  onLikeToggle: (reviewId: number) => void;
  showMoreMenu: number | null;
  setShowMoreMenu: (id: number | null) => void;
  handleReport: (reviewId: number) => void;
  formatDate: (dateString: string) => string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onLikeToggle,
  showMoreMenu,
  setShowMoreMenu,
  handleReport,
  formatDate,
}) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewerInfo}>
          <img 
            src={review.profilePicture} 
            alt={review.userName} 
            className={styles.reviewerAvatar}
          />
          <div className={styles.reviewerDetails}>
            <div className={styles.reviewerName}>{review.userName}</div>
            <div className={styles.reviewMeta}>
              <div className={styles.reviewRating}>
                {[1, 2, 3, 4, 5].map(star => (
                  <FiStar 
                    key={star} 
                    className={`${styles.reviewStar} ${star <= review.rating ? styles.filled : ''}`}
                  />
                ))}
              </div>
              <span className={styles.reviewDate}>{formatDate(review.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className={styles.reviewActions}>
          <button 
            className={styles.likeButton}
            onClick={() => onLikeToggle(review.id)}
          >
            <FiThumbsUp />
            <span className={styles.likeCount}>{review.likes}</span>
          </button>
          <div className={styles.moreButtonContainer}>
            <button 
              className={styles.moreButton}
              onClick={() => setShowMoreMenu(review.id)}
            >
              <FiFlag />
            </button>
            {showMoreMenu === review.id && (
              <div className={styles.moreMenu}>
                <button 
                  className={styles.menuItem}
                  onClick={() => handleReport(review.id)}
                >
                  <FiFlag />
                  신고하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {review.comment && (
        <div className={styles.reviewComment}>{review.comment}</div>
      )}
    </div>
  );
};

export default ReviewCard; 