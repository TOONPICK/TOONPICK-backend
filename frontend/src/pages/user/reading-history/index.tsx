import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/auth-context';
import { Routes } from '@constants/routes';
import memberService from '@services/member-service';
import WebtoonGrid from '@components/webtoon-grid';
import Spinner from '@components/spinner';
import styles from './style.module.css';

interface ReadingHistoryItem {
  webtoon: any;
  lastReadAt: string;
}

const ReadingHistoryPage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryItem[]>([]);

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate(Routes.LOGIN);
      return;
    }

    const fetchReadingHistory = async () => {
      try {
        setIsLoading(true);
        const response = await memberService.getMemberProfile();
        
        if (response.success && response.data) {
          setReadingHistory(response.data.readingHistory || []);
        } else {
          setError(response.message || '감상 기록을 불러오는데 실패했습니다.');
        }
      } catch (error) {
        setError('감상 기록을 불러오는데 실패했습니다.');
        console.error('Error fetching reading history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadingHistory();
  }, [state.isAuthenticated, navigate]);

  const formatLastReadDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '어제';
    if (diffDays < 7) return `${diffDays}일 전`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
    return `${Math.floor(diffDays / 365)}년 전`;
  };

  if (error) return <div className={styles.error}>{error}</div>;
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.readingHistoryPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            ← 뒤로가기
          </button>
          <h1 className={styles.title}>감상 기록</h1>
          <div className={styles.headerActions}>
            <button className={styles.clearButton}>
              기록 초기화
            </button>
          </div>
        </div>
        
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{readingHistory.length}</div>
            <div className={styles.statLabel}>감상한 웹툰</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {readingHistory.length > 0 
                ? formatLastReadDate(readingHistory[0].lastReadAt)
                : '-'
              }
            </div>
            <div className={styles.statLabel}>최근 감상</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>
              {readingHistory.length > 0 
                ? Math.round(readingHistory.reduce((sum, item) => {
                    const days = Math.ceil((new Date().getTime() - new Date(item.lastReadAt).getTime()) / (1000 * 60 * 60 * 24));
                    return sum + days;
                  }, 0) / readingHistory.length)
                : 0
              }일
            </div>
            <div className={styles.statLabel}>평균 감상 주기</div>
          </div>
        </div>

        <div className={styles.content}>
          {readingHistory.length > 0 ? (
            <>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>최근 감상한 웹툰들</h2>
                <p className={styles.sectionDescription}>
                  최근에 감상한 웹툰들을 시간순으로 정렬했습니다
                </p>
              </div>
              <div className={styles.historyList}>
                {readingHistory.map((item, index) => (
                  <div key={index} className={styles.historyItem}>
                    <div className={styles.webtoonInfo}>
                      <img 
                        src={item.webtoon.thumbnailUrl} 
                        alt={item.webtoon.title}
                        className={styles.thumbnail}
                      />
                      <div className={styles.webtoonDetails}>
                        <h3 className={styles.webtoonTitle}>{item.webtoon.title}</h3>
                        <p className={styles.webtoonAuthor}>
                          {item.webtoon.authors?.map((author: any) => author.name).join(', ')}
                        </p>
                        <div className={styles.webtoonMeta}>
                          <span className={styles.platform}>{item.webtoon.platform}</span>
                          <span className={styles.status}>{item.webtoon.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.readingMeta}>
                      <span className={styles.lastReadDate}>
                        {formatLastReadDate(item.lastReadAt)}
                      </span>
                      <button className={styles.continueButton}>
                        이어보기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📚</span>
              <h2>감상 기록이 없습니다</h2>
              <p>웹툰을 읽으면 여기에 감상 기록이 쌓입니다!</p>
              <button 
                onClick={() => navigate(Routes.HOME)} 
                className={styles.exploreButton}
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

export default ReadingHistoryPage;
