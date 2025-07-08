import React, { useState, useEffect } from 'react';
import styles from './WebtoonRatingList.module.css';
import StarRating from 'src/components/star-rating';
import { Platform, SerializationStatus } from 'src/models/webtoon';
import clsx from 'clsx';

interface Webtoon {
  id: number;
  title: string;
  author: string;
  thumbnail: string;
  genres: string[];
  platform: string;
}

interface WebtoonRatingListProps {
  webtoons: Webtoon[];
  onNext: () => void;
  onSkip: () => void;
  onRate: (webtoonId: number, rating: number) => void;
  loading: boolean;
}

// Helper for platform label
const platformLabel = (platform: Platform) => {
  switch (platform) {
    case Platform.NAVER: return '네이버';
    case Platform.KAKAO: return '카카오';
    case Platform.KAKAOPAGE: return '카카오페이지';
    case Platform.LEZHIN: return '레진';
    case Platform.BOMTOON: return '봄툰';
    default: return platform;
  }
};

// Helper for status label
const statusLabel = (status: SerializationStatus) => {
  switch (status) {
    case SerializationStatus.ONGOING: return '연재중';
    case SerializationStatus.COMPLETED: return '완결';
    case SerializationStatus.HIATUS: return '휴재';
    case SerializationStatus.ENDED: return '종료';
    case SerializationStatus.PAUSED: return '중단';
    default: return '알수없음';
  }
};

const WebtoonRatingList: React.FC<WebtoonRatingListProps> = ({ webtoons, onNext, onSkip, onRate, loading }) => {
  const webtoon = webtoons[0];
  const [rating, setRating] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setRating(0);
    setError(null);
  }, [webtoon?.id]);

  if (!webtoon) return null;

  const handleRate = (value: number) => {
    setRating(value);
    setError(null);
  };

  const handleNext = async () => {
    if (!rating) {
      setError('별점을 선택해주세요!');
      return;
    }
    setError(null);
    await onRate(webtoon.id, rating);
    setRating(0);
    onNext();
  };

  const handleSkip = () => {
    setRating(0);
    setError(null);
    onSkip();
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.card}>
        <div className={styles.thumbnailWrap}>
          <img src={webtoon.thumbnail} alt={webtoon.title} className={styles.thumbnail} />
        </div>
        <div className={styles.infoWrap}>
          <div className={styles.title}>{webtoon.title}</div>
          <div className={styles.author}>{webtoon.author}</div>
          <div>
            <span className={styles.platformTag}>{platformLabel((webtoon.platform as Platform) ?? Platform.NAVER)}</span>
            <span className={styles.statusTag}>{statusLabel(((webtoon as any).status as SerializationStatus) ?? SerializationStatus.UNKNOWN)}</span>
          </div>
          <div className={styles.genres}>
            {(webtoon.genres || []).map((genre: any) => (
              <span key={typeof genre === 'string' ? genre : genre.id} className={styles.genreTag}>{typeof genre === 'string' ? genre : genre.name}</span>
            ))}
          </div>
        </div>
        <div className={styles.ratingWrap}>
          <span className={styles.ratingLabel}>평점</span>
          <StarRating
            rating={rating}
            maxRating={5}
            interactive={!loading}
            onChange={handleRate}
            starSize={36}
          />
        </div>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        <div className={styles.buttonRow}>
          <button className={styles.skipButton} onClick={handleSkip} disabled={loading}>건너뛰기</button>
          <button className={styles.nextButton} onClick={handleNext} disabled={loading}>{'다음'}</button>
        </div>
      </div>
    </div>
  );
};

export default WebtoonRatingList; 