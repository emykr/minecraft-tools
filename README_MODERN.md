# 🎮 Minecraft Tools - Modern Edition

<div align="center">

![Minecraft Tools](https://img.shields.io/badge/Minecraft-Tools-blue?style=for-the-badge&logo=minecraft)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)

**차세대 마인크래프트 도구 - 모던한 디자인과 강력한 기능**

[🚀 Live Demo](http://localhost:5173) | [📖 Documentation](#features) | [🤝 Contributing](#contributing)

</div>

## ✨ Features

### 🎨 Modern Design
- **Glass Morphism**: 최신 트렌드의 글래스 모피즘 디자인
- **Gradient Animations**: 부드러운 그라데이션 애니메이션  
- **Responsive Layout**: 모든 디바이스에서 완벽한 반응형 디자인
- **Dark/Light Mode**: 시스템 테마 자동 감지
- **Accessibility**: WCAG 가이드라인 준수

### 🛠️ Tools
- **Resource Pack Converter**: Java Edition ↔ Bedrock Edition 리소스팩 변환
- **Skin Converter**: Bedrock Edition ↔ Java Edition 스킨 변환
- **Drag & Drop Upload**: 직관적인 파일 업로드 인터페이스
- **Real-time Progress**: 실시간 변환 진행률 표시

### 🎯 Technical Highlights
- **Modern Stack**: React 18 + TypeScript + Vite
- **Component Library**: Radix UI + Tailwind CSS
- **File Processing**: JSZip + Canvas API
- **Performance**: Optimized with modern web technologies

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/minecraft-tools.git

# Navigate to project directory
cd minecraft-tools

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                    # Radix UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── progress.tsx
│   │   └── tabs.tsx
│   └── FileUpload.tsx         # File upload component
├── utils/
│   ├── resourcePackConverter.ts  # Resource pack conversion logic
│   └── skinConverter.ts         # Skin conversion logic
├── lib/
│   └── utils.ts              # Utility functions
├── App.tsx                   # Main application
├── main.tsx                  # Application entry point
└── index.css                 # Global styles & animations
```

## 🎨 Design System

### Colors
- **Primary**: Blue to Purple gradient (`#3B82F6` → `#8B5CF6`)
- **Secondary**: Purple to Pink gradient (`#8B5CF6` → `#EC4899`)
- **Background**: Animated dark gradient
- **Glass**: Semi-transparent with backdrop blur

### Components
- **Glass Cards**: Translucent containers with blur effects
- **Modern Buttons**: Gradient backgrounds with hover animations
- **Floating Elements**: Subtle floating animations
- **Progress Bars**: Gradient indicators with pulse effects

## 📱 Responsive Design

- **Desktop**: Full-featured layout with large cards
- **Tablet**: Adapted spacing and component sizes  
- **Mobile**: Optimized touch interfaces and stacked layouts
- **Accessibility**: Reduced motion support for sensitive users

## 🛠️ Usage Guide

### Resource Pack Conversion
1. Select "리소스팩 변환기" tab
2. Upload Java Edition resource pack (.zip file)
3. Click "변환 시작" to start conversion
4. Download converted Bedrock Edition pack

### Skin Conversion  
1. Select "스킨 변환기" tab
2. Upload Bedrock Edition skin (.png/.jpg/.jpeg)
3. Click "변환 시작" to start conversion
4. Download converted Java Edition skin

## 🔧 Development Notes

### Current Implementation
- Basic conversion logic structure
- File validation and error handling
- Progress tracking simulation
- Modern UI with glass morphism effects

### Future Enhancements
- Advanced texture mapping algorithms
- Support for additional resource pack formats
- Batch conversion capabilities
- Cloud storage integration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Minecraft** - Original game by Mojang Studios
- **React** - UI library by Meta
- **Radix UI** - Unstyled, accessible components
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide** - Beautiful icon library

---

<div align="center">
Made with ❤️ for the Minecraft Community
</div>
