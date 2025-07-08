# TOONPICK 개발 가이드 & 컨벤션

이 문서는 TOONPICK 프로젝트의 개발자, 기여자, 팀원을 위한 실무 가이드입니다.

---

## 🧪 테스트 구조

```
src/test/java/com/toonpick/app/
├── unit/                    # 단위 테스트
│   └── service/            # 서비스 계층 단위 테스트
├── integration/            # 통합 테스트
│   └── service/            # 서비스 계층 통합 테스트
└── config/                 # 테스트 설정 및 커스텀 어노테이션
    ├── TestDataSourceConfig.java
    ├── UnitTest.java
    └── IntegrationTest.java
```

### 커스텀 어노테이션
- **@UnitTest**: 단위 테스트용 (Mockito 포함)
- **@IntegrationTest**: 통합 테스트용 (Spring Boot Test 포함)

---

## 📁 모듈 의존성

### Application Dependencies
- **toonpick-app-api**: 모든 도메인 + 내부 모듈
- **toonpick-app-admin**: 핵심 도메인 + 웹/보안 모듈
- **toonpick-app-worker**: 핵심 도메인 + SQS/웹훅 모듈

### Domain Dependencies
- 모든 도메인은 `module-common`에 의존
- 도메인 간 의존성은 최소화하여 설계

---

## 🔐 환경 설정

- **개발**: `application-dev.yml`
- **운영**: `application-prod.yml`
- **테스트**: `application-test.yml`

---

## 📊 모니터링

- **로그**: `./logs/` 디렉토리에 저장
- **헬스체크**: MongoDB 연결 상태 확인
- **메트릭**: Spring Boot Actuator 활용

---

## 🤝 코드 컨벤션

- **패키지**: `com.toonpick.{module}.{layer}`
- **클래스**: PascalCase
- **메서드**: camelCase
- **상수**: UPPER_SNAKE_CASE

---

## 🧪 테스트 작성

- **단위 테스트**: `@UnitTest` 어노테이션 사용
- **통합 테스트**: `@IntegrationTest` 어노테이션 사용
- **Given-When-Then** 패턴 준수

---

## 🏗️ 모듈 추가 가이드

1. `settings.gradle`에 모듈 추가
2. `build.gradle`에 의존성 설정
3. 적절한 패키지 구조 생성
4. 테스트 코드 작성

---

> 추가적인 개발/운영 관련 문서는 필요에 따라 docs/ 하위에 파일로 분리해 작성하세요. 