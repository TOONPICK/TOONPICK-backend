import { MemberProfile } from '@models/member';

export const dummyMemberProfile: MemberProfile = {
  username: 1,
  email: 'dummy@toonpick.com',
  nickname: '웹툰러버',
  profileImage: '/images/profile/default_profile_image.svg',
  level: 15,
  ratedWebtoons: 42,
  reviewedWebtoons: 28,
  collections: 5,
  readWebtoons: 156,
  points: 2840,
  bookmarkedWebtoons: 23,
  watchedWebtoons: 89,
  tutorial: true,
  badges: [
    {
      id: 1,
      name: '독서왕',
      icon: '/images/badges/reading-king.svg'
    },
    {
      id: 2,
      name: '리뷰마스터',
      icon: '/images/badges/review-master.svg'
    },
    {
      id: 3,
      name: '컬렉터',
      icon: '/images/badges/collector.svg'
    },
    {
      id: 4,
      name: '첫 리뷰',
      icon: '/images/badges/first-review.svg'
    },
    {
      id: 5,
      name: '100일 연속',
      icon: '/images/badges/100-days.svg'
    }
  ],
  preferences: {
    genrePreferences: [
      { name: '액션', value: 85 },
      { name: '로맨스', value: 72 },
      { name: '판타지', value: 68 },
      { name: '일상', value: 45 },
      { name: '스릴러', value: 38 },
      { name: '코미디', value: 65 }
    ],
    emotionalTags: ['긴장감', '설렘', '감동', '재미', '몰입감'],
    aiTags: ['강력한주인공', '복수극', '로맨틱코미디', '판타지세계관', '일상물']
  },
  favoriteWebtoons: [],
  masterpieceWebtoons: [],
  readingHistory: [],
  reviews: [],
  topReviews: [],
  connectedAccounts: {
    google: true,
    naver: false,
    kakao: true,
  },
  adultSettings: {
    goreFilter: true,
    adultContentFilter: false,
    violenceFilter: true,
  },
}; 