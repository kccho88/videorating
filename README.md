# 영상물 자체등급분류 검색 서비스

넷플릭스, 티빙, 쿠팡플레이, 디즈니+ 등의 자체등급분류 영상물 정보를 검색·조회할 수 있는 웹서비스입니다.

## 🎯 주요 기능

- 작품 제목 또는 사업자명으로 검색
- 검색 결과를 테이블 형태로 표시
- 항목 클릭 시 상세 정보 모달 표시
- 페이지네이션 지원
- 반응형 디자인

## 📁 기술 스택

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Shadcn UI** 컴포넌트
- **Axios** - API 호출
- **xml2js** - XML을 JSON으로 변환

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 API 키를 설정하세요:

```env
NEXT_PUBLIC_API_KEY=your_api_key_here
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📦 프로젝트 구조

```
.
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지
│   └── globals.css         # 글로벌 스타일
├── components/
│   ├── ui/                 # Shadcn UI 컴포넌트
│   ├── SearchBar.tsx       # 검색 UI
│   ├── RatingTable.tsx     # 결과 테이블
│   ├── DetailModal.tsx     # 상세 정보 모달
│   ├── Pagination.tsx      # 페이지네이션
│   └── Spinner.tsx         # 로딩 스피너
├── lib/
│   ├── fetchRating.ts      # API 호출 및 데이터 처리
│   └── utils.ts            # 유틸리티 함수
└── ...
```

## 🔑 API 정보

- **Endpoint**: `https://apis.data.go.kr/B551008/irating_v1/ir_search`
- **Method**: GET
- **Response Format**: XML → JSON 변환
- **주요 파라미터**:
  - `serviceKey`: API 인증키 (필수)
  - `pageNo`: 페이지 번호
  - `numOfRows`: 페이지당 결과 수
  - `title`: 작품 제목
  - `corpNm`: 사업자명

## 🎨 주요 화면

1. **검색 화면**: 제목과 사업자명 입력 필드
2. **결과 테이블**: 제목, 사업자, 등급, 분류일 표시
3. **상세 모달**: 줄거리, 내용정보표시항목, 감독, 주연 등 상세 정보

## 🛠️ 빌드

```bash
npm run build
npm start
```

## 📝 라이선스

This project is licensed under the MIT License.

