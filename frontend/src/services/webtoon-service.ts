import { api , Response, PagedResponse } from '@api';
import { Webtoon, Platform, SerializationStatus } from '@models/webtoon';
import { DayOfWeek, AgeRating } from '@models/enum';
import { dummyWebtoon, dummyWebtoonList } from '@dummy';

const PAGE_SIZE = 60;

const isDev = process.env.NODE_ENV === 'development';

// WebtoonService 클래스
class WebtoonService {
  private static instance: WebtoonService;

  private constructor() {}

  public static getInstance(): WebtoonService {
    if (!this.instance) {
      this.instance = new WebtoonService();
    }
    return this.instance;
  }

  // 웹툰 간단 정보 조회
  public async getWebtoonById(id: number): Promise<Response<Webtoon>> {
    if (isDev) {
      return { success: true, data: dummyWebtoon };
    }
    try {
      const response = await api.get<Webtoon>(`/api/v1/webtoons/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // 웹툰 상제 정보 조회
  public async getWebtoonDetails(id: number): Promise<Response<Webtoon>> {
    if (isDev) {
      return { success: true, data: dummyWebtoon };
    }
    try {
      const response = await api.get<Webtoon>(`/api/v1/webtoons/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // 웹툰 목록 조회
  public async getWebtoons(
    options: {
      page: number;
      size?: number;
      sortBy?: string;
      sortDir?: 'asc' | 'desc';
      platforms?: Platform[];
      genres?: string[];
      authors?: string[];
      publishDays?: DayOfWeek[];
      serializationStatuses?: SerializationStatus[];
      ageRatings?: AgeRating[];
    }
  ): Promise<PagedResponse<Webtoon[]>> {
    if (isDev) {
      return {
        success: true,
        data: dummyWebtoonList,
        total: dummyWebtoonList.length,
        page: options.page || 0,
        size: options.size || PAGE_SIZE,
        last: true,
      };
    }
    try {
      const response = await api.post<PagedResponse<Webtoon[]>>('/api/v1/webtoons/filter', 
        {
          platforms: options.platforms,
          genres: options.genres,
          authors: options.authors,
          publishDays: options.publishDays,
          serializationStatuses: options.serializationStatuses,
          ageRatings: options.ageRatings
        },
        {
          params: {
            page: options.page,
            size: options.size || PAGE_SIZE,
            sortBy: options.sortBy || 'title',
            sortDir: options.sortDir || 'asc',
          },
        }
      );

      const { data, totalElements, page: currentPage, size: pageSize, last } = response.data || {};

      return {
        success: true,
        data: data || [],
        total: totalElements || 0,
        page: currentPage || 0,
        size: pageSize || PAGE_SIZE,
        last: last || false,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // 인기 웹툰 조회
  public async getPopularWebtoons(size: number = 10): Promise<Response<Webtoon[]>> {
    if (isDev) {
      return { success: true, data: dummyWebtoonList.slice(0, size) };
    }
    try {
      const response = await api.get<Webtoon[]>(`/api/v1/webtoons/popular`, { params: { size } });
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // 최신 웹툰 조회
  public async getRecentWebtoons(size: number = 10): Promise<Response<Webtoon[]>> {
    if (isDev) {
      return { success: true, data: dummyWebtoonList.slice(0, size) };
    }
    try {
      const response = await api.get<Webtoon[]>(`/api/v1/webtoons/recent`, { params: { size } });
      return { success: true, data: response.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // 웹툰 검색
  public async searchWebtoons(query: string, size: number = 20): Promise<Response<Webtoon[]>> {
    if (isDev) {
      // 개발 환경에서는 더미 데이터에서 검색 시뮬레이션
      const searchResults = dummyWebtoonList.filter((webtoon: Webtoon) => 
        webtoon.title.toLowerCase().includes(query.toLowerCase()) ||
        webtoon.authors?.some(author => 
          author.name.toLowerCase().includes(query.toLowerCase())
        ) ||
        webtoon.description?.toLowerCase().includes(query.toLowerCase())
      );
      
      return { 
        success: true, 
        data: searchResults.slice(0, size),
        message: `${searchResults.length}개의 웹툰을 찾았습니다.`
      };
    }
    try {
      const response = await api.get<Webtoon[]>(`/api/v1/webtoons/search`, { 
        params: { 
          q: query,
          size 
        } 
      });
      return { 
        success: true, 
        data: response.data,
        message: `${response.data.length}개의 웹툰을 찾았습니다.`
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  // 오류 처리
  private handleError(error: any): { success: false; message: string } {
    console.error('API Error:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export default WebtoonService.getInstance();
