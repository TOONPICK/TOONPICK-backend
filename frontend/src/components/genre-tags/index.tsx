import React, { useState } from 'react';
import { Genre } from '@models/webtoon';
import { FiChevronDown } from 'react-icons/fi';
import styles from './style.module.css';

interface GenreTagsProps {
  genres: Genre[];
  className?: string;
  maxVisible?: number;
}

const GenreTags: React.FC<GenreTagsProps> = ({ 
  genres, 
  className, 
  maxVisible = 4 
}) => {
  const [expanded, setExpanded] = useState(false);

  const shouldShowExpandButton = genres.length > maxVisible;

  return (
    <div className={`${styles.genresContainer} ${className || ''}`}>
      <div className={`${styles.genreTags} ${expanded ? styles.expanded : ''}`}>
        {genres.map(genre => (
          <span key={genre.id} className={styles.genreTag}>
            {genre.name}
          </span>
        ))}
      </div>
      {shouldShowExpandButton && (
        <button 
          className={styles.expandButton} 
          onClick={() => setExpanded(e => !e)}
          aria-label={expanded ? '장르 태그 접기' : '장르 태그 펼치기'}
        >
          <FiChevronDown className={expanded ? styles.rotated : ''} />
        </button>
      )}
    </div>
  );
};

export default GenreTags; 