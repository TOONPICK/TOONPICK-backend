import { Episode } from './episode';

export enum Platform {
  NAVER = 'NAVER',
  KAKAO = 'KAKAO',
  KAKAOPAGE = 'KAKAOPAGE',
  LEZHIN = 'LEZHIN',
  BOMTOON = 'BOMTOON'
}

export type AgeRating = 'ALL' | 'TEEN' | 'ADULT';
export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export enum SerializationStatus {
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  HIATUS = 'HIATUS',
  ENDED = 'ENDED',
  PAUSED = 'PAUSED',
  UNKNOWN = 'UNKNOWN',
}

export enum PaidType {
  FREE = 'FREE',   
  PAID = 'PAID',  
  WAIT_FREE = 'WAIT_FREE',
  DAILY_FREE = 'DAILY_FREE'
}

export interface SeasonInfo {
  id: number | null;
  name: string | null;
  startDate: string | null;
  endDate: string | null;
  episodeCount: number | null;
  isActive: boolean | null; 
}

export interface WebtoonSummary {
  id: number;
  title: string;
  thumbnailUrl: string;
  platforms: Platform[];
  dayOfWeek: DayOfWeek;
  isAdult: boolean;
  status: SerializationStatus;
  authors: Author[];
  genres: Genre[];
  averageRating: number | null;
  ageRating: AgeRating | null;
  lastUpdateDate: string | null;
}

export interface WebtoonDetails {
  id: number;
  title: string;
  summary: string;
  status: string;
  dayOfWeek: string;
  thumbnailUrl: string;
  isAdult: boolean;
  ageRating: AgeRating | null;
  platforms: Platform[];
  genres: Genre[];
  authors: Author[];
  episodeCount: number;
  averageRating: number | null;
  publishStartDate: string | null;
  lastUpdateDate: string | null;
  episodes?: Episode[];
  seasons?: SeasonInfo[];
}

export interface Author {
  id: number;
  role : string;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface SimilarWebtoon {
  id: number;
  title: string;
  thumbnailUrl: string;
  platform: Platform;
  status: SerializationStatus;
  isAdult: boolean;
  averageRating: number;
  genres: Genre[];
}

export interface WebtoonResponse<T = any> {
  success: boolean;
  data?: T;
  total?: number;
  message?: string;
  error?: string;
}

export interface WebtoonAnalysisData {
  totalViews: number;
  totalSubscribers: number;
  averageViewTime: number; // 분 단위
  completionRate: number; // 완독률 (%)
  readerDemographics: {
    ageGroups: { age: string; percentage: number }[];
    genderDistribution: { gender: string; percentage: number }[];
    regionDistribution: { region: string; percentage: number }[];
  };
  ratingDistribution: { rating: number; count: number }[];
  reviewSentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  contentAnalysis: {
    genreDistribution: { genre: string; percentage: number }[];
    tagDistribution: { tag: string; count: number }[];
    characterPopularity: { character: string; popularity: number }[];
  };
  growthMetrics: {
    dailyViews: { date: string; count: number }[];
    dailySubscribers: { date: string; count: number }[];
    dailyComments: { date: string; count: number }[];
  };
  platformComparison: {
    platform: string;
    averageRating: number;
    totalViews: number;
  }[];
  predictionMetrics: {
    expectedGrowth: number; // 예상 성장률 (%)
    retentionRate: number; // 유지율 (%)
    churnRate: number; // 이탈률 (%)
  };
}