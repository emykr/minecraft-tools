# 🚀 tools.emykr.xyz 배포 가이드

## 📋 배포 전 체크리스트

### ✅ 완료된 작업
- [x] 모던한 UI 디자인 적용 (글래스 모피즘)
- [x] 환경 변수 설정 (.env.production, .env.development)
- [x] SEO 최적화 (meta tags, Open Graph, Twitter Cards)
- [x] PWA 설정 (site.webmanifest)
- [x] 아이콘 생성 (SVG 기반)
- [x] Sitemap.xml 생성
- [x] Robots.txt 설정
- [x] 성능 최적화 (코드 스플리팅, 압축, 캐싱)
- [x] 배포 설정 파일 (netlify.toml, vercel.json)
- [x] 푸터에 버전 정보 추가

### 🔧 수동 작업 필요 (Node.js 설치 후)
- [ ] PNG 아이콘 생성: `npm install sharp --save-dev && npm run generate-icons`
- [ ] 프로덕션 빌드 테스트: `npm run build:prod`
- [ ] 로컬 프리뷰 테스트: `npm run preview:prod`

## 🌐 배포 방법

### Option 1: Netlify 배포
1. Netlify 계정에 로그인
2. "New site from Git" 선택
3. GitHub 레포지토리 연결
4. Build settings:
   - Build command: `npm run build:prod`
   - Publish directory: `dist`
   - Node version: 18
5. Environment variables 설정:
   ```
   VITE_APP_TITLE=Minecraft Tools
   VITE_APP_DESCRIPTION=차세대 마인크래프트 도구 - 모던한 디자인과 강력한 기능
   VITE_APP_URL=https://tools.emykr.xyz
   VITE_APP_VERSION=2.0.0
   ```
6. Custom domain: `tools.emykr.xyz` 설정

### Option 2: Vercel 배포
1. Vercel 계정에 로그인
2. "New Project" 선택
3. GitHub 레포지토리 import
4. Framework preset: "Vite" 선택
5. Build command: `npm run build:prod`
6. Output directory: `dist`
7. Environment variables 설정 (위와 동일)
8. Custom domain: `tools.emykr.xyz` 설정

### Option 3: GitHub Pages 배포
1. `.github/workflows/deploy.yml` 파일 생성 (아래 참조)
2. Repository Settings > Pages에서 GitHub Actions 소스 설정
3. Custom domain: `tools.emykr.xyz` 설정

## 📱 PWA 기능
- 홈 화면에 추가 가능
- 오프라인에서도 기본 UI 표시
- 모바일 최적화된 디자인
- 네이티브 앱과 유사한 사용자 경험

## 🔍 SEO 최적화
- 메타 태그 최적화
- Open Graph 설정
- Twitter Cards 지원
- Sitemap.xml 생성
- 구조화된 데이터 지원

## 🎨 디자인 특징
- 글래스 모피즘 효과
- 그라디언트 애니메이션
- 반응형 디자인
- 접근성 고려 (다크 모드, 모션 감소 지원)
- 모던한 UI/UX

## 📊 성능 최적화
- 코드 스플리팅
- 자산 압축 및 최적화
- 정적 파일 캐싱
- Lazy loading
- Tree shaking

## 🔒 보안 설정
- CSP (Content Security Policy)
- XSS 보호
- 클릭재킹 방지
- HTTPS 강제
- 보안 헤더 설정
