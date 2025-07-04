import React, { useState, useEffect, useCallback, useRef } from 'react';
import WebtoonService from 'src/services/webtoon-service';
import WebtoonReviewService from 'src/services/webtoon-review-service';
import WebtoonRatingList from './components/WebtoonRatingList';
import styles from './style.module.css';

interface Webtoon {
  id: number;
  title: string;
  author: string;
  thumbnail: string;
  genres: string[];
  platform: string;
}

interface WebtoonRatingFormProps {
  onComplete: () => void;
}

const PAGE_SIZE = 10;

const WebtoonRatingPage: React.FC<WebtoonRatingFormProps> = ({ onComplete }) => {
  const [webtoons, setWebtoons] = useState<Webtoon[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // Fetch webtoons
  const fetchWebtoons = useCallback(async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await WebtoonService.getWebtoons({ page: pageNum, size: PAGE_SIZE });
      if (res.success && res.data) {
        const mapped = (res.data ?? []).map((w: any) => ({
          id: w.id,
          title: w.title,
          author: w.author || (w.authors ? w.authors.map((a: any) => a.name).join(', ') : ''),
          thumbnail: w.thumbnail || w.thumbnailUrl || '',
          genres: w.genres ? w.genres.map((g: any) => (typeof g === 'string' ? g : g.name)) : [],
          platform: w.platform || '',
        }));
        setWebtoons(prev => [...prev, ...mapped]);
        setHasMore(!res.last);
      } else {
        setError(res.message || '웹툰을 불러오지 못했습니다.');
      }
    } catch (e) {
      setError('웹툰을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWebtoons(page);
  }, [page, fetchWebtoons]);

  // Infinite scroll: when last webtoon is rated/skipped, fetch next page
  const handleNext = () => {
    if (currentIdx + 1 < webtoons.length) {
      setCurrentIdx(idx => idx + 1);
    } else if (hasMore && !loading) {
      setPage(p => p + 1);
    } else {
      onComplete();
    }
  };

  // 평가 제출
  const handleRate = async (webtoonId: number, rating: number) => {
    setSubmitting(true);
    try {
      await WebtoonReviewService.createWebtoonReview(webtoonId, { webtoonId, rating, comment: '' });
    } catch (e) {
      // TODO: 에러 처리
    } finally {
      setSubmitting(false);
    }
  };

  // 건너뛰기
  const handleSkip = () => {
    handleNext();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.scrollableSection}>
          <WebtoonRatingList
            key={webtoons[currentIdx]?.id}
            webtoons={webtoons.slice(currentIdx, currentIdx + 1)}
            onNext={handleNext}
            onSkip={handleSkip}
            onRate={handleRate}
            loading={loading || submitting}
          />
          {loading && <div className={styles.loading}>로딩 중...</div>}
          {error && <div className={styles.loading}>{error}</div>}
          {/* 무한 스크롤 트리거 */}
          <div ref={observerRef} className={styles.loadMoreTrigger} />
        </div>
        <button 
          className={styles.completeButton}
          onClick={onComplete}
        >
          평가 완료
        </button>
      </div>
    </div>
  );
};

export default WebtoonRatingPage; 