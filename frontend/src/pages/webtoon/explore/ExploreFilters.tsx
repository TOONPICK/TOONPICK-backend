import React, { useState } from 'react';
import { FiFilter, FiX, FiSearch } from 'react-icons/fi';
import { Platform, SerializationStatus } from '@models/webtoon';
import { DayOfWeek } from '@models/enum';
import styles from './style.module.css';

interface ExploreFiltersProps {
  selectedPlatforms: Platform[];
  selectedGenres: string[];
  selectedStatus: SerializationStatus[];
  selectedDay: DayOfWeek | null;
  searchQuery: string;
  onFilterChange: (filters: {
    platforms?: Platform[];
    genres?: string[];
    status?: SerializationStatus[];
    day?: DayOfWeek | null;
  }) => void;
  onSearchChange: (query: string) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

const ExploreFilters: React.FC<ExploreFiltersProps> = ({
  selectedPlatforms,
  selectedGenres,
  selectedStatus,
  selectedDay,
  searchQuery,
  onFilterChange,
  onSearchChange,
  onClearAll,
  hasActiveFilters
}) => {
  // 필터 옵션들
  const PLATFORMS: Platform[] = Object.values(Platform);
  const PLATFORM_LABELS: Record<Platform, string> = {
    [Platform.NAVER]: '네이버',
    [Platform.KAKAO]: '카카오',
    [Platform.KAKAOPAGE]: '카카오페이지',
    [Platform.LEZHIN]: '레진',
    [Platform.BOMTOON]: '봄툰',
  };

  const GENRES = [
    '로맨스', '판타지', '액션', '일상', '스포츠', '스릴러', '코미디', '드라마',
    '무협', '학원', '미스터리', 'SF', '호러', '음악', '요리', '여행', '동물',
    '역사', '전쟁', '범죄', '의학', '법정', '정치', '경제', '사회', '환경', '성인'
  ];

  const STATUS_OPTIONS: SerializationStatus[] = [SerializationStatus.COMPLETED, SerializationStatus.HIATUS];
  const STATUS_LABELS: Partial<Record<SerializationStatus, string>> = {
    [SerializationStatus.COMPLETED]: '완결',
    [SerializationStatus.HIATUS]: '휴재',
  };

  const DAYS: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  const DAY_LABELS: Record<DayOfWeek, string> = {
    'ALL': '전체',
    'MONDAY': '월',
    'TUESDAY': '화',
    'WEDNESDAY': '수',
    'THURSDAY': '목',
    'FRIDAY': '금',
    'SATURDAY': '토',
    'SUNDAY': '일'
  };

  const handlePlatformToggle = (platform: Platform) => {
    const newPlatforms = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter(p => p !== platform)
      : [...selectedPlatforms, platform];
    onFilterChange({ platforms: newPlatforms });
  };

  const handleGenreToggle = (genre: string) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    onFilterChange({ genres: newGenres });
  };

  const handleStatusToggle = (status: SerializationStatus) => {
    const newStatus = selectedStatus.includes(status)
      ? selectedStatus.filter(s => s !== status)
      : [...selectedStatus, status];
    onFilterChange({ status: newStatus });
  };

  const handleDayToggle = (day: DayOfWeek) => {
    const newDay = selectedDay === day ? null : day;
    onFilterChange({ day: newDay });
  };

  const handleSelectAllPlatforms = () => {
    if (selectedPlatforms.length === PLATFORMS.length) {
      onFilterChange({ platforms: [] });
    } else {
      onFilterChange({ platforms: PLATFORMS });
    }
  };

  const handleSelectAllGenres = () => {
    if (selectedGenres.length === GENRES.length) {
      onFilterChange({ genres: [] });
    } else {
      onFilterChange({ genres: GENRES });
    }
  };

  const handleSelectAllStatus = () => {
    if (selectedStatus.length === STATUS_OPTIONS.length) {
      onFilterChange({ status: [] });
    } else {
      onFilterChange({ status: STATUS_OPTIONS });
    }
  };

  return (
    <div className={styles.filtersContainer}>
      {/* 검색 + 필터 헤더 */}
      <div className={styles.searchAndFilterHeader}>
        <div className={styles.searchSection}>
          <div className={styles.searchInputWrapper}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="제목, 작가, 장르로 검색..."
              className={styles.searchInput}
            />
          </div>
        </div>
        <div className={styles.filterHeader}>
          <div className={styles.filtersTitle}>
            <FiFilter className={styles.filterIcon} />
            <span>필터</span>
            {hasActiveFilters && (
              <span className={styles.activeFiltersCount}>
                {[
                  selectedPlatforms.length,
                  selectedGenres.length,
                  selectedStatus.length,
                  selectedDay ? 1 : 0
                ].reduce((sum, count) => sum + count, 0)}개 적용됨
              </span>
            )}
          </div>
          <div className={styles.filtersActions}>
            {hasActiveFilters && (
              <button onClick={onClearAll} className={styles.clearAllButton}>
                <FiX />
                전체 초기화
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 필터 콘텐츠 */}
      <div className={styles.filtersContent}>
        {/* 요일 + 연재 상태 필터 */}
        <div className={styles.filterGroup}>
          <div className={styles.filterOptions}>
            {DAYS.map(day => (
              <button
                key={day}
                onClick={() => handleDayToggle(day)}
                className={`${styles.filterOption} ${selectedDay === day ? styles.active : ''}`}
              >
                {DAY_LABELS[day]}
              </button>
            ))}
            {STATUS_OPTIONS.map(status => (
              <button
                key={status}
                onClick={() => handleStatusToggle(status)}
                className={`${styles.filterOption} ${selectedStatus.includes(status) ? styles.active : ''}`}
              >
                {STATUS_LABELS[status]}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* 플랫폼 필터 */}
        <div className={styles.filterGroup}>
          <div className={styles.filterGroupHeader}>
            <button 
              onClick={handleSelectAllPlatforms}
              className={styles.selectAllButton}
            >
              {selectedPlatforms.length === PLATFORMS.length ? '전체 해제' : '전체 선택'}
            </button>
          </div>
          <div className={styles.filterOptions}>
            {PLATFORMS.map(platform => (
              <button
                key={platform}
                onClick={() => handlePlatformToggle(platform)}
                className={`${styles.filterOption} ${selectedPlatforms.includes(platform) ? styles.active : ''}`}
              >
                {PLATFORM_LABELS[platform]}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* 장르 필터 */}
        <div className={styles.filterGroup}>
          <div className={styles.filterGroupHeader}>
            <button 
              onClick={handleSelectAllGenres}
              className={styles.selectAllButton}
            >
              {selectedGenres.length === GENRES.length ? '전체 해제' : '전체 선택'}
            </button>
          </div>
          <div className={styles.filterOptions}>
            {GENRES.map(genre => (
              <button
                key={genre}
                onClick={() => handleGenreToggle(genre)}
                className={`${styles.filterOption} ${selectedGenres.includes(genre) ? styles.active : ''}`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreFilters; 