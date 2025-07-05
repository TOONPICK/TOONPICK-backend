import React from 'react';
import { MemberProfile } from '@models/member';
import styles from './style.module.css';

interface ReviewsTabProps {
  memberProfile: MemberProfile;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ memberProfile }) => {
  const reviews = memberProfile.reviews || [];
  const topReviews = memberProfile.topReviews || [];

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
            {reviews.length > 0 ? Math.round(reviews.reduce((acc, review) => acc + review.likes, 0) / reviews.length) : 0}
          </div>
          <div className={styles.statLabel}>평균 공감</div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>공감 TOP3 리뷰</h3>
        <div className={styles.reviewsList}>
          {topReviews.slice(0, 3).map((review, index) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.rankBadge}>#{index + 1}</div>
              <div className={styles.reviewContent}>
                <div className={styles.reviewHeader}>
                  <span className={styles.webtoonTitle}>{review.webtoonId}</span>
                  <span className={styles.reviewDate}>{review.createdAt}</span>
                </div>
                <p className={styles.reviewText}>{review.comment}</p>
                <div className={styles.reviewFooter}>
                  <span className={styles.likes}>❤️ {review.likes} 공감</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>최근 리뷰</h3>
        <div className={styles.reviewsList}>
          {reviews.slice(0, 5).map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewContent}>
                <div className={styles.reviewHeader}>
                  <span className={styles.webtoonTitle}>{review.webtoonId}</span>
                  <span className={styles.reviewDate}>{review.createdAt}</span>
                </div>
                <p className={styles.reviewText}>{review.comment}</p>
                <div className={styles.reviewFooter}>
                  <span className={styles.likes}>❤️ {review.likes} 공감</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsTab; 