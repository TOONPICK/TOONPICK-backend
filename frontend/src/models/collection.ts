import { WebtoonSummary } from './webtoon';

export interface Collection {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  webtoonCount: number;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  tags: string[];
  webtoons: WebtoonSummary[];
}

export interface CollectionCreateRequest {
  name: string;
  description: string;
  isPublic: boolean;
  tags: string[];
}

export interface CollectionUpdateRequest {
  name?: string;
  description?: string;
  isPublic?: boolean;
  tags?: string[];
}

export interface CollectionAddWebtoonRequest {
  webtoonIds: number[];
}

export interface CollectionRemoveWebtoonRequest {
  webtoonIds: number[];
} 