# 🎨 TOONPICK Frontend

웹툰 추천 및 리뷰 플랫폼 TOONPICK의 프론트엔드 애플리케이션입니다.

## 📋 목차

- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [주요 기능](#주요-기능)
- [설치 및 실행](#설치-및-실행)
- [개발 가이드](#개발-가이드)
- [컨벤션](#컨벤션)

## 🛠 기술 스택

### Core
- **React 18.3.1** - UI 라이브러리
- **TypeScript 4.9.5** - 정적 타입 지원
- **React Router DOM 6.26.0** - 클라이언트 사이드 라우팅

### UI & Styling
- **Styled Components 6.1.13** - CSS-in-JS 스타일링
- **React Icons 5.3.0** - 아이콘 라이브러리
- **CSS Modules** - 컴포넌트별 스타일 격리

### Data Visualization
- **Recharts 2.15.2** - 차트 라이브러리
- **React Chart.js 2 5.3.0** - Chart.js React 래퍼

### HTTP & State Management
- **Axios 1.7.7** - HTTP 클라이언트
- **JS Cookie 3.0.5** - 쿠키 관리
- **React Context API** - 전역 상태 관리

### Development Tools
- **Create React App** - React 개발 환경
- **CRACO 7.1.0** - CRA 설정 오버라이드
- **React Intersection Observer 9.16.0** - 뷰포트 감지

## 📁 프로젝트 구조

```
src/
├── api/                    # API 관련 타입 및 설정
│   ├── api.ts             # API 클라이언트 설정
│   ├── index.ts           # API 함수들
│   └── types.ts           # API 응답 타입
├── components/            # 재사용 가능한 UI 컴포넌트
│   ├── achievement-item/  # 업적 아이템 컴포넌트
│   ├── carousel/          # 캐러셀 컴포넌트
│   ├── error-modal/       # 에러 모달
│   ├── favorite-button/   # 즐겨찾기 버튼
│   ├── header/            # 헤더 컴포넌트
│   ├── level-display/     # 레벨 표시
│   ├── notification/      # 알림 컴포넌트
│   ├── pagination/        # 페이지네이션
│   ├── platform-icon/     # 플랫폼 아이콘
│   ├── profile-icon/      # 프로필 아이콘
│   ├── search-bar/        # 검색바
│   ├── sort-options/      # 정렬 옵션
│   ├── spinner/           # 로딩 스피너
│   ├── star-rating/       # 별점 평가
│   ├── status-badge/      # 상태 배지
│   ├── webtoon-card/      # 웹툰 카드
│   ├── webtoon-grid/      # 웹툰 그리드
│   ├── webtoon-list/      # 웹툰 리스트
│   ├── webtoon-review-card/ # 웹툰 리뷰 카드
│   └── webtoon-tag/       # 웹툰 태그
├── constants/             # 상수 정의
│   └── routes.ts          # 라우트 경로 상수
├── contexts/              # React Context
│   ├── auth-context/      # 인증 상태 관리
│   └── modal-context/     # 모달 상태 관리
├── dummy/                 # 더미 데이터
│   ├── carousel-ad-dummy.ts
│   ├── member-dummy.ts
│   ├── review-dummy.ts
│   └── webtoon-dummy.ts
├── models/                # 데이터 모델 정의
│   ├── carousel-ad.ts
│   ├── enum.ts
│   ├── member.ts
│   ├── review.ts
│   └── webtoon.ts
├── pages/                 # 페이지 컴포넌트
│   ├── auth/              # 인증 관련 페이지
│   │   ├── login/         # 로그인
│   │   ├── signup/        # 회원가입
│   │   └── sociallogin-callback-page/ # 소셜 로그인 콜백
│   ├── error/             # 에러 페이지
│   ├── home/              # 홈 페이지
│   ├── tutorial/          # 튜토리얼 페이지
│   ├── user/              # 사용자 관련 페이지
│   │   ├── adult-verification/    # 성인 인증
│   │   ├── masterpiece-webtoons/  # 명작 웹툰
│   │   ├── notification-settings/ # 알림 설정
│   │   ├── profile/               # 프로필
│   │   ├── profile-edit/          # 프로필 편집
│   │   └── reading-history/       # 읽기 기록
│   └── webtoon/           # 웹툰 관련 페이지
│       ├── ongoing-webtoons/      # 연재중 웹툰
│       └── webtoon-details/       # 웹툰 상세
├── services/              # 비즈니스 로직 서비스
│   ├── auth-service.ts    # 인증 서비스
│   ├── carousel-ad-service.ts # 캐러셀 광고 서비스
│   ├── member-service.ts  # 회원 서비스
│   ├── token-manager.ts   # 토큰 관리
│   ├── token-refresher.ts # 토큰 갱신
│   ├── webtoon-review-service.ts # 웹툰 리뷰 서비스
│   └── webtoon-service.ts # 웹툰 서비스
├── styles/                # 전역 스타일
│   ├── global.css         # 전역 CSS
│   ├── style.css          # 공통 스타일
│   └── theme.css          # 테마 설정
├── types/                 # 타입 정의
│   └── js-cookie.d.ts     # JS Cookie 타입
├── utils/                 # 유틸리티 함수
│   └── logger.ts          # 로깅 유틸
├── App.tsx                # 메인 앱 컴포넌트
└── index.tsx              # 앱 진입점
```

## 🚀 주요 기능

### 🔐 인증 시스템
- 일반 로그인/회원가입
- 소셜 로그인 (카카오, 네이버, 구글, 애플)
- JWT 토큰 기반 인증
- 자동 토큰 갱신

### 📚 웹툰 서비스
- 웹툰 목록 조회 (연재중, 완결)
- 웹툰 상세 정보
- 웹툰 검색 및 필터링
- 플랫폼별 분류 (네이버웹툰, 카카오웹툰, 카카오페이지, 레진코믹스)

### ⭐ 리뷰 시스템
- 웹툰 별점 평가
- 리뷰 작성 및 조회
- 리뷰 신고 기능

### 👤 사용자 기능
- 프로필 관리
- 읽기 기록
- 즐겨찾기 웹툰
- 명작 웹툰 컬렉션
- 알림 설정
- 성인 인증

### 🎯 추천 시스템
- 개인화된 웹툰 추천
- 유사 웹툰 추천
- 장르별 추천

### 📊 데이터 시각화
- 사용자 활동 통계
- 웹툰 평가 분포 차트
- 읽기 패턴 분석

### 🎮 게임화 요소
- 사용자 레벨 시스템
- 업적 시스템
- 튜토리얼 가이드

## 🛠 설치 및 실행

### Prerequisites
- Node.js 16.0.0 이상
- npm 또는 yarn

### 설치
```bash
# 의존성 설치
npm install
```

### 개발 서버 실행
```bash
# 개발 모드로 실행
npm start
```

### 빌드
```bash
# 프로덕션 빌드
npm run build
```

### 테스트
```bash
# 테스트 실행
npm test
```

## 🔧 개발 가이드

### 환경 설정
- **CRACO**를 사용하여 CRA 설정을 커스터마이징
- **절대 경로** 별칭 설정으로 import 경로 단순화
- **TypeScript** 설정으로 타입 안정성 확보

### 코드 구조
- **컴포넌트 기반** 아키텍처
- **관심사 분리**를 위한 서비스 레이어
- **Context API**를 활용한 상태 관리
- **CSS Modules**로 스타일 격리

### API 통신
- **Axios** 기반 HTTP 클라이언트
- **인터셉터**를 통한 토큰 자동 첨부
- **에러 핸들링** 및 재시도 로직

## 📝 컨벤션

### 파일명 규칙
- **컴포넌트**: `kebab-case.tsx` 또는 `PascalCase.tsx`
- **스타일**: `ComponentName.module.css`
- **서비스**: `kebab-case.ts`
- **타입**: `kebab-case.ts`

### 네이밍 컨벤션
- **변수/함수**: `camelCase`
- **컴포넌트**: `PascalCase`
- **상수**: `UPPER_SNAKE_CASE`
- **파일/폴더**: `kebab-case`

### 디렉터리 구조
- **components/**: 재사용 가능한 UI 컴포넌트
- **pages/**: 라우트 단위 페이지 컴포넌트
- **services/**: API 호출 및 비즈니스 로직
- **types/**: 공통 타입 정의
- **utils/**: 유틸리티 함수

## 🔗 관련 링크

- [프로젝트 컨벤션 가이드](./pt.txt)
- [API 문서](./docs/api.md)
- [컴포넌트 문서](./docs/components.md)

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
