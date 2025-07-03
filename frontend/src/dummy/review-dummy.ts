import { Review } from '@models/review';

export const dummyReview: Review = {
  id: 1,
  webtoonId: 1,
  userId: '1',
  userName: '더미유저',
  profilePicture: '/images/profile/dummy.png',
  rating: 5,
  comment: '이것은 더미 리뷰입니다.',
  likes: 10,
  createdAt: '2024-01-01T00:00:00Z',
  modifiedAt: '2024-01-01T00:00:00Z',
};

export const dummyReviewList: Review[] = [
  dummyReview,
  {
    ...dummyReview,
    id: 2,
    comment: '두 번째 더미 리뷰',
    rating: 4,
    likes: 2,
  }
]; 