import { MemberProfile } from '@models/member';

export const dummyMemberProfile: MemberProfile = {
  username: 1,
  email: 'dummy@toonpick.com',
  nickname: '더미유저',
  profileImage: '/images/profile/dummy.png',
  level: 1,
  ratedWebtoons: 0,
  reviewedWebtoons: 0,
  collections: 0,
  readWebtoons: 0,
  points: 0,
  bookmarkedWebtoons: 0,
  watchedWebtoons: 0,
  badges: [],
  preferences: {
    genrePreferences: [],
    emotionalTags: [],
    aiTags: [],
  },
  favoriteWebtoons: [],
  masterpieceWebtoons: [],
  readingHistory: [],
  reviews: [],
  topReviews: [],
  connectedAccounts: {
    google: false,
    naver: false,
    kakao: false,
  },
  adultSettings: {
    goreFilter: false,
    adultContentFilter: false,
    violenceFilter: false,
  },
}; 