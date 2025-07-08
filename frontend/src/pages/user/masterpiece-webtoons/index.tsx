import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/auth-context';
import { Routes } from '@constants/routes';
import { WebtoonSummary, SerializationStatus } from '@models/webtoon';
import memberService from '@services/member-service';
import WebtoonGrid from '@components/webtoon-grid';
import Spinner from '@components/spinner';
import styles from './style.module.css';

const MasterpieceWebtoonsPage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [masterpieceWebtoons, setMasterpieceWebtoons] = useState<WebtoonSummary[]>([]);

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate(Routes.LOGIN);
      return;
    }

    const fetchMasterpieceWebtoons = async () => {
      try {
        setIsLoading(true);
        const response = await memberService.getMasterpieceWebtoons();
        
        if (response.success && response.data) {
          setMasterpieceWebtoons(response.data);
        } else {
          setError(response.message || '명작 웹툰을 불러오는데 실패했습니다.');
        }
      } catch (error) {
        setError('명작 웹툰을 불러오는데 실패했습니다.');
        console.error('Error fetching masterpiece webtoons:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMasterpieceWebtoons();
  }, [state.isAuthenticated, navigate]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.masterpieceWebtoonsPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            ← 뒤로가기
          </button>
          <h1 className={styles.title}>내 명작 웹툰</h1>
        </div>
        
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{masterpieceWebtoons.length}</div>
            <div className={styles.statLabel}>선정한 명작</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {masterpieceWebtoons.length > 0
                ? (
                    masterpieceWebtoons.reduce((sum, webtoon) => sum + (webtoon.averageRating ?? 0), 0) / masterpieceWebtoons.length
                  ).toFixed(1)
                : '0.0'
              }
            </div>
            <div className={styles.statLabel}>평균 평점</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {masterpieceWebtoons.length > 0 
                ? masterpieceWebtoons.filter(webtoon => webtoon.status === SerializationStatus.ONGOING).length
                : 0
              }
            </div>
            <div className={styles.statLabel}>연재 중</div>
          </div>
        </div>

        <div className={styles.content}>
          {masterpieceWebtoons.length > 0 ? (
            <>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>내가 선정한 명작들</h2>
                <p className={styles.sectionDescription}>
                  특별히 인상 깊었던 웹툰들을 명작으로 선정했습니다
                </p>
              </div>
              <WebtoonGrid 
                webtoons={masterpieceWebtoons} 
              />
            </>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>⭐</span>
              <h2>아직 명작으로 선정한 웹툰이 없습니다</h2>
              <p>인상 깊었던 웹툰들을 명작으로 선정해보세요!</p>
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

export default MasterpieceWebtoonsPage;
