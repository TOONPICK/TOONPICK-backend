import { WebtoonSummary, Platform, SerializationStatus } from '@models/webtoon';
import { Collection } from '@models/collection';
import { generateDummyWebtoons } from '@dummy/webtoon-dummy';

export const dummyCollections: Collection[] = [
  {
    id: 1,
    name: '액션 웹툰 모음',
    description: '긴장감 넘치는 액션 웹툰들을 모았습니다. 강력한 주인공들과 박진감 넘치는 전투 장면을 즐겨보세요.',
    thumbnail: 'https://via.placeholder.com/300x200/667eea/ffffff?text=Action',
    webtoonCount: 4,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    isPublic: true,
    tags: ['액션', '판타지', '모험'],
    webtoons: generateDummyWebtoons(4)
  },
  {
    id: 2,
    name: '로맨스 베스트',
    description: '달콤한 로맨스 웹툰 컬렉션. 설렘 가득한 사랑 이야기들을 모았습니다.',
    thumbnail: 'https://via.placeholder.com/300x200/f093fb/ffffff?text=Romance',
    webtoonCount: 2,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-25',
    isPublic: true,
    tags: ['로맨스', '일상', '설렘'],
    webtoons: generateDummyWebtoons(2)
  },
  {
    id: 3,
    name: '일상 웹툰',
    description: '편안하게 읽을 수 있는 일상 웹툰들. 따뜻한 감동과 웃음을 선사합니다.',
    thumbnail: 'https://via.placeholder.com/300x200/4facfe/ffffff?text=Daily',
    webtoonCount: 2,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-05',
    isPublic: false,
    tags: ['일상', '에세이', '따뜻함'],
    webtoons: generateDummyWebtoons(2)
  },
  {
    id: 4,
    name: '판타지 모험',
    description: '상상력을 자극하는 판타지 세계. 마법과 모험이 가득한 이야기들을 만나보세요.',
    thumbnail: 'https://via.placeholder.com/300x200/43e97b/ffffff?text=Fantasy',
    webtoonCount: 3,
    createdAt: '2024-02-10',
    updatedAt: '2024-02-15',
    isPublic: true,
    tags: ['판타지', '모험', '마법'],
    webtoons: generateDummyWebtoons(3)
  }
]; 