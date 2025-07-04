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

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
    if (!userReview) {
      setShowCommentForm(true);
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
        setShowCommentForm(false);
        loadReviews(); // 리뷰 목록 새로고침
        alert(userReview ? '평가가 수정되었습니다.' : '평가가 등록되었습니다.');
      }
    } catch (error) {
      console.error('평가 제출 실패:', error);
      alert('평가 제출에 실패했습니다.');
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

        <div className={styles.ratingContent}>
          <div className={styles.averageRatingCard}>
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
            <div className={styles.ratingDistribution}>
              {[5, 4, 3, 2, 1].map(rating => {
                const count = ratingDistribution[rating] || 0;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={rating} className={styles.ratingBar}>
                    <span className={styles.ratingLabel}>{rating}점</span>
                    <div className={styles.barContainer}>
                      <div 
                        className={styles.barFill} 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className={styles.ratingCount}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 사용자 평가 섹션 */}
          {state ? (
            <div className={styles.userRatingCard}>
              <div className={styles.userRatingHeader}>
                <h3 className={styles.userRatingTitle}>
                  {userReview ? '내 평가 수정' : '평가하기'}
                </h3>
                {userReview && (
                  <span className={styles.editBadge}>수정</span>
                )}
              </div>
              
              <div className={styles.ratingInput}>
                <div className={styles.starRating}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      className={`${styles.starButton} ${star <= userRating ? styles.selected : ''}`}
                      onClick={() => handleRatingChange(star)}
                      type="button"
                    >
                      <FiStar />
                    </button>
                  ))}
                </div>
                <span className={styles.ratingText}>
                  {userRating > 0 ? `${userRating}점을 선택했습니다` : '평점을 선택해주세요'}
                </span>
              </div>

              {userRating > 0 && (
                <div className={styles.commentSection}>
                  {!showCommentForm && !userReview ? (
                    <button 
                      className={styles.addCommentButton}
                      onClick={() => setShowCommentForm(true)}
                    >
                      <FiMessageCircle />
                      코멘트 추가하기
                    </button>
                  ) : (
                    <div className={styles.commentForm}>
                      <textarea
                        className={styles.commentTextarea}
                        value={userComment}
                        onChange={handleCommentChange}
                        placeholder="이 웹툰에 대한 의견을 자유롭게 남겨주세요."
                        rows={4}
                      />
                      <div className={styles.commentActions}>
                        <button
                          className={styles.cancelButton}
                          onClick={() => {
                            setShowCommentForm(false);
                            if (!userReview) {
                              setUserComment('');
                            }
                          }}
                        >
                          취소
                        </button>
                        <button
                          className={styles.submitButton}
                          onClick={handleSubmitReview}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? '처리중...' : (userReview ? '수정하기' : '등록하기')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className={styles.loginPrompt}>
              <p>평가를 남기려면 로그인이 필요합니다</p>
            </div>
          )}
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