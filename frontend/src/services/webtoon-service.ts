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
      search?: string;
      platforms?: Platform[];
      genres?: string[];
      authors?: string[];
      publishDays?: DayOfWeek[];
      serializationStatuses?: SerializationStatus[];
      ageRatings?: AgeRating[];
    }
  ): Promise<PagedResponse<Webtoon[]>> {
    if (isDev) {
      // 개발 환경에서는 더미 데이터에서 필터링 시뮬레이션
      let filteredData = [...dummyWebtoonList];
      
      // 검색 필터링
      if (options.search) {
        const searchLower = options.search.toLowerCase();
        filteredData = filteredData.filter((webtoon: Webtoon) => 
          webtoon.title.toLowerCase().includes(searchLower) ||
          webtoon.authors?.some(author => 
            author.name.toLowerCase().includes(searchLower)
          ) ||
          webtoon.description?.toLowerCase().includes(searchLower) ||
          webtoon.genres?.some(genre => 
            genre.name.toLowerCase().includes(searchLower)
          )
        );
      }
      
      // 플랫폼 필터링
      if (options.platforms && options.platforms.length > 0) {
        filteredData = filteredData.filter((webtoon: Webtoon) => 
          options.platforms!.includes(webtoon.platform)
        );
      }
      
      // 장르 필터링 (성인 태그 제외)
      if (options.genres && options.genres.length > 0) {
        const nonAdultGenres = options.genres.filter(genre => genre !== '성인');
        if (nonAdultGenres.length > 0) {
          filteredData = filteredData.filter((webtoon: Webtoon) => 
            webtoon.genres?.some(genre => 
              nonAdultGenres.includes(genre.name)
            )
          );
        }
      }
      
      // 연재 상태 필터링
      if (options.serializationStatuses && options.serializationStatuses.length > 0) {
        filteredData = filteredData.filter((webtoon: Webtoon) => 
          options.serializationStatuses!.includes(webtoon.status)
        );
      }
      
      // 요일 필터링
      if (options.publishDays && options.publishDays.length > 0) {
        filteredData = filteredData.filter((webtoon: Webtoon) => 
          options.publishDays!.includes(webtoon.publishDay as DayOfWeek)
        );
      }
      
      // 성인 태그 필터링 (장르에 포함)
      if (options.genres && options.genres.includes('성인')) {
        const hasAdultGenre = options.genres.includes('성인');
        const otherGenres = options.genres.filter(genre => genre !== '성인');
        
        filteredData = filteredData.filter((webtoon: Webtoon) => {
          const matchesAdultFilter = hasAdultGenre ? webtoon.isAdult : true;
          const matchesOtherGenres = otherGenres.length === 0 || 
            webtoon.genres?.some(genre => otherGenres.includes(genre.name));
          return matchesAdultFilter && matchesOtherGenres;
        });
      }
      
      // 페이지네이션
      const page = options.page || 0;
      const size = options.size || PAGE_SIZE;
      const startIndex = page * size;
      const endIndex = startIndex + size;
      const paginatedData = filteredData.slice(startIndex, endIndex);
      
      return {
        success: true,
        data: paginatedData,
        total: filteredData.length,
        page: page,
        size: size,
        last: endIndex >= filteredData.length,
      };
    }
    try {
      const response = await api.post<PagedResponse<Webtoon[]>>('/api/v1/webtoons/filter', 
        {
          search: options.search,
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
