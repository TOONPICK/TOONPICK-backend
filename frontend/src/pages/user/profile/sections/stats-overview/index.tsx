import React from 'react';
import { MemberProfile } from '@models/member';
import styles from './style.module.css';

interface StatsOverviewProps {
  memberProfile: MemberProfile;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ memberProfile }) => {
  const stats = [
    {
      label: '읽은 웹툰',
      value: memberProfile.readWebtoons,
      icon: '📚',
      color: '#667eea'
    },
    {
      label: '작성한 리뷰',
      value: memberProfile.reviewedWebtoons,
      icon: '✍️',
      color: '#764ba2'
    },
    {
      label: '컬렉션',
      value: memberProfile.collections,
      icon: '📁',
      color: '#f093fb'
    },
    {
      label: '받은 공감',
      value: memberProfile.reviews?.reduce((acc, review) => acc + review.likes, 0) || 0,
      icon: '❤️',
      color: '#ff6b6b'
    }
  ];

  return (
    <div className={styles.statsOverview}>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: stat.color }}>
              <span>{stat.icon}</span>
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stat.value.toLocaleString()}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview; 