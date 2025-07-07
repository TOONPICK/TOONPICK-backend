import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import WebtoonService from '@services/webtoon-service';
import WebtoonGrid from '@components/webtoon-grid';
import Spinner from '@components/spinner';
import { WebtoonSummary, Platform, SerializationStatus } from '@models/webtoon';
import { DayOfWeek } from '@models/enum';
import SortOptions from '@components/sort-options/SortOptions';
import ExploreFilters from '@pages/webtoon/explore/ExploreFilters';

const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [webtoons, setWebtoons] = useState<WebtoonSummary[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 검색 및 필터 상태
  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get('q') || '';
  });
  
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(() => {
    const platforms = searchParams.get('platforms');
    return platforms ? platforms.split(',').map(p => p as Platform) : [];
  });
  
  const [selectedGenres, setSelectedGenres] = useState<string[]>(() => {
    const genres = searchParams.get('genres');
    return genres ? genres.split(',') : [];
  });
  
  const [selectedStatus, setSelectedStatus] = useState<SerializationStatus[]>(() => {
    const status = searchParams.get('status');
    return status ? status.split(',').map(s => s as SerializationStatus) : [];
  });
  
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(() => {
    const day = searchParams.get('day');
    return day ? day as DayOfWeek : null;
  });
  

  
  const [sortBy, setSortBy] = useState<'POPULARITY' | 'RATING' | 'LATEST' | 'UPDATE'>(() => {
    const sort = searchParams.get('sort');
    return (sort as 'POPULARITY' | 'RATING' | 'LATEST' | 'UPDATE') || 'POPULARITY';
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastWebtoonRef = useRef<HTMLDivElement | null>(null);

  // URL 파라미터 업데이트 함수
  const updateUrlParams = () => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    if (selectedPlatforms.length > 0) {
      params.set('platforms', selectedPlatforms.join(','));
    }
    if (selectedGenres.length > 0) {
      params.set('genres', selectedGenres.join(','));
    }
    if (selectedStatus.length > 0) {
      params.set('status', selectedStatus.join(','));
    }
    if (selectedDay) {
      params.set('day', selectedDay);
    }
    if (sortBy !== 'POPULARITY') {
      params.set('sort', sortBy);
    }
    setSearchParams(params);
  };

  // 필터 상태 변경 시 URL 업데이트
  useEffect(() => {
    updateUrlParams();
  }, [searchQuery, selectedPlatforms, selectedGenres, selectedStatus, selectedDay, sortBy]);

  const fetchWebtoons = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await WebtoonService.getWebtoons({
        page,
        search: searchQuery || undefined,
        platforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
        genres: selectedGenres.length > 0 ? selectedGenres : undefined,
        serializationStatuses: selectedStatus.length > 0 ? selectedStatus : undefined,
        publishDays: selectedDay ? [selectedDay] : undefined,
        sortBy
      });
      const { data, last } = response;

      setWebtoons((prev) => page === 0 ? (data || []) : [...prev, ...(data || [])]);
      setIsLastPage(last || false);
    } catch (error) {
      setError('웹툰을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 필터 변경 시 데이터 리셋 및 재로드
  useEffect(() => {
    setCurrentPage(0);
    setWebtoons([]);
    setIsLastPage(false);
    fetchWebtoons(0);
  }, [searchQuery, selectedPlatforms, selectedGenres, selectedStatus, selectedDay, sortBy]);

  // IntersectionObserver 설정
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoading && !isLastPage) {
          setCurrentPage((prev) => prev + 1);
        }
      });
    };

    if (!observer.current) {
      observer.current = new IntersectionObserver(observerCallback, {
        threshold: 0.3,
        rootMargin: '1000px'
      });
    }

    const currentRef = lastWebtoonRef.current;
    if (currentRef) {
      observer.current.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.current?.unobserve(currentRef);
      }
    };
  }, [isLoading, isLastPage]);

  // 새로운 페이지 로드
  useEffect(() => {
    if (currentPage > 0 && !isLastPage) {
      fetchWebtoons(currentPage);
    }
  }, [currentPage, isLastPage]);

  const handleWebtoonClick = (webtoonId: number) => {
    navigate(`/webtoon/${webtoonId}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: {
    platforms?: Platform[];
    genres?: string[];
    status?: SerializationStatus[];
    day?: DayOfWeek | null;
  }) => {
    if (filters.platforms !== undefined) setSelectedPlatforms(filters.platforms);
    if (filters.genres !== undefined) setSelectedGenres(filters.genres);
    if (filters.status !== undefined) setSelectedStatus(filters.status);
    if (filters.day !== undefined) setSelectedDay(filters.day);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedPlatforms([]);
    setSelectedGenres([]);
    setSelectedStatus([]);
    setSelectedDay(null);
    setSortBy('POPULARITY');
  };

  const hasActiveFilters = Boolean(searchQuery) || 
    selectedPlatforms.length > 0 || 
    selectedGenres.length > 0 || 
    selectedStatus.length > 0 || 
    Boolean(selectedDay);

  return (
    <div className={styles.explorePage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>웹툰 탐색</h1>
          <p className={styles.pageSubtitle}>
            다양한 조건으로 원하는 웹툰을 찾아보세요
          </p>
        </div>

        <div className={styles.filtersSection}>
          <ExploreFilters
            selectedPlatforms={selectedPlatforms}
            selectedGenres={selectedGenres}
            selectedStatus={selectedStatus}
            selectedDay={selectedDay}
            searchQuery={searchQuery}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearch}
            onClearAll={clearAllFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        <div className={styles.sortOptionsWrapper}>
          <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        <div className={styles.content}>
          {isLoading && currentPage === 0 ? (
            <div className={styles.loadingContainer}>
              <Spinner />
              <p>웹툰을 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className={styles.error}>
              <p>{error}</p>
              <button onClick={() => fetchWebtoons(currentPage)}>
                다시 시도
              </button>
            </div>
          ) : webtoons.length === 0 ? (
            <div className={styles.emptyContainer}>
              <p>조건에 맞는 웹툰이 없습니다.</p>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} className={styles.clearFiltersButton}>
                  필터 초기화
                </button>
              )}
            </div>
          ) : (
            <>
              <WebtoonGrid
                webtoons={webtoons}
                lastWebtoonRef={lastWebtoonRef}
              />
              {isLoading && currentPage > 0 && (
                <div className={styles.loadingContainer}>
                  <Spinner />
                </div>
              )}
              {isLastPage && webtoons.length > 0 && (
                <div className={styles.endMessage}>모든 웹툰을 불러왔습니다.</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage; 