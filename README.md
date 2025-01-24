# 🎬 MovieBox - 영화와 TV 프로그램 탐색기 🍿

![MovieBox 로고](./assets/moviebox-logo.png)

**MovieBox**는 영화와 TV 프로그램 정보를 탐색할 수 있는 간단한 웹 애플리케이션입니다.  
이 프로젝트는 React와 API 통신을 활용한 데이터 중심의 웹 애플리케이션 개발 경험을 쌓기 위해 제작되었습니다.  
🎥 여러분의 "오늘 뭐 볼까?" 고민을 MovieBox와 함께 해결해 보세요!  

---

## 🌐 데모 바로가기  
👉 [MovieBox 데모](https://your-demo-link.com)  

### **사용 예제**  
- 🔍 **영화 검색**: 검색창에 "Inception"을 입력해 보세요.  
- 📅 **최신 영화 탐색**: 홈 화면에서 "최신 개봉작" 섹션 확인.  
- ❤️ **찜하기**: 마음에 드는 영화/TV 프로그램을 찜 목록에 추가해 보세요.  

---

## 🛠 프로젝트 개요

### **📌 프로젝트 소개**  
MovieBox는 TMDB API를 기반으로 영화와 TV 프로그램 정보를 제공하며, 사용자 친화적인 UI/UX를 통해 쉽게 탐색할 수 있습니다.  

### **📌 학습 목적**
1. **React** 기반 컴포넌트 설계 및 데이터 관리.
2. **React Query**를 활용한 API 연동 및 데이터 캐싱.
3. **UI/UX 디자인 개선**을 통한 사용자 경험 최적화.
4. **버전 관리 및 배포**를 통해 Github 협업 연습.

### **📌 느낀 점 및 배운 점**
- API 데이터 연동을 통해 비동기 처리에 대한 이해가 깊어졌습니다.
- 사용자 친화적인 인터페이스를 구현하며 **CSS 설계의 중요성**을 배웠습니다.
- 실시간 데이터 처리를 다루며 React Query의 효율성을 경험할 수 있었습니다.

---

## 📸 주요 화면

| 홈 화면 | 디테일 페이지 | TV 프로그램 |
|---------|---------------|-------------|
| ![홈 화면]([./screenshots/home.png](https://github.com/user-attachments/assets/d8bcd7dd-9a37-4b67-8640-1528d271783f)) | ![디테일 페이지](./screenshots/detail.png) | ![TV 프로그램](./screenshots/tv.png) |

---

## 🎁 주요 기능  

### **영화 관련**
- 🎥 인기 영화 및 높은 평점 영화 탐색.
- 📅 최신 개봉작과 개봉 예정작 확인.
- 🔍 검색 기능으로 영화 제목, 감독, 배우 탐색.

### **TV 프로그램 관련**
- 📺 인기 TV 프로그램 및 높은 평점 TV 프로그램 탐색.
- 📅 오늘 방영되는 TV 프로그램 확인.

### **사용자 기능**
- ❤️ 찜 목록 추가 및 관리.
- 🎞️ 유튜브 트레일러 확인 (모달 형태).
- 👤 사용자 정보 수정 기능.

---
## 📂 프로젝트 디렉토리 구조

```plaintext
MovieBox/
├── public/                # 정적 파일 (favicon, index.html 등)
├── src/
│   ├── assets/            # 이미지 및 아이콘
│   ├── common/            # 공통 컴포넌트 (MovieCard, TvCard 등)
│   ├── hooks/             # React Query 기반 커스텀 훅
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── HomePage/      # 홈 화면
│   │   ├── MovieDetail/   # 영화 상세 페이지
│   │   ├── TVDetail/      # TV 상세 페이지
│   │   ├── MyPage/        # 사용자 관리 페이지
│   ├── utils/             # API 연동 및 헬퍼 함수
│   ├── App.js             # 메인 라우팅
│   ├── index.js           # React 엔트리 포인트
├── .env                   # 환경 변수 파일
├── package.json           # 의존성 및 스크립트
└── README.md              # 프로젝트 설명
---

## 📚 사용한 기술 및 라이브러리  

### **Frontend**
- **React**: 컴포넌트 기반 UI 라이브러리.
- **React Router**: 페이지 네비게이션 관리.
- **React Query**: API 데이터 상태 관리 및 캐싱.
- **React Bootstrap**: UI 컴포넌트 라이브러리.
- **react-multi-carousel**: 콘텐츠 슬라이더 구성.

### **API**
- **TMDB (The Movie Database)**: 영화 및 TV 프로그램 데이터 제공.

### **CSS 및 스타일링**
- **Custom CSS**: 프로젝트 전용 스타일링.
- **Google Fonts**: Noto Sans와 Poppins 폰트를 사용하여 세련된 텍스트 스타일 적용.

---
