
// 홈/캐러셀 광고 타입
export interface CarouselAd {
  id: number;
  imageUrl: string;
  link: string;
  title: string;
  description?: string;
  // 광고 노출 우선순위 등 추가 필드 필요시 확장 가능
} 

