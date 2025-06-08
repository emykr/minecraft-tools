#!/usr/bin/env node
/**
 * PWA 아이콘 생성 스크립트
 * tools.emykr.xyz용 아이콘을 생성합니다.
 */

const fs = require('fs');
const path = require('path');

// SVG 아이콘 템플릿 (모던한 마인크래프트 도구 아이콘)
const iconSvg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="toolGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.9" />
      <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:0.8" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge> 
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- 배경 -->
  <rect width="512" height="512" rx="80" fill="url(#bgGradient)"/>
  
  <!-- 글래스 모피즘 효과 -->
  <rect x="40" y="40" width="432" height="432" rx="60" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  
  <!-- 도구 아이콘 (픽셀 스타일에서 모던으로) -->
  <g transform="translate(256,256)" filter="url(#glow)">
    <!-- 망치 -->
    <rect x="-60" y="-80" width="120" height="40" rx="8" fill="url(#toolGradient)"/>
    <rect x="-10" y="-40" width="20" height="100" rx="4" fill="url(#toolGradient)"/>
    
    <!-- 톱니바퀴 -->
    <circle cx="0" cy="80" r="40" fill="none" stroke="url(#toolGradient)" stroke-width="8"/>
    <circle cx="0" cy="80" r="20" fill="url(#toolGradient)"/>
    
    <!-- 스파클 효과 -->
    <g fill="#ffffff" opacity="0.8">
      <circle cx="-80" cy="-40" r="3"/>
      <circle cx="80" cy="-60" r="2"/>
      <circle cx="60" cy="40" r="2"/>
      <circle cx="-70" cy="100" r="3"/>
    </g>
  </g>
</svg>`;

// 아이콘 크기별 생성
const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];
const publicDir = path.join(__dirname, 'public');

// public 디렉토리가 없으면 생성
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// SVG 파일 생성
fs.writeFileSync(path.join(publicDir, 'icon.svg'), iconSvg);

console.log('✅ PWA 아이콘이 생성되었습니다!');
console.log('📱 SVG 아이콘: public/icon.svg');

// PNG 변환은 sharp나 다른 이미지 라이브러리가 필요하므로 안내 메시지만 출력
console.log('\n🔧 PNG 아이콘 생성을 위해서는 다음 명령어를 실행하세요:');
console.log('npm install sharp --save-dev');
console.log('그 후 이 스크립트를 다시 실행하면 PNG 아이콘들이 자동 생성됩니다.');

// Sharp가 설치되어 있다면 PNG 생성 시도
try {
  const sharp = require('sharp');
  
  const svgBuffer = Buffer.from(iconSvg);
  
  const generatePngIcons = async () => {
    for (const size of sizes) {
      try {
        await sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toFile(path.join(publicDir, `icon-${size}x${size}.png`));
        console.log(`✅ icon-${size}x${size}.png 생성 완료`);
      } catch (error) {
        console.error(`❌ icon-${size}x${size}.png 생성 실패:`, error.message);
      }
    }
    
    // 특별한 이름의 아이콘들도 생성
    await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512.png'));
    await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'icon-192.png'));
    await sharp(svgBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
    await sharp(svgBuffer).resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16x16.png'));
    
    console.log('🎉 모든 PNG 아이콘이 성공적으로 생성되었습니다!');
  };
  
  generatePngIcons().catch(console.error);
  
} catch (error) {
  // Sharp가 설치되지 않은 경우는 무시
}
