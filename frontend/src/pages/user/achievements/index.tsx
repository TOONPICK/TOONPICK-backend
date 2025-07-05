import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/auth-context';
import { Routes } from '@constants/routes';
import memberService from '@services/member-service';
import { MemberProfile } from '@models/member';
import Spinner from '@components/spinner';
import styles from './style.module.css';

const AchievementsPage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [memberProfile, setMemberProfile] = useState<MemberProfile | null>(null);

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate(Routes.LOGIN);
      return;
    }

    const fetchMemberProfile = async () => {
      try {
        setIsLoading(true);
        const response = await memberService.getMemberProfile();
        
        if (response.success && response.data) {
          setMemberProfile(response.data);
        } else {
          setError(response.message || '사용자 데이터를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        setError('사용자 데이터를 불러오는데 실패했습니다.');
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemberProfile();
  }, [state.isAuthenticated, navigate]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (isLoading) return <Spinner />;
  if (!memberProfile) return <div className={styles.error}>프로필 정보를 불러오는 중입니다.</div>;

  const badges = memberProfile.badges || [];

  const achievementCategories = [
    {
      title: '독서량',
      icon: '📚',
      description: '웹툰을 많이 읽을수록 얻을 수 있는 업적',
      badges: badges.filter(badge => badge.name.includes('독서') || badge.name.includes('읽기'))
    },
    {
      title: '리뷰',
      icon: '✍️',
      description: '리뷰를 작성할수록 얻을 수 있는 업적',
      badges: badges.filter(badge => badge.name.includes('리뷰') || badge.name.includes('평가'))
    },
    {
      title: '컬렉션',
      icon: '📁',
      description: '컬렉션을 만들고 관리할수록 얻을 수 있는 업적',
      badges: badges.filter(badge => badge.name.includes('컬렉션') || badge.name.includes('저장'))
    },
    {
      title: '특별',
      icon: '🏆',
      description: '특별한 조건을 달성하면 얻을 수 있는 업적',
      badges: badges.filter(badge => !badge.name.includes('독서') && !badge.name.includes('리뷰') && !badge.name.includes('컬렉션'))
    }
  ];

  return (
    <div className={styles.achievementsPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            ← 뒤로가기
          </button>
          <h1 className={styles.title}>업적</h1>
        </div>
        
        <div className={styles.statsSection}>
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
          <div className={styles.statCard}>
            <div className={styles.statNumber}>50</div>
            <div className={styles.statLabel}>전체 업적</div>
          </div>
        </div>

        <div className={styles.content}>
          {achievementCategories.map((category, index) => (
            <div key={index} className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryInfo}>
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  <div>
                    <h2 className={styles.categoryTitle}>{category.title}</h2>
                    <p className={styles.categoryDescription}>{category.description}</p>
                  </div>
                </div>
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
                        <h3 className={styles.badgeName}>{badge.name}</h3>
                        <p className={styles.badgeDescription}>
                          이 업적을 획득했습니다!
                        </p>
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
      </div>
    </div>
  );
};

export default AchievementsPage; 