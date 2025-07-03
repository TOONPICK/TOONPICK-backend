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
  },
  {
    ...dummyWebtoon,
    id: 3,
    title: '모험의 시작',
    platform: Platform.LEZHIN,
    publishDay: 'WEDNESDAY',
    genres: [{ id: 4, name: '모험' }],
    averageRating: 4.2
  },
  {
    ...dummyWebtoon,
    id: 4,
    title: '스릴러 나이트',
    platform: Platform.BOMTOON,
    publishDay: 'THURSDAY',
    genres: [{ id: 5, name: '스릴러' }],
    averageRating: 4.0
  },
  {
    ...dummyWebtoon,
    id: 5,
    title: '코믹 대소동',
    platform: Platform.KAKAOPAGE,
    publishDay: 'FRIDAY',
    genres: [{ id: 6, name: '코미디' }],
    averageRating: 3.5
  },
  {
    ...dummyWebtoon,
    id: 6,
    title: '로맨틱 판타지',
    platform: Platform.NAVER,
    publishDay: 'SATURDAY',
    genres: [{ id: 3, name: '로맨스' }, { id: 1, name: '판타지' }],
    averageRating: 4.8
  },
  {
    ...dummyWebtoon,
    id: 7,
    title: '액션 히어로',
    platform: Platform.KAKAO,
    publishDay: 'SUNDAY',
    genres: [{ id: 2, name: '액션' }],
    averageRating: 4.1
  },
  {
    ...dummyWebtoon,
    id: 8,
    title: '드라마틱 라이프',
    platform: Platform.LEZHIN,
    publishDay: 'MONDAY',
    genres: [{ id: 7, name: '드라마' }],
    averageRating: 3.9
  },
  {
    ...dummyWebtoon,
    id: 9,
    title: '미스터리 사건부',
    platform: Platform.BOMTOON,
    publishDay: 'TUESDAY',
    genres: [{ id: 8, name: '미스터리' }],
    averageRating: 4.3
  },
  {
    ...dummyWebtoon,
    id: 10,
    title: 'SF 어드벤처',
    platform: Platform.KAKAOPAGE,
    publishDay: 'WEDNESDAY',
    genres: [{ id: 9, name: 'SF' }],
    averageRating: 4.6
  },
  {
    ...dummyWebtoon,
    id: 11,
    title: '힐링 타임',
    platform: Platform.NAVER,
    publishDay: 'THURSDAY',
    genres: [{ id: 10, name: '힐링' }],
    averageRating: 4.9
  }
]; 