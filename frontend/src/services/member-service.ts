import { api, Response } from '@api';
import { MemberProfile } from '@models/member';
import { WebtoonSummary } from '@models/webtoon';
import { 
  dummyMemberProfile, 
  dummyCollections, 
  Collection,
  generateDummyWebtoons,
  dummyReviewList
} from '@dummy';

const isDev = process.env.NODE_ENV === 'development';

class MemberService {
  private static instance: MemberService;

  private constructor() {}

  public static getInstance(): MemberService {
    if (!MemberService.instance) {
      MemberService.instance = new MemberService();
    }
    return MemberService.instance;
  }

  // 사용자 프로필 정보 가져오기
  public async getMemberProfile(): Promise<Response<MemberProfile>> {
    if (isDev) {
      // 더미 데이터 조합
      const enrichedProfile = {
        ...dummyMemberProfile,
        favoriteWebtoons: generateDummyWebtoons(5),
        masterpieceWebtoons: generateDummyWebtoons(3),
        readingHistory: generateDummyWebtoons(8).map((webtoon: any, index: number) => ({
          webtoon,
          lastReadAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString()
        })),
        reviews: dummyReviewList.slice(0, 10),
        topReviews: dummyReviewList.slice(0, 3),
      };
      return { success: true, data: enrichedProfile };
    }
    try {
      const response = await api.get<MemberProfile>('/api/secure/member/profile');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching member profile:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // 북마크한 웹툰 목록 가져오기
  public async getBookmarkedWebtoons(): Promise<Response<WebtoonSummary[]>> {
    if (isDev) {
      return { success: true, data: generateDummyWebtoons(5) };
    }
    try {
      const response = await api.get<WebtoonSummary[]>('/api/secure/member/bookmarks');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching bookmarked webtoons:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // 컬렉션 목록 가져오기
  public async getCollections(): Promise<Response<Collection[]>> {
    if (isDev) {
      return { success: true, data: dummyCollections };
    }
    try {
      const response = await api.get<Collection[]>('/api/secure/member/collections');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching collections:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // 명작 웹툰 목록 가져오기
  public async getMasterpieceWebtoons(): Promise<Response<WebtoonSummary[]>> {
    if (isDev) {
      return { success: true, data: dummyMemberProfile.masterpieceWebtoons || [] };
    }
    try {
      const response = await api.get<WebtoonSummary[]>('/api/secure/member/masterpieces');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching masterpiece webtoons:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // 사용자 기본 정보(성별, 연령대, 나이) 업데이트
  public async updateBasicInfo({ 
    gender, 
    ageGroup, 
    ageDigit 
  }: { 
    gender: 'male' | 'female' | 'other' | 'prefer_not_to_say'; 
    ageGroup: string; 
    ageDigit: number 
  }): Promise<Response<MemberProfile>> {
    if (isDev) {
      // dev에서는 dummyProfile에 반영해서 반환
      const updatedProfile = { ...dummyMemberProfile, gender, ageGroup, ageDigit };
      return { success: true, data: updatedProfile };
    }
    try {
      const response = await api.post<MemberProfile>('/api/secure/member/basic-info', { gender, ageGroup, ageDigit });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error updating basic info:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // 사용자 프로필 이미지 업데이트
  public async updateProfileImage(file: File): Promise<Response<string>> {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post<string>('/api/secure/member/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error uploading profile image:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // 관심 웹툰 추가
  public async addFavoriteWebtoon(webtoonId: number): Promise<Response> {
    try {
      await api.post(`/api/secure/member/favorites/${webtoonId}`);
      return { success: true };
    } catch (error) {
      console.error('Error adding favorite webtoon:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // 관심 웹툰 삭제
  public async removeFavoriteWebtoon(webtoonId: number): Promise<Response> {
    try {
      await api.delete(`/api/secure/member/favorites/${webtoonId}`);
      return { success: true };
    } catch (error) {
      console.error('Error removing favorite webtoon:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // 관심 웹툰 목록 가져오기
  public async getFavorites(): Promise<Response<WebtoonSummary[]>> {
    try {
      const response = await api.get<WebtoonSummary[]>(`/api/secure/member/favorites`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // 웹툰이 관심 웹툰인지 확인
  public async isFavoriteWebtoon(webtoonId: number): Promise<Response<boolean>> {
    try {
      const response = await api.get<boolean>(`/api/secure/member/favorites/${webtoonId}/is-favorite`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error checking favorite webtoon:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // 튜토리얼 완료 처리
  public async completeTutorial(): Promise<Response<MemberProfile>> {
    if (isDev) {
      const updatedProfile = { ...dummyMemberProfile, tutorial: true };
      return { success: true, data: updatedProfile };
    }
    try {
      const response = await api.post<MemberProfile>('/api/secure/member/tutorial/complete');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error completing tutorial:', error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}

export default MemberService.getInstance();