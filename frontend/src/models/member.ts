import { WebtoonSummary } from "./webtoon";
import { Review } from "./review";

export interface MemberProfile {
  username: number;
  email: string;
  nickname: string;
  profileImage: string | null;
  level: number;
  ratedWebtoons: number;
  reviewedWebtoons: number;
  collections: number;
  readWebtoons: number;
  points: number;
  bookmarkedWebtoons: number;
  watchedWebtoons: number;
  tutorial: boolean;
  bio?: string;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  privacySettings?: {
    profileVisibility: 'public' | 'friends' | 'private';
    showReadingHistory: boolean;
    showReviews: boolean;
    showCollections: boolean;
    allowMessages: boolean;
  };
  notificationPreferences?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  badges: {
    id: number;
    name: string;
    icon: string;
  }[];
  preferences: {
    genrePreferences: { name: string; value: number }[];
    emotionalTags: string[];
    aiTags: string[];
  };
  favoriteWebtoons: WebtoonSummary[];
  masterpieceWebtoons: WebtoonSummary[];
  readingHistory: {
    webtoon: WebtoonSummary;
    lastReadAt: string;
  }[];
  reviews: Review[];
  topReviews: Review[];
  connectedAccounts: {
    google: boolean;
    naver: boolean;
    kakao: boolean;
  };
  adultSettings: {
    goreFilter: boolean;
    adultContentFilter: boolean;
    violenceFilter: boolean;
  };
}