<div align="center">
  <picture>
    <img src="https://raw.githubusercontent.com/ImGdevel/TOONPICK/main/docs/toonpick-header.png" alt="ToonPick 서비스 헤더" width="100%">
  </picture>
</div>

<div align="center">
<h3>내 취향의 재미있는 웹툰 찾기 힘드신가요? <br> TOONPICK 서비스에서 내 취향의 웹툰을 찾아보세요! </h3>
</div>

<br>

> 꾸준히 성장하는 웹툰 시장으로 현재 연재 및 완결된 웹툰을 합하면 1만 이상의 작품이 투고 되었습니다.  
> 하지만 공장 찍어내기 식 양산형 웹툰과 정확한 평가와 성향을 파악하기 어려운 현 웹툰 시장의 문제점을 해결하고자 TOONPICK 서비스 개발을 시작하였습니다.  
> **TOONPICK**은 다양한 플랫폼의 웹툰을 아카이브하고, **취향을 분석해 맞춤형 웹툰을 추천**합니다.  
> 직접 본 웹툰을 기록하고, 평가도 남기면서 **나만의 웹툰 라이브러리**를 만들어보세요!  
> 현재 **React + Spring**으로 개발 중이며, **AWS**에서 안정적인 배포를 준비하고 있습니다. 🚀  

---

## 🏗️ 프로젝트 구조

```
TOONPICK/
├── frontend/         # React 프론트엔드
├── backend/          # Spring Boot 백엔드 (멀티모듈)
│   ├── module-application/   # API, Admin, Worker 앱
│   ├── module-domain/        # 도메인(비즈니스 로직)
│   ├── module-internal/      # 내부 공통 모듈
│   └── module-common/        # 공통 유틸/예외 등
└── docs/             # 문서 및 아키텍처 이미지
```

---

## 🌟 주요 기능

- **웹툰 아카이브**: 다양한 플랫폼의 웹툰을 한 곳에서 탐색
- **취향 분석 및 맞춤 추천**: 내 기록을 바탕으로 한 개인화 추천
- **나만의 웹툰 라이브러리**: 내가 본/좋아하는 웹툰을 정리
- **회원/리뷰/컬렉션 관리**: 회원가입, 프로필, 리뷰, 컬렉션 등
- **관리자/배치/추천 시스템**: 관리자 기능, 배치 데이터 수집, 추천 알고리즘

---

## 🛠️ 기술 스택

- **Frontend**: React, TypeScript, CSS Modules
- **Backend**: Java 17, Spring Boot 3, Spring Data JPA, Gradle
- **DB/Infra**: MongoDB, Redis, AWS S3, AWS SQS, Docker
- **테스트**: JUnit 5, Mockito, H2

---

## 🗂️ 백엔드 멀티모듈 구조

- **module-application/**
  - `toonpick-app-api`: 사용자 API 서버 (8080)
  - `toonpick-app-admin`: 관리자 API 서버
  - `toonpick-app-worker`: 배치/스케줄링 서버
- **module-domain/**
  - `domain-webtoon`: 웹툰 정보/에피소드/작가
  - `domain-review`: 리뷰/평점
  - `domain-toon-collection`: 컬렉션/즐겨찾기
  - `domain-member`: 회원/프로필
  - `domain-auth`: 인증/권한
  - `domain-analysis`: 통계/분석
  - 기타 도메인(신고, 추천 등)
- **module-internal/**: 보안, 웹, SQS, 웹훅, 스토리지 등 공통 인프라
- **module-common/**: 유틸, 예외, 상수, 타입 등

---

## 🖼️ 서비스 아키텍처

<div align="center">
  <img src="https://github.com/TOONPICK/TOONPICK-backend/blob/main/docs/images/toonpick-service-architecture.png" alt="ToonPick 서비스 아키텍처" width="900">
</div>

---

## 👨‍💻 팀 & 문의

| 이름      | 역할     | GitHub Link                                         |
|-----------|----------|-----------------------------------------------------|
| ImGdvel   | Develop  | [ImGdevel](https://github.com/ImGdevel)             |
| DeusCodex | Support  | [deuscodex](https://github.com/deuscodex)           |

- 문의: [imdlsrks.mc@gmail.com](mailto:imdlsrks.mc@gmail.com)

---

## 📚 개발 가이드/컨벤션/테스트

- 상세 개발 가이드, 코드 컨벤션, 테스트 구조, 모듈 의존성 등은 [docs/README-dev-guide.md](docs/README-dev-guide.md) 참고

