import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Webtoon, SerializationStatus } from '@models/webtoon';
import WebtoonService from '@services/webtoon-service';
import WebtoonRatingSection from './sections/webtoon-rating-section';
import WebtoonAnalysisSection from './sections/webtoon-analysis-section';
import WebtoonRecommendationSection from './sections/webtoon-recommendation-section';
import Thumbnail from '@components/thumbnail';
import AuthorText from '@components/author-text';
import GenreTags from '@components/genre-tags';
import Description from '@components/description';
import ActionButtons from '@components/action-buttons';
import StatusTags from '@components/status-tags';
import Tabs from '@components/tabs';
import styles from './style.module.css';

const WebtoonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [webtoon, setWebtoon] = useState<Webtoon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebtoon = async () => {
      try {
        setLoading(true);
        if (!id) return;

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
    return <div className={styles.loading}>로딩 중...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!webtoon) {
    return <div className={styles.error}>웹툰을 찾을 수 없습니다.</div>;
  }

  const handleBookmarkToggle = (isBookmarked: boolean) => {
    // TODO: 북마크 토글 API 호출
    console.log('Bookmark toggled:', isBookmarked);
  };

  const handleShare = () => {
    // TODO: 공유 기능 구현
    console.log('Share webtoon');
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

  const tabs = [
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
            <Thumbnail src={webtoon.thumbnailUrl} alt={webtoon.title} />
          </div>
          <div className={styles.rightSection}>
            <div className={styles.topMetaRow}>
              <span className={styles.ageRating}>{webtoon.ageRating || (webtoon.isAdult ? '19' : 'ALL')}</span>
              <span className={styles.platform}>{webtoon.platform}</span>
              <StatusTags status={webtoon.status} isAdult={webtoon.isAdult} />
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
              <span className={styles.status}>{webtoon.status === SerializationStatus.HIATUS ? '휴재' : webtoon.status === SerializationStatus.ONGOING ? '연재' : webtoon.status}</span>
              <span className={styles.paidType}>{webtoon.paidType || '-'}</span>
              <span className={styles.totalEpisodes}>총 {webtoon.totalEpisodes ?? '-'}화</span>
              <span className={styles.freeEpisodes}>{webtoon.freeEpisodes ? `${webtoon.freeEpisodes}화 무료` : ''}</span>
            </div>
            {webtoon.seasons && webtoon.seasons.length > 0 && (
              <div className={styles.seasonInfo}>
                {webtoon.seasons.map((season, idx) => (
                  <div key={idx} className={styles.seasonRow}>
                    시즌 {season.name || idx + 1} : {season.startDate || '-'} ~ {season.endDate ? season.endDate : '연재중'}
                  </div>
                ))}
              </div>
            )}
            <div className={styles.tagsSection}>
              <GenreTags genres={webtoon.genres} />
            </div>
            <div className={styles.descriptionSection}>
              <Description text={webtoon.description || ''} />
            </div>
          </div>
        </div>
      </section>
      {/* 탭 섹션은 그대로 */}
      <Tabs tabs={tabs} defaultActiveTab="rating" className={styles.webtoonTabs} />
    </div>
  );
};

export default WebtoonDetailPage;