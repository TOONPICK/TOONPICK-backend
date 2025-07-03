import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Webtoon } from '@models/webtoon';
import StatusTags from './components/status-tags';
import styles from './style.module.css';
import { FiMoreVertical, FiBookmark, FiAlertCircle, FiShare2, FiPlus, FiEyeOff, FiChevronDown } from 'react-icons/fi';

interface WebtoonBasicInfoSectionProps {
  webtoon: Webtoon;
}

const Thumbnail: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className={styles.thumbnailContainer}>
    <img src={src} alt={alt} className={styles.thumbnail} />
  </div>
);

const AuthorText: React.FC<{ authors: Webtoon['authors'] }> = ({ authors }) => {
  const authorsByRole = authors.reduce((acc, author) => {
    if (!acc[author.role]) acc[author.role] = [];
    acc[author.role].push(author.name);
    return acc;
  }, {} as Record<string, string[]>);
  return (
    <div className={styles.authors}>
      {Object.entries(authorsByRole)
        .map(([role, names]) => `${role} : ${names.join(', ')}`)
        .join(' | ')}
    </div>
  );
};

const GenreTags: React.FC<{ genres: Webtoon['genres'] }> = ({ genres }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={styles.genresContainer}>
      <div className={`${styles.genreTags} ${expanded ? styles.expanded : ''}`}>
        {genres.map(genre => (
          <span key={genre.id} className={styles.genreTag}>{genre.name}</span>
        ))}
      </div>
      {genres.length > 4 && (
        <button className={styles.expandButton} onClick={() => setExpanded(e => !e)}>
          <FiChevronDown />
        </button>
      )}
    </div>
  );
};

const Description: React.FC<{ text: string }> = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={styles.descriptionContainer}>
      <p className={`${styles.descriptionText} ${expanded ? styles.expanded : ''}`}>{text}</p>
      <button className={styles.expandButton} onClick={() => setExpanded(e => !e)}>
        <FiChevronDown />
      </button>
    </div>
  );
};

const ActionButtons: React.FC = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  return (
    <div className={styles.actionButtons}>
      <button className={`${styles.bookmarkButton} ${isBookmarked ? styles.bookmarked : ''}`} onClick={() => setIsBookmarked(b => !b)}>
        <FiBookmark />관심
      </button>
      <div className={styles.moreButtonContainer}>
        <button className={styles.moreButton} onClick={() => setIsMoreMenuOpen(o => !o)}>
          <FiMoreVertical />
        </button>
        {isMoreMenuOpen && (
          <div className={styles.moreMenu}>
            <button className={styles.menuItem}><FiShare2 />작품 공유</button>
            <button className={styles.menuItem}><FiPlus />컬렉션에 추가</button>
            <button className={styles.menuItem}><FiEyeOff />더이상 보지 않기</button>
            <button className={styles.menuItem}><FiAlertCircle />정보 오류 신고하기</button>
          </div>
        )}
      </div>
    </div>
  );
};

const WebtoonBasicInfoSection: React.FC<WebtoonBasicInfoSectionProps> = ({ webtoon }) => {
  const navigate = useNavigate();
  return (
    <section className={styles.section}>
      <div className={styles.contentContainer}>
        <div className={styles.leftSection}>
          <Thumbnail src={webtoon.thumbnailUrl} alt={webtoon.title} />
        </div>
        <div className={styles.rightSection}>
          <div className={styles.topRow}>
            <StatusTags status={webtoon.status} isAdult={webtoon.isAdult} />
            <ActionButtons />
          </div>
          <h1 className={styles.title}>{webtoon.title}</h1>
          <AuthorText authors={webtoon.authors} />
          <GenreTags genres={webtoon.genres} />
          <Description text={webtoon.description || ''} />
          <button className={styles.readButton} onClick={() => navigate(`/webtoons/${webtoon.id}/read`)}>
            첫화보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default WebtoonBasicInfoSection; 