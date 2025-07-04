import React from 'react';
import { Webtoon } from '@models/webtoon';
import StatusTags from './components/status-tags';
import Thumbnail from '@components/thumbnail';
import AuthorText from '@components/author-text';
import GenreTags from '@components/genre-tags';
import Description from '@components/description';
import ActionButtons from '@components/action-buttons';
import styles from './style.module.css';

interface WebtoonBasicInfoSectionProps {
  webtoon: Webtoon;
}

const WebtoonBasicInfoSection: React.FC<WebtoonBasicInfoSectionProps> = ({ webtoon }) => {

  const handleBookmarkToggle = (isBookmarked: boolean) => {
    // TODO: 북마크 토글 API 호출
    console.log('Bookmark toggled:', isBookmarked);
  };

  const handleShare = () => {
    // TODO: 공유 기능 구현
    console.log('Share webtoon');
  };

  const handleAddToCollection = () => {
    // TODO: 컬렉션에 추가 기능 구현
    console.log('Add to collection');
  };

  const handleHide = () => {
    // TODO: 숨기기 기능 구현
    console.log('Hide webtoon');
  };

  const handleReport = () => {
    // TODO: 신고 기능 구현
    console.log('Report webtoon');
  };

  return (
    <section className={styles.section}>
      <div className={styles.contentContainer}>
        <div className={styles.leftSection}>
          <Thumbnail src={webtoon.thumbnailUrl} alt={webtoon.title} />
        </div>
        <div className={styles.rightSection}>
          <div className={styles.topRow}>
            <StatusTags status={webtoon.status} isAdult={webtoon.isAdult} />
            <ActionButtons
              onBookmarkToggle={handleBookmarkToggle}
              onShare={handleShare}
              onAddToCollection={handleAddToCollection}
              onHide={handleHide}
              onReport={handleReport}
            />
          </div>
          <h1 className={styles.title}>{webtoon.title}</h1>
          <div className={styles.authorSection}>
            <AuthorText authors={webtoon.authors} />
          </div>
          <div className={styles.genreSection}>
            <GenreTags genres={webtoon.genres} />
          </div>
          <div className={styles.descriptionSection}>
            <Description text={webtoon.description || ''} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebtoonBasicInfoSection; 