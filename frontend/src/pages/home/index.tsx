import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import { WebtoonSummary } from '@models/webtoon';  
import WebtoonGrid from '@components/webtoon-grid';
import Carousel from '@components/carousel';
import WebtoonService from '@services/webtoon-service';
import CarouselAdService from '@services/carousel-ad-service';
import { CarouselAd } from '@models/carousel-ad';

export interface HomePageState {
  popularWebtoons: WebtoonSummary[];
  recentWebtoons: WebtoonSummary[];
  isLoading: boolean;
  error: string | null;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<HomePageState>({
    popularWebtoons: [],
    recentWebtoons: [],
    isLoading: true,
    error: null
  });

  // 캐러셀 광고 상태
  const [carouselAds, setCarouselAds] = useState<CarouselAd[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularRes, recentRes, ads] = await Promise.all([
          WebtoonService.getPopularWebtoons(10),
          WebtoonService.getRecentWebtoons(10),
          CarouselAdService.getHomeAds()
        ]);

        setState({
          popularWebtoons: popularRes.success && popularRes.data ? popularRes.data : [],
          recentWebtoons: recentRes.success && recentRes.data ? recentRes.data : [],
          isLoading: false,
          error: null
        });
        setCarouselAds(ads);
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: '데이터를 불러오는데 실패했습니다.'
        }));
      }
    };

    fetchData();
  }, []);

  if (state.isLoading) return <div>로딩중...</div>;
  if (state.error) return <div>{state.error}</div>;

  return (
    <div className={styles.homePage}>

      {/* 캐러셀 광고 섹션 */}
      <section className={styles.section}>
        <Carousel items={carouselAds} />
      </section>


      {/* 인기 웹툰 섹션 */}
      <section className={styles.section}>
        <h2>인기 웹툰</h2>
         <WebtoonGrid 
           webtoons={state.popularWebtoons || []} 
           rowLimit={2}
         /> 
      </section>

      {/* 최신 웹툰 섹션 */}
      <section className={styles.section}>
        <h2>최신 웹툰</h2>
         <WebtoonGrid 
           webtoons={state.recentWebtoons || []} 
           rowLimit={2}
         /> 
      </section>
    </div>
  );
};

export default HomePage; 