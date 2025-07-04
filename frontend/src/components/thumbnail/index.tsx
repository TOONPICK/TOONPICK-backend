import React from 'react';
import styles from './style.module.css';

interface ThumbnailProps {
  src: string;
  alt: string;
  className?: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ src, alt, className }) => (
  <div className={`${styles.thumbnailContainer} ${className || ''}`}>
    <img src={src} alt={alt} className={styles.thumbnail} />
  </div>
);

export default Thumbnail; 