import React, { useState, useEffect } from 'react';
import { WebtoonDetails } from '@models/webtoon';
import { Review, ReviewRequest } from '@models/review';
import { useAuth } from '@contexts/auth-context';
import { FiThumbsUp, FiFlag, FiStar, FiMessageCircle, FiClock } from 'react-icons/fi';
import webtoonReviewService from '@services/webtoon-review-service';
import styles from './style.module.css';
import AverageRatingWithDistribution from '@components/average-rating-with-distribution';
import ReviewList from '@components/review-list';

interface WebtoonRatingSectionProps {
  webtoon: WebtoonDetails;
}

const WebtoonRatingSection: React.FC<WebtoonRatingSectionProps> = ({ webtoon }) => {
  const { state } = useAuth();
  const [userRating, setUserRating] = useState<number>(0);
  const [userComment, setUserComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [showMoreMenu, setShowMoreMenu] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

  // 리뷰 데이터 로드
  useEffect(() => {
    loadReviews();
    if (state) {
      loadUserReview();
    }
  }, [webtoon.id, sortBy, state]);

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const response = await webtoonReviewService.getReviewsByWebtoon(
        webtoon.id, 
        sortBy, 
        0, 
        20
      );
      if (response.success && response.data) {
        setReviews(response.data);
      }
    } catch (error) {
      console.error('리뷰 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserReview = async () => {
    try {
      const response = await webtoonReviewService.getUserReviewForWebtoon(webtoon.id);
      if (response.success && response.data) {
        setUserReview(response.data);
        setUserRating(response.data.rating);
        setUserComment(response.data.comment);
      }
    } catch (error) {
      console.error('사용자 리뷰 로드 실패:', error);
    }
  };

  const handleRatingChange = async (rating: number) => {
    setUserRating(rating);
    // 별점만 바꿔도 서버에 바로 반영
    setIsSubmitting(true);
    try {
      const reviewData: ReviewRequest = {
        webtoonId: webtoon.id,
        rating,
        comment: userComment || ''
      };
      let response;
      if (userReview) {
        response = await webtoonReviewService.updateWebtoonReview(userReview.id, reviewData);
      } else {
        response = await webtoonReviewService.createWebtoonReview(webtoon.id, reviewData);
      }
      if (response.success && response.data) {
        setUserReview(response.data);
        setUserRating(response.data.rating);
        setUserComment(response.data.comment);
        await loadReviews();
        await loadUserReview();
      }
    } catch (error) {
      alert('별점 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserComment(e.target.value);
  };

  const handleSubmitReview = async () => {
    if (userRating === 0) {
      alert('평점을 선택해주세요.');
      return;
    }
    setIsSubmitting(true);
    try {
      const reviewData: ReviewRequest = {
        webtoonId: webtoon.id,
        rating: userRating,
        comment: userComment
      };
      let response;
      if (userReview) {
        response = await webtoonReviewService.updateWebtoonReview(userReview.id, reviewData);
      } else {
        response = await webtoonReviewService.createWebtoonReview(webtoon.id, reviewData);
      }
      if (response.success && response.data) {
        setUserReview(response.data);
        setUserComment(response.data.comment);
        await loadReviews();
        await loadUserReview();
        alert(userReview && userReview.comment ? '코멘트가 수정되었습니다.' : '코멘트가 등록되었습니다.');
      }
    } catch (error) {
      alert('코멘트 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeToggle = async (reviewId: number) => {
    try {
      await webtoonReviewService.toggleLikeForReview(reviewId);
      loadReviews(); // 리뷰 목록 새로고침
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '방금 전';
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}일 전`;
    
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleReport = (reviewId: number) => {
    console.log('신고:', reviewId);
    setShowMoreMenu(null);
  };

  // 평점 분포 계산
  const ratingDistribution = reviews.reduce((acc, review) => {
    const rating = Math.floor(review.rating);
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // 진단용 콘솔
  console.log('reviews:', reviews);
  console.log('ratingDistribution:', ratingDistribution);

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
    : 0;

  return (
    <section className={styles.section}>
      {/* 평점 요약 섹션 */}
      <div className={styles.ratingOverview}>
        <div className={styles.ratingHeader}>
          <h2 className={styles.sectionTitle}>평점 및 리뷰</h2>
          <div className={styles.ratingStats}>
            <span className={styles.ratingCount}>{totalReviews}개의 리뷰</span>
          </div>
        </div>
        <div className={styles.ratingContent3col}>
          {/* 내 별점 카드 */}
          <div className={styles.myRatingCard}>
            <div className={styles.ratingLabel}>내 별점</div>
            <div className={styles.myRatingScore}>{userRating > 0 ? userRating.toFixed(1) : '-'}</div>
            <div className={styles.myRatingStars}>
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  className={`${styles.starButton} ${star <= userRating ? styles.selected : ''}`}
                  onClick={() => handleRatingChange(star)}
                  type="button"
                  aria-label={`${star}점`}
                >
                  <FiStar />
                </button>
              ))}
            </div>
            <div className={styles.myRatingText}>{userRating > 0 ? '별점이 등록되었습니다.' : '아직 평가하지 않았어요'}</div>
          </div>
          {/* 평균 별점 + 분포 카드 */}
          <AverageRatingWithDistribution
            average={averageRating}
            total={totalReviews}
            distribution={ratingDistribution}
          />
        </div>
      </div>

      {/* 리뷰 목록 섹션 */}
      <ReviewList
        reviews={reviews}
        isLoading={isLoading}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onLikeToggle={handleLikeToggle}
        showMoreMenu={showMoreMenu}
        setShowMoreMenu={setShowMoreMenu}
        handleReport={handleReport}
        formatDate={formatDate}
      />
    </section>
  );
};

export default WebtoonRatingSection;