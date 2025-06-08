import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Progress } from './components/ui/progress'
import { FileUpload } from './components/FileUpload'
import { ResourcePackConverter, downloadFile } from './utils/resourcePackConverter'
import { SkinConverter } from './utils/skinConverter'
import { Upload, Download, Pickaxe, Palette } from 'lucide-react'

function App() {
  // Environment variables
  const appTitle = import.meta.env.VITE_APP_TITLE || 'Minecraft Tools'
  
  // Set document title
  useEffect(() => {
    document.title = `${appTitle} - 차세대 마인크래프트 도구`
  }, [appTitle])

  const [resourcePackProgress, setResourcePackProgress] = useState(0)
  const [skinProgress, setSkinProgress] = useState(0)
  const [resourcePackFile, setResourcePackFile] = useState<File | null>(null)
  const [skinFile, setSkinFile] = useState<File | null>(null)
  const [convertedResourcePack, setConvertedResourcePack] = useState<Blob | null>(null)
  const [convertedSkin, setConvertedSkin] = useState<Blob | null>(null)

  const handleResourcePackConvert = async () => {
    if (!resourcePackFile) {
      alert('먼저 리소스팩 파일을 선택해주세요.')
      return
    }
    
    try {
      setResourcePackProgress(0)
      const convertedFile = await ResourcePackConverter.convertJavaToBedrock(
        resourcePackFile,
        setResourcePackProgress
      )
      setConvertedResourcePack(convertedFile)
    } catch (error) {
      console.error('리소스팩 변환 실패:', error)
      alert('리소스팩 변환에 실패했습니다.')
      setResourcePackProgress(0)
    }
  }

  const handleSkinConvert = async () => {
    if (!skinFile) {
      alert('먼저 스킨 파일을 선택해주세요.')
      return
    }
    
    // 스킨 파일 유효성 검사
    const isValid = await SkinConverter.validateSkinFile(skinFile)
    if (!isValid) {
      alert('유효하지 않은 스킨 파일입니다. 64x64 또는 128x128 크기의 PNG 파일을 사용해주세요.')
      return
    }
    
    try {
      setSkinProgress(0)
      const convertedFile = await SkinConverter.convertBedrockToJava(
        skinFile,
        setSkinProgress
      )
      setConvertedSkin(convertedFile)
    } catch (error) {
      console.error('스킨 변환 실패:', error)
      alert('스킨 변환에 실패했습니다.')
      setSkinProgress(0)
    }
  }

  const handleResourcePackDownload = () => {
    if (convertedResourcePack && resourcePackFile) {
      downloadFile(convertedResourcePack, `${resourcePackFile.name.replace('.zip', '')}_bedrock.zip`)
    }
  }

  const handleSkinDownload = () => {
    if (convertedSkin && skinFile) {
      downloadFile(convertedSkin, `${skinFile.name.replace(/\.[^/.]+$/, '')}_java.png`)
    }
  }

  return (
    <div className="min-h-screen animated-bg p-4 overflow-hidden relative">
      {/* 배경 장식 요소들 */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl floating-animation"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl floating-animation" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl floating-animation" style={{animationDelay: '4s'}}></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 glass-card neon-glow floating-animation">
              <Pickaxe className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-6xl font-bold text-gradient bg-clip-text">
              Minecraft Tools
            </h1>
            <div className="p-3 glass-card neon-glow floating-animation" style={{animationDelay: '1s'}}>
              <Palette className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <p className="text-white/80 text-xl font-light max-w-2xl mx-auto leading-relaxed">
            차세대 마인크래프트 도구로 리소스팩과 스킨을 손쉽게 변환하세요
          </p>
        </div>

        {/* 메인 탭 */}
        <Tabs defaultValue="resourcepack" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-12 glass-card p-2 gap-2">
            <TabsTrigger 
              value="resourcepack" 
              className="flex items-center gap-3 py-4 px-6 text-lg font-medium data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl transition-all duration-300"
            >
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Palette className="w-5 h-5 text-white" />
              </div>
              리소스팩 변환기
            </TabsTrigger>
            <TabsTrigger 
              value="skin" 
              className="flex items-center gap-3 py-4 px-6 text-lg font-medium data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-xl transition-all duration-300"
            >
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Upload className="w-5 h-5 text-white" />
              </div>
              스킨 변환기
            </TabsTrigger>
          </TabsList>

          {/* 리소스팩 변환 탭 */}
          <TabsContent value="resourcepack">
            <Card className="modern-panel border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
                <CardTitle className="text-white flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  Java Edition → Bedrock Edition 리소스팩 변환
                </CardTitle>
                <CardDescription className="text-white/70 text-lg mt-2">
                  Java Edition 리소스팩을 Bedrock Edition에서 사용할 수 있는 형식으로 변환합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                {/* 파일 업로드 영역 */}
                <FileUpload
                  onFileSelect={setResourcePackFile}
                  acceptedFileTypes=".zip,.rar"
                  placeholder="Java Edition 리소스팩을 업로드하세요"
                  description=".zip 또는 .rar 파일을 드래그하거나 클릭하여 선택"
                />

                {/* 변환 진행률 */}
                {resourcePackProgress > 0 && (
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg text-white">
                      <span className="font-medium">변환 진행률</span>
                      <span className="text-blue-400 font-bold">{resourcePackProgress}%</span>
                    </div>
                    <Progress value={resourcePackProgress} className="h-4 rounded-full overflow-hidden" />
                  </div>
                )}

                {/* 변환 버튼 */}
                <div className="flex gap-6">
                  <Button 
                    onClick={handleResourcePackConvert}
                    disabled={resourcePackProgress > 0 && resourcePackProgress < 100}
                    className="modern-button flex-1 text-lg py-4"
                  >
                    <Palette className="w-5 h-5 mr-2" />
                    변환 시작
                  </Button>
                  {convertedResourcePack && (
                    <Button 
                      onClick={handleResourcePackDownload}
                      className="modern-button px-8 text-lg py-4 flex items-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      다운로드
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 스킨 변환 탭 */}
          <TabsContent value="skin">
            <Card className="modern-panel border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-white/10">
                <CardTitle className="text-white flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  Bedrock Edition → Java Edition 스킨 변환
                </CardTitle>
                <CardDescription className="text-white/70 text-lg mt-2">
                  Bedrock Edition 스킨을 Java Edition에서 사용할 수 있는 형식으로 변환합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                {/* 파일 업로드 영역 */}
                <FileUpload
                  onFileSelect={setSkinFile}
                  acceptedFileTypes=".png,.jpg,.jpeg"
                  placeholder="Bedrock Edition 스킨을 업로드하세요"
                  description=".png, .jpg, .jpeg 파일을 드래그하거나 클릭하여 선택"
                />

                {/* 변환 진행률 */}
                {skinProgress > 0 && (
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg text-white">
                      <span className="font-medium">변환 진행률</span>
                      <span className="text-purple-400 font-bold">{skinProgress}%</span>
                    </div>
                    <Progress value={skinProgress} className="h-4 rounded-full overflow-hidden" />
                  </div>
                )}

                {/* 변환 버튼 */}
                <div className="flex gap-6">
                  <Button 
                    onClick={handleSkinConvert}
                    disabled={skinProgress > 0 && skinProgress < 100}
                    className="modern-button flex-1 text-lg py-4"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    변환 시작
                  </Button>
                  {convertedSkin && (
                    <Button 
                      onClick={handleSkinDownload}
                      className="modern-button px-8 text-lg py-4 flex items-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      다운로드
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 푸터 */}
        <div className="text-center mt-16">
          <div className="glass-card px-8 py-6 inline-block">
            <p className="text-white/70 text-lg font-light">
              Made with <span className="text-red-400 text-xl">❤️</span> for Minecraft Community
            </p>
            <p className="text-white/50 text-sm mt-2">
              Version {import.meta.env.VITE_APP_VERSION || '2.0.0'} | tools.emykr.xyz
            </p>
            <div className="flex justify-center gap-2 mt-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
