# 🎮 Minecraft Tools

> 차세대 마인크래프트 도구 - 모던한 디자인과 강력한 기능

**Live Demo**: [tools.emykr.xyz](https://tools.emykr.xyz)

## ✨ 주요 기능

### 🔄 리소스팩 변환기 (Java ↔ Bedrock)
- Java Edition 리소스팩을 Bedrock Edition 형식으로 변환
- `.zip` 파일 업로드 지원  
- 자동 `manifest.json` 생성
- 텍스처 경로 자동 매핑
- 실시간 변환 진행률 표시

### 👤 스킨 변환기 (Bedrock → Java)  
- Bedrock Edition 스킨을 Java Edition 형식으로 변환
- `.png`, `.jpg`, `.jpeg` 파일 지원
- 64x64, 128x128 해상도 지원  
- 스킨 유효성 검사
- 드래그 앤 드롭 인터페이스

## 🎨 디자인 특징

- **글래스 모피즘** 효과
- **그라디언트 애니메이션**
- **반응형 디자인** (모바일 최적화)  
- **접근성 고려** (다크 모드, 모션 감소 지원)
- **PWA 지원** (홈 화면 추가 가능)

## 🚀 기술 스택

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS + PostCSS  
- **UI Components**: Radix UI + Custom Components
- **File Processing**: JSZip
- **Icons**: Lucide React
- **Animations**: CSS Animations + Transitions
- **PWA**: Web Manifest + Service Worker Ready

## 🛠️ 개발 환경 설정

### 필수 요건
- Node.js 18+ 
- npm 9+

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 린팅 및 타입 체크
npm run lint
npm run type-check

# 아이콘 생성 (Node.js + Sharp 필요)
npm run generate-icons
```

### 프로덕션 빌드
```bash
# 프로덕션 빌드
npm run build:prod

# 빌드 미리보기
npm run preview:prod

# 번들 분석
npm run analyze
```

## 🌐 배포

### 자동 배포 옵션

1. **Netlify** (권장)
   - GitHub 연결 후 자동 배포
   - Build command: `npm run build:prod`  
   - Publish directory: `dist`
   - Custom domain: `tools.emykr.xyz` 설정

2. **Vercel**
   - GitHub import 후 자동 배포
   - Framework preset: Vite
   - Build command: `npm run build:prod`
   - Output directory: `dist`

3. **GitHub Pages**
   - `.github/workflows/deploy.yml` 사용
   - 자동 배포 워크플로우 포함

### 수동 배포
```bash
# Netlify CLI를 통한 배포
npm run deploy:netlify

# Vercel CLI를 통한 배포  
npm run deploy:vercel
```

## 📊 성능 최적화

- **코드 스플리팅**: Vendor, UI, Utils 청크 분리
- **Tree Shaking**: 미사용 코드 제거
- **Asset 압축**: Terser를 통한 JS/CSS 압축
- **정적 파일 캐싱**: 1년 캐시 설정
- **Preload/Prefetch**: 중요 리소스 우선 로딩
- **PWA 최적화**: 오프라인 지원 준비

## 🔒 보안 설정

- CSP (Content Security Policy)
- XSS 보호 헤더
- 클릭재킹 방지  
- HTTPS 강제
- 보안 헤더 자동 설정

## 📱 PWA 기능

- 홈 화면 추가 지원
- 모바일 최적화된 UI/UX
- 오프라인 기본 화면 (준비 완료)
- 네이티브 앱과 유사한 경험

## 🎯 SEO 최적화

- 메타 태그 최적화
- Open Graph 설정
- Twitter Cards 지원  
- Sitemap.xml 생성
- 구조화된 데이터 준비
```bash
npm run preview
```

## 📦 프로젝트 구조

```
src/
├── components/
│   ├── ui/              # Radix UI 기반 재사용 컴포넌트
│   └── FileUpload.tsx   # 파일 업로드 컴포넌트
├── utils/
│   ├── resourcePackConverter.ts  # 리소스팩 변환 로직
│   └── skinConverter.ts         # 스킨 변환 로직
├── lib/
│   └── utils.ts         # 유틸리티 함수들
└── App.tsx              # 메인 애플리케이션
```

## 🎨 디자인 테마

- **색상**: 마인크래프트풍 초록색 계열
- **스타일**: 픽셀아트 스타일의 버튼과 UI
- **반응형**: 모바일 및 데스크톱 지원

## 📝 사용법

### 리소스팩 변환
1. "리소스팩 변환기" 탭 선택
2. Java Edition 리소스팩 ZIP 파일 업로드
3. "변환 시작" 버튼 클릭
4. 변환 완료 후 "다운로드" 버튼으로 결과 파일 다운로드

### 스킨 변환  
1. "스킨 변환기" 탭 선택
2. Bedrock Edition 스킨 PNG 파일 업로드
3. "변환 시작" 버튼 클릭
4. 변환 완료 후 "다운로드" 버튼으로 결과 파일 다운로드

## 🔧 개발 로드맵

### ✅ 완료된 기능
- [x] 모던한 UI/UX 디자인 (글래스 모피즘)
- [x] 리소스팩 변환 기본 구조
- [x] 스킨 변환 기본 구조  
- [x] PWA 지원
- [x] SEO 최적화
- [x] 성능 최적화
- [x] 배포 자동화

### 🚧 개발 예정
- [ ] 고급 텍스처 매핑 로직
- [ ] 더 많은 리소스팩 형식 지원
- [ ] 배치 변환 기능
- [ ] 변환 히스토리
- [ ] 사용자 설정 저장
- [ ] 다국어 지원 확장

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

- **Website**: [tools.emykr.xyz](https://tools.emykr.xyz)
- **Author**: emykr
- **Version**: 2.0.0

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

<div align="center">
  
**Made with ❤️ for Minecraft Community**

[🌟 Star this project](https://github.com/emykr/minecraft-tools) • [🐛 Report Bug](https://github.com/emykr/minecraft-tools/issues) • [💡 Request Feature](https://github.com/emykr/minecraft-tools/issues)

</div>
