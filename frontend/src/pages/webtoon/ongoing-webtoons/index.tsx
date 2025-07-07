import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import WebtoonService from '@services/webtoon-service';
import WebtoonGrid from '@components/webtoon-grid';
import Spinner from '@components/spinner';
import { WebtoonSummary, Platform } from '@models/webtoon';
import { DayOfWeek } from '@models/enum';
import SortOptions from '@components/sort-options/SortOptions';
import FilterOptions from './FilterOptions';

const OngoingWebtoonsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [webtoons, setWebtoons] = useState<WebtoonSummary[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 필터 상태
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(() => {
    const platforms = searchParams.get('platforms');
    return platforms ? platforms.split(',').map(p => p as Platform) : [];
  });
  
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(() => {
    const day = searchParams.get('day');
    if (day) return day as DayOfWeek;
    
    // 오늘 요일을 기본값으로 설정
    const today = new Date().getDay();
    const dayMap: { [key: number]: DayOfWeek } = {
      0: 'SUNDAY',
      1: 'MONDAY',
      2: 'TUESDAY',
      3: 'WEDNESDAY',
      4: 'THURSDAY',
      5: 'FRIDAY',
      6: 'SATURDAY'
    };
    return dayMap[today];
  });
  
  const [sortBy, setSortBy] = useState<'POPULARITY' | 'RATING' | 'LATEST' | 'UPDATE'>(() => {
    const sort = searchParams.get('sort');
    return (sort as 'POPULARITY' | 'RATING' | 'LATEST' | 'UPDATE') || 'POPULARITY';
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastWebtoonRef = useRef<HTMLDivElement | null>(null);

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

  const PLATFORM_LABELS: Record<Platform, string> = {
    [Platform.NAVER]: '네이버',
    [Platform.KAKAO]: '카카오',
    [Platform.KAKAOPAGE]: '카카오페이지',
    [Platform.LEZHIN]: '레진',
    [Platform.BOMTOON]: '봄툰',
  };

  // URL 파라미터 업데이트 함수
  const updateUrlParams = () => {
    const params = new URLSearchParams();
    if (selectedPlatforms.length > 0) {
      params.set('platforms', selectedPlatforms.join(','));
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
  }, [selectedPlatforms, selectedDay, sortBy]);

  const handlePlatformChange = (platform: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSelectAllPlatforms = () => {
    if (selectedPlatforms.length === Object.values(Platform).length) {
      setSelectedPlatforms([]);
    } else {
      setSelectedPlatforms(Object.values(Platform));
    }
  };

  const handleDayChange = (day: DayOfWeek) => {
    setSelectedDay(day === selectedDay ? null : day);
  };

  const handleFilterPlatformsChange = (platforms: Platform[]) => {
    setSelectedPlatforms(platforms);
  };
  const handleFilterDayChange = (day: DayOfWeek | null) => {
    setSelectedDay(day);
  };

  const fetchOngoingWebtoons = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await WebtoonService.getWebtoons({
        page,
        platforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
        publishDays: selectedDay ? [selectedDay] : undefined,
        sortBy
      });
      const { data, last } = response;

      setWebtoons((prev) => page === 0 ? (data || []) : [...prev, ...(data || [])]);
      setIsLastPage(last || false);
    } catch (error) {
      setError('진행 중인 웹툰을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 필터 변경 시 데이터 리셋 및 재로드
  useEffect(() => {
    setCurrentPage(0);
    setWebtoons([]);
    setIsLastPage(false);
    fetchOngoingWebtoons(0);
  }, [selectedPlatforms, selectedDay, sortBy]);

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
        threshold: 0.3, // 요소가 10% 보이면 트리거
        rootMargin: '1000px' // 뷰포트 아래 100px에서 미리 로드
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
      fetchOngoingWebtoons(currentPage);
    }
  }, [currentPage, isLastPage]);

  const handleWebtoonClick = (webtoonId: number) => {
    navigate(`/webtoon/${webtoonId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>연재 웹툰</h1>
        <p className={styles.subtitle}>현재 연재 중인 웹툰들을 확인해보세요</p>
      </div>

      <FilterOptions 
        PLATFORM_LABELS={PLATFORM_LABELS}
        DAYS={DAYS}
        DAY_LABELS={DAY_LABELS}
        onChangeSelectedPlatforms={handleFilterPlatformsChange}
        onChangeSelectedDay={handleFilterDayChange}
      />

      <div className={styles.sortOptionsWrapper}>
        <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>웹툰을 불러오는 중...</p>
          </div>
        ) : error ? (
          <div className={styles.errorContainer}>
            <p>웹툰을 불러오는데 실패했습니다.</p>
            <button onClick={() => fetchOngoingWebtoons(currentPage)} className={styles.retryButton}>
              다시 시도
            </button>
          </div>
        ) : webtoons.length === 0 ? (
          <div className={styles.emptyContainer}>
            <p>조건에 맞는 웹툰이 없습니다.</p>
          </div>
        ) : (
          <>
            <WebtoonGrid
              webtoons={webtoons}
              lastWebtoonRef={lastWebtoonRef}
            />
            {isLoading && (
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
  );
};

export default OngoingWebtoonsPage; 