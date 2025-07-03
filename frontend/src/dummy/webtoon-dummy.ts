import { Webtoon, Platform, SerializationStatus, Genre, Author } from '@models/webtoon';

// 단일 웹툰 더미 데이터
export const dummyWebtoon: Webtoon = {
  id: 1,
  title: '더미 웹툰',
  thumbnailUrl: '/images/dummy-thumbnail.png',
  platform: Platform.NAVER,
  isAdult: false,
  status: SerializationStatus.ONGOING,
  publishDay: 'MONDAY',
  authors: [
    { id: 1, role: 'Writer', name: '홍길동' },
    { id: 2, role: 'Artist', name: '김작가' }
  ],
  description: '이것은 더미 웹툰 설명입니다.',
  genres: [
    { id: 1, name: '판타지' },
    { id: 2, name: '액션' }
  ],
  totalRatings: 100,
  averageRating: 4.5,
  similarWebtoons: null,
  analysisData: null
};

// 여러 웹툰 더미 데이터
export const dummyWebtoonList: Webtoon[] = [
  dummyWebtoon,
  {
    ...dummyWebtoon,
    id: 2,
    title: '더미 웹툰2',
    platform: Platform.KAKAO,
    publishDay: 'TUESDAY',
    genres: [{ id: 3, name: '로맨스' }],
    averageRating: 3.8
  }
]; 