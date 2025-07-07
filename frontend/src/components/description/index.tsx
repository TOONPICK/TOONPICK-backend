import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import styles from './style.module.css';

interface DescriptionProps {
  text: string;
  className?: string;
  maxHeight?: string;
}

const Description: React.FC<DescriptionProps> = ({ 
  text, 
  className, 
  maxHeight = '3.2rem' 
}) => {
  const [expanded, setExpanded] = useState(false);

  if (!text.trim()) {
    return null;
  }

  return (
    <div className={`${styles.descriptionContainer} ${className || ''}`}>
      <p 
        className={`${styles.descriptionText} ${expanded ? styles.expanded : ''}`}
        style={{ maxHeight: expanded ? 'none' : maxHeight, overflow: 'hidden' }}
      >
        {text}
      </p>
      <button 
        className={styles.expandButton} 
        onClick={() => setExpanded(e => !e)}
        aria-label={expanded ? '설명 접기' : '설명 펼치기'}
      >
        <FiChevronDown className={expanded ? styles.rotated : ''} />
      </button>
    </div>
  );
};

export default Description; 