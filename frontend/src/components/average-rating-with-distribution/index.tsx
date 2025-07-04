import React from 'react';
import { FiStar } from 'react-icons/fi';
import RatingBarChart from '../rating-bar-chart';
import styles from './style.module.css';

interface AverageRatingWithDistributionProps {
  average: number;
  total: number;
  distribution: Record<number, number>;
}

const AverageRatingWithDistribution: React.FC<AverageRatingWithDistributionProps> = ({ average, total, distribution }) => {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.label}>평균 별점</div>
        <div className={styles.averageRow}>
          <span className={styles.average}>{average.toFixed(1)}</span>
          <div className={styles.stars}>
            {[1,2,3,4,5].map(star => (
              <FiStar key={star} className={`${styles.star} ${star <= Math.round(average) ? styles.filled : ''}`} />
            ))}
          </div>
        </div>
        <div className={styles.total}>{total}개의 별점</div>
      </div>
      <div className={styles.right}>
        <RatingBarChart distribution={distribution} />
      </div>
    </div>
  );
};

export default AverageRatingWithDistribution; 