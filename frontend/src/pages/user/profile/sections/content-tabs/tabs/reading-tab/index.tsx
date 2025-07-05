import React from 'react';
import { MemberProfile } from '@models/member';
import { Routes } from '@constants/routes';
import styles from './style.module.css';

interface ReadingTabProps {
  memberProfile: MemberProfile;
}

const ReadingTab: React.FC<ReadingTabProps> = ({ memberProfile }) => {
  const readingHistory = memberProfile.readingHistory || [];
  const masterpieceWebtoons = memberProfile.masterpieceWebtoons || [];

  return (
    <div className={styles.readingTab}>
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>최근 읽은 웹툰</h3>
          <a href={Routes.READING_HISTORY} className={styles.viewAllLink}>
            전체보기 →
          </a>
        </div>
        <div className={styles.webtoonGrid}>
          {readingHistory.slice(0, 6).map((history: any) => (
            <div key={history.webtoon.id} className={styles.webtoonCard}>
              <img
                src={history.webtoon.thumbnailUrl}
                alt={history.webtoon.title}
                className={styles.thumbnail}
              />
              <div className={styles.webtoonInfo}>
                <h4 className={styles.webtoonTitle}>{history.webtoon.title}</h4>
                <p className={styles.lastReadAt}>{history.lastReadAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>내 명작 웹툰</h3>
          <a href={Routes.MASTERPIECE_WEBTOONS} className={styles.viewAllLink}>
            전체보기 →
          </a>
        </div>
        <div className={styles.webtoonGrid}>
          {masterpieceWebtoons.slice(0, 6).map((webtoon: any) => (
            <div key={webtoon.id} className={styles.webtoonCard}>
              <div className={styles.masterpieceBadge}>⭐</div>
              <img
                src={webtoon.thumbnailUrl}
                alt={webtoon.title}
                className={styles.thumbnail}
              />
              <div className={styles.webtoonInfo}>
                <h4 className={styles.webtoonTitle}>{webtoon.title}</h4>
                <p className={styles.rating}>★ {webtoon.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingTab; 