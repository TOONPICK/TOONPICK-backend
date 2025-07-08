import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MemberProfile } from '@models/member';
import { Routes } from '@constants/routes';
import styles from './style.module.css';

interface ReadingTabProps {
  memberProfile: MemberProfile;
}

const ReadingTab: React.FC<ReadingTabProps> = ({ memberProfile }) => {
  const navigate = useNavigate();
  const readingHistory = memberProfile.readingHistory || [];
  const masterpieceWebtoons = memberProfile.masterpieceWebtoons || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '어제';
    if (diffDays < 7) return `${diffDays}일 전`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
    return `${Math.floor(diffDays / 30)}개월 전`;
  };

  const handleViewAllReading = () => {
    navigate(Routes.READING_HISTORY);
  };

  const handleViewAllMasterpiece = () => {
    navigate(Routes.MASTERPIECE_WEBTOONS);
  };

  return (
    <div className={styles.readingTab}>
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>최근 읽은 웹툰</h3>
          <button onClick={handleViewAllReading} className={styles.viewAllLink}>
            전체보기 →
          </button>
        </div>
        <div className={styles.webtoonGrid}>
          {readingHistory.length > 0 ? (
            readingHistory.slice(0, 6).map((history) => (
              <div key={history.webtoon.id} className={styles.webtoonCard}>
                <img
                  src={history.webtoon.thumbnailUrl}
                  alt={history.webtoon.title}
                  className={styles.thumbnail}
                />
                <div className={styles.webtoonInfo}>
                  <h4 className={styles.webtoonTitle}>{history.webtoon.title}</h4>
                  <p className={styles.lastReadAt}>{formatDate(history.lastReadAt)}</p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📚</span>
              <p>아직 읽은 웹툰이 없습니다</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>내 명작 웹툰</h3>
          <button onClick={handleViewAllMasterpiece} className={styles.viewAllLink}>
            전체보기 →
          </button>
        </div>
        <div className={styles.webtoonGrid}>
          {masterpieceWebtoons.length > 0 ? (
            masterpieceWebtoons.slice(0, 6).map((webtoon) => (
              <div key={webtoon.id} className={styles.webtoonCard}>
                <div className={styles.masterpieceBadge}>⭐</div>
                <img
                  src={webtoon.thumbnailUrl}
                  alt={webtoon.title}
                  className={styles.thumbnail}
                />
                <div className={styles.webtoonInfo}>
                  <h4 className={styles.webtoonTitle}>{webtoon.title}</h4>
                  <p className={styles.rating}>
                    ★ {webtoon.averageRating != null ? webtoon.averageRating.toFixed(1) : '-'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>⭐</span>
              <p>아직 명작으로 선정한 웹툰이 없습니다</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingTab; 