import { Webtoon } from '@models/webtoon';

export interface Collection {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  webtoonCount: number;
  createdAt: string;
  webtoons: Webtoon[];
}

export const dummyCollections: Collection[] = [
  {
    id: 1,
    name: '액션 웹툰 모음',
    description: '긴장감 넘치는 액션 웹툰들을 모았습니다',
    thumbnail: 'https://via.placeholder.com/300x200/667eea/ffffff?text=Action',
    webtoonCount: 8,
    createdAt: '2024-01-15',
    webtoons: []
  },
  {
    id: 2,
    name: '로맨스 베스트',
    description: '달콤한 로맨스 웹툰 컬렉션',
    thumbnail: 'https://via.placeholder.com/300x200/f093fb/ffffff?text=Romance',
    webtoonCount: 12,
    createdAt: '2024-01-20',
    webtoons: []
  },
  {
    id: 3,
    name: '일상 웹툰',
    description: '편안하게 읽을 수 있는 일상 웹툰들',
    thumbnail: 'https://via.placeholder.com/300x200/4facfe/ffffff?text=Daily',
    webtoonCount: 6,
    createdAt: '2024-02-01',
    webtoons: []
  },
  {
    id: 4,
    name: '판타지 모험',
    description: '상상력을 자극하는 판타지 세계',
    thumbnail: 'https://via.placeholder.com/300x200/43e97b/ffffff?text=Fantasy',
    webtoonCount: 10,
    createdAt: '2024-02-10',
    webtoons: []
  }
]; 