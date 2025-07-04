import React, { useState, useEffect } from 'react';
import { Webtoon } from '@models/webtoon';
import { Review, ReviewRequest } from '@models/review';
import { useAuth } from '@contexts/auth-context';
import { FiThumbsUp, FiFlag, FiStar, FiMessageCircle, FiClock } from 'react-icons/fi';
import webtoonReviewService from '@services/webtoon-review-service';
import styles from './style.module.css';

interface WebtoonRatingSectionProps {
  webtoon: Webtoon;
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
          {/* 평균 별점 카드 */}
          <div className={styles.averageRatingCard}>
            <div className={styles.ratingLabel}>평균 별점</div>
            <div className={styles.ratingScore}>
              <span className={styles.ratingNumber}>{averageRating.toFixed(1)}</span>
              <div className={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map(star => (
                  <FiStar 
                    key={star} 
                    className={`${styles.star} ${star <= Math.round(averageRating) ? styles.filled : ''}`}
                  />
                ))}
              </div>
            </div>
            <div className={styles.ratingStats}>
              <span className={styles.ratingCount}>{totalReviews}개의 별점</span>
            </div>
          </div>
          {/* 별점 분포 카드 */}
          <div className={styles.ratingDistributionCard}>
            <div className={styles.ratingLabel}>별점 분포</div>
            <div className={styles.ratingBarChart}>
              {[1,2,3,4,5].map(rating => {
                const count = ratingDistribution[rating] || 0;
                const max = Math.max(...[1,2,3,4,5].map(r => ratingDistribution[r] || 0), 1);
                return (
                  <div key={rating} className={styles.barCol}>
                    <div
                      className={styles.bar}
                      style={{
                        height: `${(count / max) * 100}%`,
                        background: rating === 5 ? '#6c63ff' : '#b3aaff',
                        opacity: 1,
                        border: '1px solid #333',
                        minHeight: count > 0 ? '8px' : '2px',
                        transition: 'height 0.5s cubic-bezier(0.4,0,0.2,1)'
                      }}
                    />
                    <span className={styles.barLabel}>{rating.toFixed(1)}</span>
                    <span style={{fontSize:10, color:'#888'}}>{count > 0 ? count : ''}</span>
                  </div>
                );
              })}
            </div>
            {totalReviews === 0 && (
              <div className={styles.noDistributionMsg}>아직 별점 데이터가 없습니다.</div>
            )}
          </div>
        </div>
      </div>

      {/* 리뷰 목록 섹션 */}
      <div className={styles.reviewsSection}>
        <div className={styles.reviewsHeader}>
          <h3 className={styles.reviewsTitle}>사용자 리뷰</h3>
          <div className={styles.sortOptions}>
            <button 
              className={`${styles.sortButton} ${sortBy === 'latest' ? styles.active : ''}`}
              onClick={() => setSortBy('latest')}
            >
              <FiClock />
              최신순
            </button>
            <button 
              className={`${styles.sortButton} ${sortBy === 'popular' ? styles.active : ''}`}
              onClick={() => setSortBy('popular')}
            >
              <FiThumbsUp />
              인기순
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner} />
            <p>리뷰를 불러오는 중...</p>
          </div>
        ) : reviews.length > 0 ? (
          <div className={styles.reviewsList}>
            {reviews.map(review => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <img 
                      src={review.profilePicture} 
                      alt={review.userName} 
                      className={styles.reviewerAvatar}
                    />
                    <div className={styles.reviewerDetails}>
                      <div className={styles.reviewerName}>{review.userName}</div>
                      <div className={styles.reviewMeta}>
                        <div className={styles.reviewRating}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <FiStar 
                              key={star} 
                              className={`${styles.reviewStar} ${star <= review.rating ? styles.filled : ''}`}
                            />
                          ))}
                        </div>
                        <span className={styles.reviewDate}>{formatDate(review.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.reviewActions}>
                    <button 
                      className={styles.likeButton}
                      onClick={() => handleLikeToggle(review.id)}
                    >
                      <FiThumbsUp />
                      <span className={styles.likeCount}>{review.likes}</span>
                    </button>
                    <div className={styles.moreButtonContainer}>
                      <button 
                        className={styles.moreButton}
                        onClick={() => setShowMoreMenu(review.id)}
                      >
                        <FiFlag />
                      </button>
                      {showMoreMenu === review.id && (
                        <div className={styles.moreMenu}>
                          <button 
                            className={styles.menuItem}
                            onClick={() => handleReport(review.id)}
                          >
                            <FiFlag />
                            신고하기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {review.comment && (
                  <div className={styles.reviewComment}>{review.comment}</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>💬</div>
            <p>아직 리뷰가 없습니다</p>
            <span>첫 번째 리뷰를 남겨보세요!</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default WebtoonRatingSection;