import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { WebtoonDetails, SerializationStatus } from '@models/webtoon';
import WebtoonService from '@services/webtoon-service';
import WebtoonRatingSection from './sections/webtoon-rating-section';
import WebtoonAnalysisSection from './sections/webtoon-analysis-section';
import WebtoonRecommendationSection from './sections/webtoon-recommendation-section';
import WebtoonEpisodeSection from './sections/webtoon-episode-section';
import Thumbnail from '@components/thumbnail';
import AuthorText from '@components/author-text';
import GenreTags from '@components/genre-tags';
import Description from '@components/description';
import ActionButtons from '@components/action-buttons';
import StatusTags from '@components/status-tags';
import Tabs from '@components/tabs';
import Spinner from '@components/spinner';
import styles from './style.module.css';

const WebtoonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [webtoon, setWebtoon] = useState<WebtoonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebtoon = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) {
          setError('웹툰 ID가 유효하지 않습니다.');
          return;
        }

        const response = await WebtoonService.getWebtoonDetails(parseInt(id));
        if (response.success && response.data) {
          setWebtoon(response.data);
        } else {
          setError('웹툰 정보를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('Failed to fetch webtoon:', error);
        setError('웹툰 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchWebtoon();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner />
        <p>웹툰 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <div className={styles.errorContent}>
          <h3>오류가 발생했습니다</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (!webtoon) {
    return (
      <div className={styles.error}>
        <div className={styles.errorContent}>
          <h3>웹툰을 찾을 수 없습니다</h3>
          <p>요청하신 웹툰이 존재하지 않거나 삭제되었을 수 있습니다.</p>
        </div>
      </div>
    );
  }

  const handleBookmarkToggle = (isBookmarked: boolean) => {
    // TODO: 북마크 토글 API 호출
    console.log('Bookmark toggled:', isBookmarked);
  };

  const handleShare = () => {
    // TODO: 공유 기능 구현
    if (navigator.share) {
      navigator.share({
        title: webtoon.title,
        text: `${webtoon.title} - ${webtoon.authors?.map(a => a.name).join(', ')}`,
        url: window.location.href,
      });
    } else {
      // 폴백: 클립보드에 복사
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다.');
    }
  };

  const handleAddToCollection = () => {
    // TODO: 컬렉션에 추가 기능 구현
    console.log('Add to collection');
  };

  const handleHide = () => {
    // TODO: 숨기기 기능 구현
    console.log('Hide webtoon');
  };

  const handleReport = () => {
    // TODO: 신고 기능 구현
    console.log('Report webtoon');
  };

  const getStatusText = (status: SerializationStatus): string => {
    switch (status) {
      case SerializationStatus.HIATUS:
        return '휴재';
      case SerializationStatus.ONGOING:
        return '연재중';
      case SerializationStatus.COMPLETED:
        return '완결';
      default:
        return status;
    }
  };

  const getStatusColor = (status: SerializationStatus): string => {
    switch (status) {
      case SerializationStatus.ONGOING:
        return 'var(--success-color)';
      case SerializationStatus.HIATUS:
        return 'var(--warning-color)';
      case SerializationStatus.COMPLETED:
        return 'var(--info-color)';
      default:
        return 'var(--text-secondary)';
    }
  };

  const tabs = [
    {
      id: 'episodes',
      label: '회차 목록',
      content: <WebtoonEpisodeSection webtoon={webtoon} />
    },
    {
      id: 'rating',
      label: '평가',
      content: <WebtoonRatingSection webtoon={webtoon} />
    },
    {
      id: 'analysis',
      label: '분석',
      content: <WebtoonAnalysisSection webtoon={webtoon} />
    },
    {
      id: 'recommendation',
      label: '추천',
      content: <WebtoonRecommendationSection webtoon={webtoon} />
    }
  ];

  return (
    <div className={styles.container}>
      {/* 웹툰 기본 정보 섹션 */}
      <section className={styles.basicInfoSection}>
        <div className={styles.contentContainer}>
          <div className={styles.leftSection}>
            <Thumbnail 
              src={webtoon.thumbnailUrl} 
              alt={`${webtoon.title} 썸네일`}
              className={styles.webtoonThumbnail}
            />
          </div>
          <div className={styles.rightSection}>
            <div className={styles.topMetaRow}>
              <span className={styles.ageRating}>
                {webtoon.ageRating || (webtoon.isAdult ? '19' : 'ALL')}
              </span>
              <span className={styles.platform}>{webtoon.platforms.join(', ')}</span>
              <StatusTags status={webtoon.status as SerializationStatus} isAdult={webtoon.isAdult} />
              <ActionButtons
                onBookmarkToggle={handleBookmarkToggle}
                onShare={handleShare}
                onAddToCollection={handleAddToCollection}
                onHide={handleHide}
                onReport={handleReport}
              />
            </div>
            <h1 className={styles.title}>{webtoon.title}</h1>
            <div className={styles.authorSection}>
              <AuthorText authors={webtoon.authors} />
            </div>
            <div className={styles.infoRow}>
              <span 
                className={styles.status}
                style={{ color: getStatusColor(webtoon.status as SerializationStatus) }}
              >
                {getStatusText(webtoon.status as SerializationStatus)}
              </span>
              <span className={styles.totalEpisodes}>
                총 {webtoon.episodeCount ?? '-'}화
              </span>
            </div>
            {webtoon.seasons && webtoon.seasons.length > 0 && (
              <div className={styles.seasonInfo}>
                <h4>시즌 정보</h4>
                {webtoon.seasons.map((season, idx) => (
                  <div key={idx} className={styles.seasonRow}>
                    <strong>시즌 {season.name || idx + 1}</strong>
                    <br />
                    {season.startDate || '-'} ~ {season.endDate ? season.endDate : '연재중'}
                  </div>
                ))}
              </div>
            )}
            <div className={styles.tagsSection}>
              <GenreTags genres={webtoon.genres} />
            </div>
            {webtoon.summary && (
              <div className={styles.descriptionSection}>
                <Description text={webtoon.summary} />
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* 탭 섹션 */}
      <Tabs tabs={tabs} defaultActiveTab="episodes" className={styles.webtoonTabs} />
    </div>
  );
};

export default WebtoonDetailPage;