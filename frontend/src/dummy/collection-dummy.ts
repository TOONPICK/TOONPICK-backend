import { Webtoon, Platform, SerializationStatus } from '@models/webtoon';
import { Collection } from '@models/collection';

// 컬렉션용 웹툰 더미 데이터
const collectionWebtoons: Webtoon[] = [
  {
    id: 101,
    title: '전지적 독자 시점',
    thumbnailUrl: 'https://via.placeholder.com/200x300/667eea/ffffff?text=Webtoon1',
    platform: Platform.NAVER,
    isAdult: false,
    status: SerializationStatus.ONGOING,
    publishDay: '월요일',
    authors: [{ id: 1, role: '작가', name: '슬리피-C' }],
    description: '소설 속 세계에 빙의한 독자의 이야기',
    genres: [{ id: 1, name: '액션' }, { id: 2, name: '판타지' }],
    totalRatings: 1250,
    averageRating: 4.8,
    similarWebtoons: null
  },
  {
    id: 102,
    title: '여신강림',
    thumbnailUrl: 'https://via.placeholder.com/200x300/f093fb/ffffff?text=Webtoon2',
    platform: Platform.NAVER,
    isAdult: false,
    status: SerializationStatus.ONGOING,
    publishDay: '화요일',
    authors: [{ id: 2, role: '작가', name: '야옹이' }],
    description: '화장을 하면 예뻐지는 여자의 이야기',
    genres: [{ id: 3, name: '로맨스' }, { id: 4, name: '일상' }],
    totalRatings: 980,
    averageRating: 4.6,
    similarWebtoons: null
  },
  {
    id: 103,
    title: '독립일기',
    thumbnailUrl: 'https://via.placeholder.com/200x300/4facfe/ffffff?text=Webtoon3',
    platform: Platform.NAVER,
    isAdult: false,
    status: SerializationStatus.ONGOING,
    publishDay: '수요일',
    authors: [{ id: 3, role: '작가', name: '자까' }],
    description: '독립한 후의 일상 이야기',
    genres: [{ id: 4, name: '일상' }, { id: 5, name: '에세이' }],
    totalRatings: 2100,
    averageRating: 4.9,
    similarWebtoons: null
  },
  {
    id: 104,
    title: '갓 오브 하이스쿨',
    thumbnailUrl: 'https://via.placeholder.com/200x300/43e97b/ffffff?text=Webtoon4',
    platform: Platform.NAVER,
    isAdult: false,
    status: SerializationStatus.ONGOING,
    publishDay: '목요일',
    authors: [{ id: 4, role: '작가', name: '박용제' }],
    description: '고등학생들의 격투 대회 이야기',
    genres: [{ id: 1, name: '액션' }, { id: 2, name: '판타지' }],
    totalRatings: 1560,
    averageRating: 4.7,
    similarWebtoons: null
  },
  {
    id: 105,
    title: '스위트홈',
    thumbnailUrl: 'https://via.placeholder.com/200x300/ff6b6b/ffffff?text=Webtoon5',
    platform: Platform.NAVER,
    isAdult: false,
    status: SerializationStatus.COMPLETED,
    publishDay: '금요일',
    authors: [{ id: 5, role: '작가', name: '김칸비' }],
    description: '아파트에서 벌어지는 생존 이야기',
    genres: [{ id: 6, name: '스릴러' }, { id: 7, name: '호러' }],
    totalRatings: 890,
    averageRating: 4.5,
    similarWebtoons: null
  },
  {
    id: 106,
    title: '나 혼자만 레벨업',
    thumbnailUrl: 'https://via.placeholder.com/200x300/667eea/ffffff?text=Webtoon6',
    platform: Platform.NAVER,
    isAdult: false,
    status: SerializationStatus.ONGOING,
    publishDay: '토요일',
    authors: [{ id: 6, role: '작가', name: '추공' }],
    description: '게임처럼 레벨업하는 현실 세계',
    genres: [{ id: 1, name: '액션' }, { id: 2, name: '판타지' }],
    totalRatings: 1780,
    averageRating: 4.8,
    similarWebtoons: null
  },
  {
    id: 107,
    title: '신의 탑',
    thumbnailUrl: 'https://via.placeholder.com/200x300/ffa726/ffffff?text=Webtoon7',
    platform: Platform.NAVER,
    isAdult: false,
    status: SerializationStatus.ONGOING,
    publishDay: '월요일',
    authors: [{ id: 7, role: '작가', name: 'SIU' }],
    description: '탑을 오르는 소년의 모험',
    genres: [{ id: 1, name: '액션' }, { id: 2, name: '판타지' }],
    totalRatings: 3200,
    averageRating: 4.9,
    similarWebtoons: null
  },
  {
    id: 108,
    title: '원피스',
    thumbnailUrl: 'https://via.placeholder.com/200x300/ff7043/ffffff?text=Webtoon8',
    platform: Platform.NAVER,
    isAdult: false,
    status: SerializationStatus.ONGOING,
    publishDay: '일요일',
    authors: [{ id: 8, role: '작가', name: '오다 에이치로' }],
    description: '해적왕을 꿈꾸는 소년의 모험',
    genres: [{ id: 1, name: '액션' }, { id: 2, name: '판타지' }],
    totalRatings: 4500,
    averageRating: 4.9,
    similarWebtoons: null
  }
];

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
    webtoons: collectionWebtoons.slice(0, 4)
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
    webtoons: collectionWebtoons.slice(1, 3)
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
    webtoons: collectionWebtoons.slice(2, 4)
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
    webtoons: collectionWebtoons.slice(0, 3)
  }
]; 