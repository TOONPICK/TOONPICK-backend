import React, { useState } from 'react';
import { FiMoreVertical, FiBookmark, FiAlertCircle, FiShare2, FiPlus, FiEyeOff } from 'react-icons/fi';
import styles from './style.module.css';

interface ActionButtonsProps {
  className?: string;
  onBookmarkToggle?: (isBookmarked: boolean) => void;
  onShare?: () => void;
  onAddToCollection?: () => void;
  onHide?: () => void;
  onReport?: () => void;
  initialBookmarked?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  className,
  onBookmarkToggle,
  onShare,
  onAddToCollection,
  onHide,
  onReport,
  initialBookmarked = false
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const handleBookmarkToggle = () => {
    const newBookmarkedState = !isBookmarked;
    setIsBookmarked(newBookmarkedState);
    onBookmarkToggle?.(newBookmarkedState);
  };

  const handleMoreMenuToggle = () => {
    setIsMoreMenuOpen(prev => !prev);
  };

  const handleMenuClick = (action: (() => void) | undefined) => {
    setIsMoreMenuOpen(false);
    action?.();
  };

  return (
    <div className={`${styles.actionButtons} ${className || ''}`}>
      <button 
        className={`${styles.bookmarkButton} ${isBookmarked ? styles.bookmarked : ''}`} 
        onClick={handleBookmarkToggle}
        aria-label={isBookmarked ? '관심 해제' : '관심 추가'}
      >
        <FiBookmark />
        관심
      </button>
      <div className={styles.moreButtonContainer}>
        <button 
          className={styles.moreButton} 
          onClick={handleMoreMenuToggle}
          aria-label="더보기 메뉴"
          aria-expanded={isMoreMenuOpen}
        >
          <FiMoreVertical />
        </button>
        {isMoreMenuOpen && (
          <div className={styles.moreMenu}>
            <button 
              className={styles.menuItem} 
              onClick={() => handleMenuClick(onShare)}
            >
              <FiShare2 />
              작품 공유
            </button>
            <button 
              className={styles.menuItem} 
              onClick={() => handleMenuClick(onAddToCollection)}
            >
              <FiPlus />
              컬렉션에 추가
            </button>
            <button 
              className={styles.menuItem} 
              onClick={() => handleMenuClick(onHide)}
            >
              <FiEyeOff />
              더이상 보지 않기
            </button>
            <button 
              className={styles.menuItem} 
              onClick={() => handleMenuClick(onReport)}
            >
              <FiAlertCircle />
              정보 오류 신고하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionButtons; 