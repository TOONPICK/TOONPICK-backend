import React, { useEffect, useState } from 'react';
import { WebtoonDetails, WebtoonSummary } from '@models/webtoon';
import styles from './style.module.css';
import WebtoonList from '@components/webtoon-list';
import WebtoonService from '@services/webtoon-service';

interface WebtoonRecommendationSectionProps {
  webtoon: WebtoonDetails;
}

const WebtoonRecommendationSection: React.FC<WebtoonRecommendationSectionProps> = ({ webtoon }) => {
  const [similarWebtoons, setSimilarWebtoons] = useState<WebtoonSummary[]>([]);
  const [userSimilarWebtoons, setUserSimilarWebtoons] = useState<WebtoonSummary[]>([]);
  const [sameAuthorWebtoons, setSameAuthorWebtoons] = useState<WebtoonSummary[]>([]);
  const [randomWebtoons, setRandomWebtoons] = useState<WebtoonSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    const fetchRecommendations = async () => {
      try {
        const [sim, userSim, sameAuthor, random] = await Promise.all([
          WebtoonService.getSimilarWebtoons(webtoon.id),
          WebtoonService.getUserSimilarWebtoons(webtoon.id),
          WebtoonService.getSameAuthorWebtoons(webtoon.id),
          WebtoonService.getRandomWebtoons(4)
        ]);
        if (!isMounted) return;
        setSimilarWebtoons(sim.data || []);
        setUserSimilarWebtoons(userSim.data || []);
        setSameAuthorWebtoons(sameAuthor.data || []);
        setRandomWebtoons(random.data || []);
      } catch (e) {
        setError('추천 정보를 불러오지 못했습니다.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchRecommendations();
    return () => { isMounted = false; };
  }, [webtoon.id]);

  if (loading) return <div className={styles.loading}>추천 정보를 불러오는 중...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>추천 웹툰</h2>

      {/* 통합 유사도 웹툰 */}
      <div className={styles.recommendationSection}>
        <h3 className={styles.subtitle}>이 웹툰과 비슷한 웹툰</h3>
        <WebtoonList webtoons={similarWebtoons} />
      </div>

      {/* 유저 유사도 웹툰 */}
      <div className={styles.recommendationSection}>
        <h3 className={styles.subtitle}>이 웹툰을 좋아하는 사람들이 함께 본 웹툰</h3>
        <WebtoonList webtoons={userSimilarWebtoons} />
      </div>

      {/* 동일 작가 웹툰 */}
      <div className={styles.recommendationSection}>
        <h3 className={styles.subtitle}>같은 작가의 다른 웹툰</h3>
        <WebtoonList webtoons={sameAuthorWebtoons} />
      </div>

      {/* 랜덤 추천 웹툰 */}
      <div className={styles.recommendationSection}>
        <h3 className={styles.subtitle}>이런 웹툰은 어떠세요?</h3>
        <WebtoonList webtoons={randomWebtoons} />
      </div>
    </section>
  );
};

export default WebtoonRecommendationSection;
