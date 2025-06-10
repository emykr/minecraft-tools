#!/usr/bin/env node
/**
 * 🚀 tools.emykr.xyz 배포 전 최종 체크 스크립트
 * 
 * 이 스크립트는 배포 전 모든 설정과 파일이 올바른지 확인합니다.
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 tools.emykr.xyz 배포 준비 상태 점검 중...\n');

const checks = [];

// 1. 필수 파일 존재 확인
const requiredFiles = [
  'package.json',
  'vite.config.ts',
  'index.html',
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
  '.env.production',
  'public/site.webmanifest',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/icon.svg',
  'public/apple-touch-icon.svg',
  'public/og-image.svg',
  'netlify.toml'
];

console.log('📁 필수 파일 확인:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  checks.push({ name: `File: ${file}`, passed: exists });
});

// 2. package.json 설정 확인
console.log('\n📦 package.json 설정 확인:');
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  
  const requiredScripts = ['dev', 'build', 'build:prod', 'lint', 'preview:prod', 'generate-icons'];
  requiredScripts.forEach(script => {
    const exists = pkg.scripts && pkg.scripts[script];
    console.log(`${exists ? '✅' : '❌'} Script: ${script}`);
    checks.push({ name: `Script: ${script}`, passed: exists });
  });
  
  const requiredDeps = ['react', 'vite', 'typescript', 'tailwindcss'];
  requiredDeps.forEach(dep => {
    const exists = (pkg.dependencies && pkg.dependencies[dep]) || 
                  (pkg.devDependencies && pkg.devDependencies[dep]);
    console.log(`${exists ? '✅' : '❌'} Dependency: ${dep}`);
    checks.push({ name: `Dependency: ${dep}`, passed: exists });
  });
} catch (error) {
  console.log('❌ package.json 파싱 실패');
  checks.push({ name: 'package.json parsing', passed: false });
}

// 3. 환경 변수 확인
console.log('\n🔧 환경 변수 확인:');
try {
  const envProd = fs.readFileSync(path.join(__dirname, '.env.production'), 'utf8');
  const requiredVars = ['VITE_APP_TITLE', 'VITE_APP_URL', 'VITE_APP_VERSION'];
  
  requiredVars.forEach(varName => {
    const exists = envProd.includes(varName);
    console.log(`${exists ? '✅' : '❌'} ${varName}`);
    checks.push({ name: `Env var: ${varName}`, passed: exists });
  });
  
  // tools.emykr.xyz 도메인 확인
  const hasCorrectDomain = envProd.includes('tools.emykr.xyz');
  console.log(`${hasCorrectDomain ? '✅' : '❌'} Domain: tools.emykr.xyz`);
  checks.push({ name: 'Correct domain', passed: hasCorrectDomain });
  
} catch (error) {
  console.log('❌ .env.production 파일 읽기 실패');
  checks.push({ name: '.env.production reading', passed: false });
}

// 4. HTML 메타 태그 확인
console.log('\n🌐 HTML 메타 태그 확인:');
try {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  
  const requiredMeta = [
    'og:title',
    'og:description', 
    'og:url',
    'og:image',
    'twitter:card',
    'theme-color'
  ];
  
  requiredMeta.forEach(meta => {
    const exists = html.includes(meta);
    console.log(`${exists ? '✅' : '❌'} Meta: ${meta}`);
    checks.push({ name: `Meta: ${meta}`, passed: exists });
  });
  
  // tools.emykr.xyz 도메인 확인
  const hasCorrectDomain = html.includes('tools.emykr.xyz');
  console.log(`${hasCorrectDomain ? '✅' : '❌'} HTML Domain: tools.emykr.xyz`);
  checks.push({ name: 'HTML correct domain', passed: hasCorrectDomain });
  
} catch (error) {
  console.log('❌ index.html 파일 읽기 실패');
  checks.push({ name: 'index.html reading', passed: false });
}

// 5. PWA 설정 확인
console.log('\n📱 PWA 설정 확인:');
try {
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/site.webmanifest'), 'utf8'));
  
  const requiredFields = ['name', 'short_name', 'start_url', 'display', 'icons'];
  requiredFields.forEach(field => {
    const exists = manifest[field];
    console.log(`${exists ? '✅' : '❌'} Manifest: ${field}`);
    checks.push({ name: `Manifest: ${field}`, passed: !!exists });
  });
  
} catch (error) {
  console.log('❌ site.webmanifest 파싱 실패');
  checks.push({ name: 'site.webmanifest parsing', passed: false });
}

// 결과 요약
console.log('\n📊 점검 결과 요약:');
const passed = checks.filter(check => check.passed).length;
const total = checks.length;
const percentage = Math.round((passed / total) * 100);

console.log(`✅ 통과: ${passed}/${total} (${percentage}%)`);

if (percentage === 100) {
  console.log('\n🎉 축하합니다! 모든 검사를 통과했습니다.');
  console.log('🚀 tools.emykr.xyz 배포 준비가 완료되었습니다!');
  console.log('\n다음 단계:');
  console.log('1. npm run build:prod - 프로덕션 빌드');
  console.log('2. npm run preview:prod - 로컬 미리보기');
  console.log('3. 배포 플랫폼에서 배포 실행');
} else {
  console.log('\n⚠️  일부 검사에서 실패했습니다.');
  console.log('❌ 실패한 항목들:');
  checks.filter(check => !check.passed).forEach(check => {
    console.log(`   - ${check.name}`);
  });
  console.log('\n실패한 항목들을 수정한 후 다시 실행해주세요.');
}

console.log('\n📖 자세한 배포 가이드: DEPLOYMENT_GUIDE.md');
