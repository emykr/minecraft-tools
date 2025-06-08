import React, { useCallback, useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from './ui/button'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  acceptedFileTypes: string
  maxFileSize?: number
  placeholder: string
  description: string
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedFileTypes,
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  placeholder,
  description
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const file = files[0]
      if (file.size <= maxFileSize) {
        setSelectedFile(file)
        onFileSelect(file)
      } else {
        alert(`파일 크기가 너무 큽니다. 최대 ${maxFileSize / 1024 / 1024}MB까지 업로드 가능합니다.`)
      }
    }
  }, [maxFileSize, onFileSelect])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.size <= maxFileSize) {
        setSelectedFile(file)
        onFileSelect(file)
      } else {
        alert(`파일 크기가 너무 큽니다. 최대 ${maxFileSize / 1024 / 1024}MB까지 업로드 가능합니다.`)
      }
    }
  }, [maxFileSize, onFileSelect])
  return (
    <div
      className={`glass-card border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
        isDragOver 
          ? 'border-blue-400 bg-blue-500/10 scale-105' 
          : 'border-white/30 hover:border-blue-400/50 hover:bg-white/5'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={`transition-all duration-300 ${isDragOver ? 'scale-110' : ''}`}>
        <div className="p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full w-fit mx-auto mb-6">
          <Upload className="w-16 h-16 text-blue-400" />
        </div>
        {selectedFile ? (
          <div className="space-y-4">
            <div className="glass-card p-6 rounded-xl">
              <p className="text-white font-semibold text-xl mb-2">{selectedFile.name}</p>
              <div className="flex items-center justify-center gap-4 text-blue-300">
                <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm text-green-400">업로드 완료</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-white text-2xl font-semibold mb-3">{placeholder}</h3>
            <p className="text-white/70 text-lg mb-6 max-w-md mx-auto leading-relaxed">{description}</p>
          </>
        )}
      </div>
      <input
        type="file"
        accept={acceptedFileTypes}
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
      />
      <Button className="modern-button text-lg px-8 py-4 mt-6" asChild>
        <label htmlFor="file-upload" className="cursor-pointer flex items-center gap-3">
          <Upload className="w-5 h-5" />
          {selectedFile ? '다른 파일 선택' : '파일 선택'}
        </label>
      </Button>
    </div>
  )
}
