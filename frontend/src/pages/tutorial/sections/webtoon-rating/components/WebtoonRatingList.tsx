import React, { useState } from 'react';
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
  onRatingComplete: () => void;
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

const WebtoonRatingList: React.FC<WebtoonRatingListProps> = ({ webtoons, onRatingComplete }) => {
  const [current, setCurrent] = useState(0);
  const [ratings, setRatings] = useState<Record<number, number>>({});

  const total = webtoons.length;
  const webtoon = webtoons[current];
  const progress = ((current + 1) / total) * 100;

  const handleRatingChange = (rating: number) => {
    setRatings(prev => ({
      ...prev,
      [webtoon.id]: rating
    }));
  };

  const handleNext = () => {
    if (current < total - 1) {
      setCurrent(current + 1);
    } else {
      onRatingComplete();
    }
  };

  if (!webtoon) return null;

  const rating = ratings[webtoon.id] || 0;

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.progressBarWrap}>
        <div className={styles.progressBarBg}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.progressText}>{current + 1} / {total} 웹툰 평가</div>
      </div>
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
          <div className={styles.desc}>{(webtoon as any).description ?? ''}</div>
        </div>
        <div className={styles.ratingWrap}>
          <span className={styles.ratingLabel}>평점</span>
          <StarRating
            rating={rating}
            maxRating={5}
            interactive={true}
            onChange={handleRatingChange}
            starSize={36}
          />
        </div>
        <div className={styles.buttonRow}>
          <button className={styles.nextButton} onClick={handleNext}>
            {current < total - 1 ? '다음' : '평가 완료'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebtoonRatingList; 