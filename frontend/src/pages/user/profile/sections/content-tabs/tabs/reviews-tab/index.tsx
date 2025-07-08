import React from 'react';
import { MemberProfile } from '@models/member';
import styles from './style.module.css';

interface ReviewsTabProps {
  memberProfile: MemberProfile;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ memberProfile }) => {
  const reviews = memberProfile.reviews || [];
  const topReviews = memberProfile.topReviews || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAverageLikes = () => {
    if (reviews.length === 0) return 0;
    return Math.round(reviews.reduce((acc, review) => acc + review.likes, 0) / reviews.length);
  };

  return (
    <div className={styles.reviewsTab}>
      <div className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{reviews.length}</div>
          <div className={styles.statLabel}>총 리뷰 수</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>
            {reviews.reduce((acc, review) => acc + review.likes, 0)}
          </div>
          <div className={styles.statLabel}>받은 공감</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>
            {getAverageLikes()}
          </div>
          <div className={styles.statLabel}>평균 공감</div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>공감 TOP3 리뷰</h3>
        <div className={styles.reviewsList}>
          {topReviews.length > 0 ? (
            topReviews.slice(0, 3).map((review, index) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.rankBadge}>#{index + 1}</div>
                <div className={styles.reviewContent}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.webtoonTitle}>웹툰 ID: {review.webtoonId}</span>
                    <span className={styles.reviewDate}>{formatDate(review.createdAt)}</span>
                  </div>
                  <p className={styles.reviewText}>{review.comment}</p>
                  <div className={styles.reviewFooter}>
                    <span className={styles.likes}>❤️ {review.likes} 공감</span>
                    <span className={styles.rating}>★ {review.rating}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>✍️</span>
              <p>아직 작성한 리뷰가 없습니다</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>최근 리뷰</h3>
        <div className={styles.reviewsList}>
          {reviews.length > 0 ? (
            reviews.slice(0, 5).map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewContent}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.webtoonTitle}>웹툰 ID: {review.webtoonId}</span>
                    <span className={styles.reviewDate}>{formatDate(review.createdAt)}</span>
                  </div>
                  <p className={styles.reviewText}>{review.comment}</p>
                  <div className={styles.reviewFooter}>
                    <span className={styles.likes}>❤️ {review.likes} 공감</span>
                    <span className={styles.rating}>★ {review.rating}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>✍️</span>
              <p>아직 작성한 리뷰가 없습니다</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsTab; 