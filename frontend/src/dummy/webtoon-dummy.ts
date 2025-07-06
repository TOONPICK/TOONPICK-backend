import { Webtoon, Platform, SerializationStatus, Genre, Author } from '@models/webtoon';

// 단일 웹툰 더미 데이터
export const dummyWebtoon: Webtoon = {
  id: 1,
  title: '더미 웹툰',
  thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
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
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 1, role: 'Writer', name: '홍길동' },
      { id: 2, role: 'Artist', name: '김작가' }
    ],
    platform: Platform.KAKAO,
    publishDay: 'TUESDAY',
    genres: [{ id: 3, name: '로맨스' }],
    averageRating: 3.8
  },
  {
    ...dummyWebtoon,
    id: 3,
    title: '모험의 시작',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 1, role: 'Writer', name: '홍길동' },
      { id: 2, role: 'Artist', name: '김작가' }
    ],
    platform: Platform.LEZHIN,
    publishDay: 'WEDNESDAY',
    genres: [{ id: 4, name: '모험' }],
    averageRating: 4.2
  },
  {
    ...dummyWebtoon,
    id: 4,
    title: '스릴러 나이트',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 1, role: 'Writer', name: '홍길동' },
      { id: 2, role: 'Artist', name: '김작가' }
    ],
    platform: Platform.BOMTOON,
    publishDay: 'THURSDAY',
    genres: [{ id: 5, name: '스릴러' }],
    averageRating: 4.0
  },
  {
    ...dummyWebtoon,
    id: 5,
    title: '코믹 대소동',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 1, role: 'Writer', name: '홍길동' },
      { id: 2, role: 'Artist', name: '김작가' }
    ],
    platform: Platform.KAKAOPAGE,
    publishDay: 'FRIDAY',
    genres: [{ id: 6, name: '코미디' }],
    averageRating: 3.5
  },
  {
    ...dummyWebtoon,
    id: 6,
    title: '로맨틱 판타지',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 1, role: 'Writer', name: '홍길동' },
      { id: 2, role: 'Artist', name: '김작가' }
    ],
    platform: Platform.NAVER,
    publishDay: 'SATURDAY',
    genres: [{ id: 3, name: '로맨스' }, { id: 1, name: '판타지' }],
    averageRating: 4.8
  },
  {
    ...dummyWebtoon,
    id: 7,
    title: '액션 히어로',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 1, role: 'Writer', name: '홍길동' },
      { id: 2, role: 'Artist', name: '김작가' }
    ],
    platform: Platform.KAKAO,
    publishDay: 'SUNDAY',
    genres: [{ id: 2, name: '액션' }],
    averageRating: 4.1
  },
  {
    ...dummyWebtoon,
    id: 8,
    title: '드라마틱 라이프',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 1, role: 'Writer', name: '홍길동' },
      { id: 2, role: 'Artist', name: '김작가' }
    ],
    platform: Platform.LEZHIN,
    publishDay: 'MONDAY',
    genres: [{ id: 7, name: '드라마' }],
    averageRating: 3.9
  },
  {
    ...dummyWebtoon,
    id: 9,
    title: '미스터리 사건부',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 1, role: 'Writer', name: '홍길동' },
      { id: 2, role: 'Artist', name: '김작가' }
    ],
    platform: Platform.BOMTOON,
    publishDay: 'TUESDAY',
    genres: [{ id: 8, name: '미스터리' }],
    averageRating: 4.3
  },
  {
    ...dummyWebtoon,
    id: 10,
    title: 'SF 어드벤처',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 1, role: 'Writer', name: '홍길동' },
      { id: 2, role: 'Artist', name: '김작가' }
    ],
    platform: Platform.KAKAOPAGE,
    publishDay: 'WEDNESDAY',
    genres: [{ id: 9, name: 'SF' }],
    averageRating: 4.6
  },
  {
    ...dummyWebtoon,
    id: 11,
    title: '힐링 타임',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 1, role: 'Writer', name: '홍길동' },
      { id: 2, role: 'Artist', name: '김작가' }
    ],
    platform: Platform.NAVER,
    publishDay: 'THURSDAY',
    genres: [{ id: 10, name: '일상' }],
    averageRating: 4.9
  },
  {
    ...dummyWebtoon,
    id: 12,
    title: '스포츠 챔피언',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 3, role: 'Writer', name: '박스포츠' },
      { id: 4, role: 'Artist', name: '이운동' }
    ],
    platform: Platform.KAKAO,
    publishDay: 'FRIDAY',
    genres: [{ id: 11, name: '스포츠' }],
    averageRating: 4.2
  },
  {
    ...dummyWebtoon,
    id: 13,
    title: '학원 로맨스',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 5, role: 'Writer', name: '최학원' },
      { id: 6, role: 'Artist', name: '정청춘' }
    ],
    platform: Platform.LEZHIN,
    publishDay: 'SATURDAY',
    genres: [{ id: 3, name: '로맨스' }, { id: 12, name: '학원' }],
    averageRating: 4.7
  },
  {
    ...dummyWebtoon,
    id: 14,
    title: '무협전설',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 7, role: 'Writer', name: '김무협' },
      { id: 8, role: 'Artist', name: '이검법' }
    ],
    platform: Platform.BOMTOON,
    publishDay: 'SUNDAY',
    genres: [{ id: 13, name: '무협' }],
    averageRating: 4.4
  },
  {
    ...dummyWebtoon,
    id: 15,
    title: '호러 나이트',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 9, role: 'Writer', name: '박공포' },
      { id: 10, role: 'Artist', name: '최무서' }
    ],
    platform: Platform.KAKAOPAGE,
    publishDay: 'MONDAY',
    genres: [{ id: 14, name: '호러' }],
    averageRating: 4.1,
    isAdult: true
  },
  {
    ...dummyWebtoon,
    id: 16,
    title: '음악의 신',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 11, role: 'Writer', name: '김음악' },
      { id: 12, role: 'Artist', name: '이멜로디' }
    ],
    platform: Platform.NAVER,
    publishDay: 'TUESDAY',
    genres: [{ id: 15, name: '음악' }],
    averageRating: 4.3
  },
  {
    ...dummyWebtoon,
    id: 17,
    title: '요리 마스터',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 13, role: 'Writer', name: '박요리' },
      { id: 14, role: 'Artist', name: '최맛' }
    ],
    platform: Platform.KAKAO,
    publishDay: 'WEDNESDAY',
    genres: [{ id: 16, name: '요리' }],
    averageRating: 4.5
  },
  {
    ...dummyWebtoon,
    id: 18,
    title: '여행기',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 15, role: 'Writer', name: '김여행' },
      { id: 16, role: 'Artist', name: '이세계' }
    ],
    platform: Platform.LEZHIN,
    publishDay: 'THURSDAY',
    genres: [{ id: 17, name: '여행' }],
    averageRating: 4.0
  },
  {
    ...dummyWebtoon,
    id: 19,
    title: '동물 친구들',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 17, role: 'Writer', name: '박동물' },
      { id: 18, role: 'Artist', name: '최귀여' }
    ],
    platform: Platform.BOMTOON,
    publishDay: 'FRIDAY',
    genres: [{ id: 18, name: '동물' }],
    averageRating: 4.6
  },
  {
    ...dummyWebtoon,
    id: 20,
    title: '역사 탐험',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 19, role: 'Writer', name: '김역사' },
      { id: 20, role: 'Artist', name: '이과거' }
    ],
    platform: Platform.KAKAOPAGE,
    publishDay: 'SATURDAY',
    genres: [{ id: 19, name: '역사' }],
    averageRating: 4.2
  },
  {
    ...dummyWebtoon,
    id: 21,
    title: '완결된 이야기',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 21, role: 'Writer', name: '박완결' },
      { id: 22, role: 'Artist', name: '최끝' }
    ],
    platform: Platform.NAVER,
    publishDay: 'SUNDAY',
    genres: [{ id: 7, name: '드라마' }],
    averageRating: 4.8,
    status: SerializationStatus.COMPLETED
  },
  {
    ...dummyWebtoon,
    id: 22,
    title: '휴재 중인 웹툰',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 23, role: 'Writer', name: '김휴재' },
      { id: 24, role: 'Artist', name: '이쉬어' }
    ],
    platform: Platform.KAKAO,
    publishDay: 'MONDAY',
    genres: [{ id: 1, name: '판타지' }],
    averageRating: 4.0,
    status: SerializationStatus.HIATUS
  },
  {
    ...dummyWebtoon,
    id: 23,
    title: '성인 로맨스',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 25, role: 'Writer', name: '박성인' },
      { id: 26, role: 'Artist', name: '최로맨' }
    ],
    platform: Platform.LEZHIN,
    publishDay: 'TUESDAY',
    genres: [{ id: 3, name: '로맨스' }, { id: 20, name: '성인' }],
    averageRating: 4.3,
    isAdult: true
  },
  {
    ...dummyWebtoon,
    id: 24,
    title: '성인 스릴러',
    thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
    authors: [
      { id: 27, role: 'Writer', name: '김스릴' },
      { id: 28, role: 'Artist', name: '이공포' }
    ],
    platform: Platform.BOMTOON,
    publishDay: 'WEDNESDAY',
    genres: [{ id: 5, name: '스릴러' }, { id: 20, name: '성인' }],
    averageRating: 4.1,
    isAdult: true
  }
]; 