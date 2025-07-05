import { CarouselAd } from '../models/carousel-ad';
import { dummyCarouselAds } from '@dummy';
import { api } from '@api';

const isDev = process.env.NODE_ENV === 'development';

class CarouselAdService {
  private static instance: CarouselAdService;
  private constructor() {}
  public static getInstance(): CarouselAdService {
    if (!this.instance) {
      this.instance = new CarouselAdService();
    }
    return this.instance;
  }

  /**
   * 홈(캐러셀) 광고 목록을 조회합니다.
   * @returns {Promise<CarouselAd[]>} 광고 데이터 배열
   */
  public async getHomeAds(): Promise<CarouselAd[]> {
    if (isDev) {
      return dummyCarouselAds;
    }
    const res = await api.get<CarouselAd[]>('/api/v1/ads/home');
    return res.data;
  }
}

export default CarouselAdService.getInstance(); 