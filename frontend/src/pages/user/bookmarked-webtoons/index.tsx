import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/auth-context';
import { Routes } from '@constants/routes';
import { WebtoonSummary, SerializationStatus } from '@models/webtoon';
import memberService from '@services/member-service';
import WebtoonGrid from '@components/webtoon-grid';
import Spinner from '@components/spinner';
import styles from './style.module.css';

const BookmarkedWebtoonsPage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarkedWebtoons, setBookmarkedWebtoons] = useState<WebtoonSummary[]>([]);

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate(Routes.LOGIN);
      return;
    }

    const fetchBookmarkedWebtoons = async () => {
      try {
        setIsLoading(true);
        const response = await memberService.getBookmarkedWebtoons();
        
        if (response.success && response.data) {
          setBookmarkedWebtoons(response.data);
        } else {
          setError(response.message || '북마크 웹툰을 불러오는데 실패했습니다.');
        }
      } catch (error) {
        setError('북마크 웹툰을 불러오는데 실패했습니다.');
        console.error('Error fetching bookmarked webtoons:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarkedWebtoons();
  }, [state.isAuthenticated, navigate]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.bookmarkedWebtoonsPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            ← 뒤로가기
          </button>
          <h1 className={styles.title}>북마크한 웹툰</h1>
        </div>
        
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{bookmarkedWebtoons.length}</div>
            <div className={styles.statLabel}>북마크한 웹툰</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {bookmarkedWebtoons.length > 0
                ? (
                    bookmarkedWebtoons.reduce((sum, webtoon) => sum + (webtoon.averageRating ?? 0), 0) / bookmarkedWebtoons.length
                  ).toFixed(1)
                : '0.0'
              }
            </div>
            <div className={styles.statLabel}>평균 평점</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {bookmarkedWebtoons.filter(webtoon => webtoon.status === SerializationStatus.ONGOING).length}
            </div>
            <div className={styles.statLabel}>연재 중</div>
          </div>
        </div>

        <div className={styles.content}>
          {bookmarkedWebtoons.length > 0 ? (
            <>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>내가 북마크한 웹툰들</h2>
                <p className={styles.sectionDescription}>
                  나중에 읽고 싶어서 저장해둔 웹툰들입니다
                </p>
              </div>
              <WebtoonGrid 
                webtoons={bookmarkedWebtoons} 
              />
            </>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🔖</span>
              <h2>북마크한 웹툰이 없습니다</h2>
              <p>관심 있는 웹툰을 북마크해보세요!</p>
              <button 
                onClick={() => navigate(Routes.WEBTOON_ONGOING)} 
                className={styles.browseButton}
              >
                웹툰 둘러보기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkedWebtoonsPage; 