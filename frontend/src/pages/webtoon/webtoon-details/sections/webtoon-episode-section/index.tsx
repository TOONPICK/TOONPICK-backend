import React, { useState } from 'react';
import { Episode, EpisodePricingType } from '@models/episode';
import { WebtoonDetails } from '@models/webtoon';
import styles from './style.module.css';
import { dummyEpisodes } from '@dummy/webtoon-dummy';

interface WebtoonEpisodeSectionProps {
  webtoon: WebtoonDetails;
}

const WebtoonEpisodeSection: React.FC<WebtoonEpisodeSectionProps> = ({ webtoon }) => {
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // 실제로는 API에서 가져올 예정, 더미 데이터 사용
  const episodes = webtoon.episodes || dummyEpisodes;

  const getPricingTypeText = (pricingType: EpisodePricingType): string => {
    switch (pricingType) {
      case 'FREE':
        return '무료';
      case 'PAID':
        return '유료';
      case 'WAIT_FREE':
        return '기다리면무료';
      case 'DAILY_FREE':
        return '매일무료';
      default:
        return '무료';
    }
  };

  const getPricingTypeColor = (pricingType: EpisodePricingType): string => {
    switch (pricingType) {
      case 'FREE':
        return 'var(--success-color)';
      case 'PAID':
        return 'var(--warning-color)';
      case 'WAIT_FREE':
        return 'var(--primary-color)';
      case 'DAILY_FREE':
        return 'var(--info-color)';
      default:
        return 'var(--success-color)';
    }
  };

  const handleEpisodeClick = (episode: Episode) => {
    // 에피소드 클릭 시 처리 (예: 새 탭에서 열기)
    if (episode.episodeUrls.length > 0) {
      window.open(episode.episodeUrls[0].url, '_blank');
    }
  };

  const sortedEpisodes = [...episodes].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.episodeNumber - b.episodeNumber;
    } else {
      return b.episodeNumber - a.episodeNumber;
    }
  });

  const freeEpisodeCount = episodes.filter(ep => ep.pricingType === 'FREE').length;
  const paidEpisodeCount = episodes.filter(ep => ep.pricingType !== 'FREE').length;

  return (
    <div className={styles.episodeSection}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h2 className={styles.sectionTitle}>회차 목록</h2>
          <div className={styles.episodeStats}>
            <span className={styles.statItem}>
              <strong>총 {episodes.length}화</strong>
            </span>
            <span className={styles.statItem}>
              무료 {freeEpisodeCount}화
            </span>
            <span className={styles.statItem}>
              유료 {paidEpisodeCount}화
            </span>
          </div>
        </div>
        
        <div className={styles.controls}>
          {webtoon.seasons && webtoon.seasons.length > 1 && (
            <select 
              className={styles.seasonSelect}
              value={selectedSeason || ''}
              onChange={(e) => setSelectedSeason(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">전체 시즌</option>
              {webtoon.seasons?.map((season: any, index: number) => (
                <option key={season.id || index} value={season.id || index}>
                  시즌 {season.name || index + 1}
                </option>
              ))}
            </select>
          )}
          
          <button 
            className={styles.sortButton}
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            title={sortOrder === 'asc' ? '최신순' : '오래된순'}
          >
            {sortOrder === 'asc' ? '↓ 최신순' : '↑ 오래된순'}
          </button>
        </div>
      </div>

      <div className={styles.episodeList}>
        {sortedEpisodes.length > 0 ? (
          sortedEpisodes.map((episode) => (
            <div 
              key={episode.id} 
              className={styles.episodeItem}
              onClick={() => handleEpisodeClick(episode)}
            >
              <div className={styles.episodeInfo}>
                <div className={styles.episodeNumber}>
                  {episode.episodeNumber}화
                </div>
                <div className={styles.episodeTitle}>
                  {episode.title || `${episode.episodeNumber}화`}
                </div>
              </div>
              
              <div className={styles.episodeMeta}>
                <span 
                  className={styles.pricingType}
                  style={{ color: getPricingTypeColor(episode.pricingType) }}
                >
                  {getPricingTypeText(episode.pricingType)}
                </span>
                
                {episode.episodeUrls.length > 0 && (
                  <div className={styles.platformLinks}>
                    {episode.episodeUrls.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.platformLink}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {typeof link.platform === 'string' ? link.platform : link.platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>아직 등록된 회차가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebtoonEpisodeSection; 