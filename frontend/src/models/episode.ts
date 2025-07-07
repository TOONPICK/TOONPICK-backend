export interface EpisodeLink {
  id: number;
  platform: string;
  url: string;
  viewerType: string;
}

export interface Episode {
  id: number;
  webtoonId: number;
  seasonId?: number;
  episodeNumber: number;
  title?: string;
  pricingType: string;
  episodeUrls: EpisodeLink[];
}

export enum EpisodePricingType {
  FREE = 'FREE',
  PAID = 'PAID',
  COIN = 'COIN',
  SUBSCRIPTION = 'SUBSCRIPTION'
}

export enum EpisodeViewerType {
  WEB = 'WEB',
  MOBILE = 'MOBILE',
  APP = 'APP'
} 