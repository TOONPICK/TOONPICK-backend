import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MemberProfile } from '@models/member';
import { Routes } from '@constants/routes';
import styles from './style.module.css';

interface AchievementsTabProps {
  memberProfile: MemberProfile;
}

const AchievementsTab: React.FC<AchievementsTabProps> = ({ memberProfile }) => {
  const navigate = useNavigate();
  const badges = memberProfile.badges || [];

  const achievementCategories = [
    {
      title: '독서량',
      icon: '📚',
      badges: badges.filter(badge => badge.name.includes('독서') || badge.name.includes('읽기'))
    },
    {
      title: '리뷰',
      icon: '✍️',
      badges: badges.filter(badge => badge.name.includes('리뷰') || badge.name.includes('평가'))
    },
    {
      title: '컬렉션',
      icon: '📁',
      badges: badges.filter(badge => badge.name.includes('컬렉션') || badge.name.includes('저장'))
    },
    {
      title: '특별',
      icon: '🏆',
      badges: badges.filter(badge => !badge.name.includes('독서') && !badge.name.includes('리뷰') && !badge.name.includes('컬렉션'))
    }
  ];

  const handleViewAllAchievements = () => {
    navigate(Routes.ACHIEVEMENTS);
  };

  return (
    <div className={styles.achievementsTab}>
      <div className={styles.statsOverview}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{badges.length}</div>
          <div className={styles.statLabel}>획득한 업적</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>
            {badges.length > 0 ? Math.round((badges.length / 50) * 100) : 0}%
          </div>
          <div className={styles.statLabel}>달성률</div>
        </div>
      </div>

      <div className={styles.categoriesSection}>
        {achievementCategories.map((category, index) => (
          <div key={index} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <span className={styles.categoryIcon}>{category.icon}</span>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <span className={styles.badgeCount}>{category.badges.length}개</span>
            </div>
            <div className={styles.badgesGrid}>
              {category.badges.length > 0 ? (
                category.badges.map((badge) => (
                  <div key={badge.id} className={styles.badgeCard}>
                    <div className={styles.badgeIcon}>
                      <img src={badge.icon} alt={badge.name} />
                    </div>
                    <div className={styles.badgeInfo}>
                      <h4 className={styles.badgeName}>{badge.name}</h4>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <span className={styles.emptyIcon}>🔒</span>
                  <p>아직 획득한 업적이 없습니다</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.progressSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>다음 목표</h3>
          <button onClick={handleViewAllAchievements} className={styles.viewAllButton}>
            전체 업적 보기 →
          </button>
        </div>
        <div className={styles.progressCard}>
          <div className={styles.progressInfo}>
            <h4>리뷰 마스터</h4>
            <p>10개의 리뷰를 작성하세요</p>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '60%' }}></div>
          </div>
          <span className={styles.progressText}>6/10</span>
        </div>
      </div>
    </div>
  );
};

export default AchievementsTab; 