import { WebtoonSummary, WebtoonDetails, Platform, SerializationStatus, Genre, Author, PaidType, SeasonInfo, DayOfWeek } from '@models/webtoon';
import { AgeRating } from '@models/enum';
import { Episode, WebtoonEpisodeLink, EpisodePricingType, EpisodeViewerType } from '@models/episode';

// 단일 웹툰 더미 데이터
export const dummyWebtoon: WebtoonDetails = {
  id: 1,
  title: '더미 웹툰',
  thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
  platforms: [Platform.NAVER],
  isAdult: false,
  status: SerializationStatus.ONGOING,
  dayOfWeek: 'MONDAY',
  authors: [
    { id: 1, role: 'Writer', name: '홍길동' },
    { id: 2, role: 'Artist', name: '김작가' }
  ],
  summary: '이것은 더미 웹툰 설명입니다.\n이것은 더미 웹툰 설명입니다.이것은 더미 웹툰 설명입니다.\n이것은 더미 웹툰 설명입니다.\n이것은 더미 웹툰 설명입니다.이것은 더미 웹툰 설명입니다.\n\n\n\n\n\n이것은 더미 웹툰 설명입니다.이것은 더미 웹툰 설명입니다. ',
  genres: [
    { id: 1, name: '판타지' },
    { id: 2, name: '액션' }
  ],
  episodeCount: 100,
  averageRating: 4.5,
  publishStartDate: '2024-01-01',
  lastUpdateDate: '2024-01-01',
  ageRating: 'TEEN',
};

// 랜덤 요소를 위한 샘플 데이터
const titles = ['판타지 어드벤처', '로맨스의 왕', '액션 히어로', '코믹 라이프', '미스터리 나이트'];
const genresList = [
  [{ id: 1, name: '판타지' }, { id: 2, name: '액션' }],
  [{ id: 3, name: '로맨스' }, { id: 4, name: '드라마' }],
  [{ id: 5, name: '코미디' }, { id: 6, name: '일상' }],
];
const authorsList = [
  [{ id: 1, role: 'Writer', name: '홍길동' }, { id: 2, role: 'Artist', name: '김작가' }],
  [{ id: 3, role: 'Writer', name: '이몽룡' }, { id: 4, role: 'Artist', name: '성춘향' }],
];
const platformsArr = [[Platform.NAVER], [Platform.KAKAO], [Platform.LEZHIN]];
const days: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const ratings = [4.2, 4.5, 3.8, 5.0, 4.0];
const ageRatings: AgeRating[] = ['ALL', 'TEEN', 'ADULT'];

export function generateDummyWebtoons(count: number): WebtoonSummary[] {
  const arr: WebtoonSummary[] = [];
  for (let i = 1; i <= count; i++) {
    arr.push({
      id: i,
      title: titles[i % titles.length] + ' ' + i,
      thumbnailUrl: 'https://image-comic.pstatic.net/webtoon/837504/thumbnail/thumbnail_IMAG21_9a94b0bf-f6d4-4434-9cf2-6b690f7be56e.jpg',
      platforms: platformsArr[i % platformsArr.length],
      isAdult: ageRatings[i % ageRatings.length] === 'ADULT',
      status: SerializationStatus.ONGOING,
      dayOfWeek: days[i % days.length],
      authors: authorsList[i % authorsList.length],
      genres: genresList[i % genresList.length],
      averageRating: ratings[i % ratings.length],
      ageRating: ageRatings[i % ageRatings.length],
      lastUpdateDate: `2024-01-${(i % 28 + 1).toString().padStart(2, '0')}`,
    });
  }
  return arr;
}

export const dummyWebtoons: WebtoonSummary[] = generateDummyWebtoons(30);

// Dummy episode link generator
function generateDummyEpisodeLinks(episodeId: number): WebtoonEpisodeLink[] {
  return [
    {
      id: episodeId * 10 + 1,
      platform: Platform.NAVER,
      url: `https://comic.naver.com/webtoon/episode/${episodeId}`,
      viewerType: 'WEB',
    },
    {
      id: episodeId * 10 + 2,
      platform: Platform.KAKAO,
      url: `https://page.kakao.com/episode/${episodeId}`,
      viewerType: 'APP',
    },
  ];
}

// Dummy episode generator
export function generateDummyEpisodes(count: number, seasonId: number | null = null): Episode[] {
  const titles = ['프롤로그', '첫 만남', '의문의 사건', '진실의 시작', '반전', '위기', '결말'];
  const pricingTypes: EpisodePricingType[] = ['FREE', 'PAID', 'WAIT_FREE', 'DAILY_FREE'];
  const arr: Episode[] = [];
  for (let i = 1; i <= count; i++) {
    arr.push({
      id: i,
      seasonId: seasonId,
      episodeNumber: i,
      title: titles[i % titles.length] + ' ' + i,
      pricingType: pricingTypes[i % pricingTypes.length],
      episodeUrls: generateDummyEpisodeLinks(i),
    });
  }
  return arr;
}

export const dummyEpisodes: Episode[] = generateDummyEpisodes(10);