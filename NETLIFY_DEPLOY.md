# 🚀 Netlify 배포 가이드 - tools.emykr.xyz

## 📋 준비 사항
- ✅ 프로젝트 파일 준비 완료
- ✅ Git 레포지토리 초기화 완료  
- ✅ netlify.toml 설정 완료
- ✅ 환경 변수 설정 완료

## 🎯 배포 단계

### 1단계: GitHub에 업로드
```bash
# GitHub에서 새 레포지토리 생성 (예: minecraft-tools)
git remote add origin https://github.com/[사용자명]/minecraft-tools.git
git branch -M main
git push -u origin main
```

### 2단계: Netlify 배포
1. [Netlify](https://netlify.com)에 로그인
2. "New site from Git" 클릭
3. GitHub 계정 연결 및 레포지토리 선택
4. 배포 설정:
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build:prod` (자동 감지됨)
   - **Publish directory**: `dist` (자동 감지됨)
   - **Node version**: `18` (netlify.toml에서 설정됨)

### 3단계: 커스텀 도메인 설정
1. Site settings → Domain management
2. "Add custom domain" 클릭
3. `tools.emykr.xyz` 입력
4. DNS 설정:
   ```
   Type: CNAME
   Name: tools
   Value: [netlify-site-name].netlify.app
   ```

### 4단계: HTTPS 설정 (Let's Encrypt 자동)
1. **자동 HTTPS**: Netlify가 Let's Encrypt 인증서를 자동으로 발급
2. **Force HTTPS** 활성화:
   - Site settings → Domain management
   - "Force HTTPS" 토글 ON
3. **포트 설정**: 
   - 포트 80 (HTTP) → 자동으로 포트 443 (HTTPS)로 리다이렉트
   - 도메인 뒤에 포트 번호 불필요 (표준 포트 사용)
4. **HSTS 보안**: netlify.toml에서 이미 설정됨

### 🔒 보안 기능 자동 적용:
- ✅ **Let's Encrypt SSL 인증서** (무료, 자동 갱신)
- ✅ **HTTP → HTTPS 강제 리다이렉트** (포트 80 → 443)
- ✅ **HSTS (HTTP Strict Transport Security)**
- ✅ **CSP (Content Security Policy)**
- ✅ **XSS 보호**
- ✅ **클릭재킹 방지**

## 🔧 자동 배포 설정

Git에 푸시할 때마다 자동으로 배포됩니다:
```bash
git add .
git commit -m "Update website"
git push
```

## 📊 배포 후 체크리스트

- [ ] https://tools.emykr.xyz 접속 확인
- [ ] 모바일 반응형 확인
- [ ] PWA 기능 확인 (홈 화면 추가)
- [ ] SEO 메타 태그 확인
- [ ] 파일 업로드 기능 테스트
- [ ] 변환 기능 테스트

## 🎉 완료!

축하합니다! tools.emykr.xyz가 성공적으로 배포되었습니다.

### 📈 성능 최적화 확인:
- Lighthouse 점수 확인
- Core Web Vitals 측정
- 번들 크기 모니터링

### 🔄 향후 업데이트:
모든 코드 변경사항은 Git push로 자동 배포됩니다!
