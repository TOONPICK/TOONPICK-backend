// Webtoon episode related types
import { Platform } from './webtoon';

export type EpisodePricingType = 'FREE' | 'PAID' | 'WAIT_FREE' | 'DAILY_FREE';
export type EpisodeViewerType = 'WEB' | 'APP' | 'EXTERNAL';

export interface WebtoonEpisodeLink {
  id: number;
  platform: Platform;
  url: string;
  viewerType: EpisodeViewerType;
}

export interface Episode {
  id: number;
  seasonId: number | null;
  episodeNumber: number;
  title: string;
  pricingType: EpisodePricingType;
  episodeUrls: WebtoonEpisodeLink[];
} 