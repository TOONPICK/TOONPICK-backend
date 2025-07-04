import React, { useEffect, useState } from 'react';
import styles from './style.module.css';

interface RatingBarChartProps {
  distribution: Record<number, number>;
  max?: number;
  labels?: (string | number)[];
  highlight?: number;
}

const DEFAULT_LABELS = [1,2,3,4,5,6,7,8,9,10];
const CONTAINER_HEIGHT = 120;
const MIN_BAR_HEIGHT = 16;
const ZERO_BAR_HEIGHT = 5;
const ZERO_BAR_OPACITY = 0.2;

const RatingBarChart: React.FC<RatingBarChartProps> = ({
  distribution,
  max,
  labels = DEFAULT_LABELS,
  highlight = 10,
}) => {
  const maxValue = max ?? Math.max(...labels.map(l => distribution[Number(l)] || 0), 1);
  const [animatedHeights, setAnimatedHeights] = useState<number[]>(labels.map(() => 0));

  useEffect(() => {
    setTimeout(() => {
      setAnimatedHeights(labels.map(label => {
        const count = distribution[Number(label)] || 0;
        if (count === 0) return ZERO_BAR_HEIGHT;
        return ((count / maxValue) * (CONTAINER_HEIGHT - MIN_BAR_HEIGHT)) + MIN_BAR_HEIGHT;
      }));
    }, 30);
  }, [distribution, labels, maxValue]);

  return (
    <div className={styles.ratingBarChart} style={{height: CONTAINER_HEIGHT}}>
      {labels.map((label, idx) => {
        const rating = Number(label);
        const count = distribution[rating] || 0;
        return (
          <div key={rating} className={styles.barCol}>
            <div className={styles.barWrapper}>
              <div
                className={styles.bar}
                style={{
                  height: `${animatedHeights[idx]}px`,
                  background: rating === highlight ? '#6c63ff' : '#b3aaff',
                  borderRadius: '8px 8px 0 0',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  transition: 'height 0.5s cubic-bezier(0.4,0,0.2,1), background 0.2s',
                  opacity: count === 0 ? ZERO_BAR_OPACITY : 1,
                }}
                title={`${rating}점: ${count}명`}
              />
              {count > 0 && <span className={styles.barCount}>{count}</span>}
            </div>
            <span className={styles.barLabel}>{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default RatingBarChart; 