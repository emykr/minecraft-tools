// 리소스팩 변환 관련 유틸리티
import JSZip from 'jszip'

export interface ResourcePackManifest {
  format_version: number;
  header: {
    description: string;
    name: string;
    uuid: string;
    version: number[];
    min_engine_version: number[];
  };
  modules: Array<{
    description: string;
    type: string;
    uuid: string;
    version: number[];
  }>;
}

export class ResourcePackConverter {  /**
   * Java Edition 리소스팩을 Bedrock Edition 형식으로 변환
   */
  static async convertJavaToBedrock(file: File, onProgress?: (progress: number) => void): Promise<Blob> {
    try {
      onProgress?.(10);
      
      // ZIP 파일 로드
      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(file);
      
      onProgress?.(30);
      
      // 새로운 Bedrock 리소스팩 ZIP 생성
      const bedrockZip = new JSZip();
      
      // manifest.json 생성
      const manifest: ResourcePackManifest = {
        format_version: 2,
        header: {
          description: "Converted from Java Edition",
          name: file.name.replace('.zip', ''),
          uuid: this.generateUUID(),
          version: [1, 0, 0],
          min_engine_version: [1, 16, 0]
        },
        modules: [{
          description: "Resource Pack Module",
          type: "resources",
          uuid: this.generateUUID(),
          version: [1, 0, 0]
        }]
      };
      
      bedrockZip.file("manifest.json", JSON.stringify(manifest, null, 2));
      
      onProgress?.(50);
        // Java Edition 텍스처를 Bedrock Edition 형식으로 변환
      const textures = loadedZip.folder("assets/minecraft/textures");
      if (textures) {
        const bedrockTextures = bedrockZip.folder("textures");
        
        // 블록 텍스처 변환
        const blockTextures = textures.folder("blocks") || textures.folder("block");
        if (blockTextures) {
          const bedrockBlocks = bedrockTextures?.folder("blocks");
          
          if (bedrockBlocks) {
            for (const [relativePath, zipEntry] of Object.entries(blockTextures.files)) {
              if (!zipEntry.dir && relativePath.endsWith('.png')) {
                const data = await zipEntry.async('blob');
                bedrockBlocks.file(relativePath, data);
              }
            }
          }
        }
        
        onProgress?.(70);
        
        // 아이템 텍스처 변환
        const itemTextures = textures.folder("items") || textures.folder("item");
        if (itemTextures) {
          const bedrockItems = bedrockTextures?.folder("items");
          
          if (bedrockItems) {
            for (const [relativePath, zipEntry] of Object.entries(itemTextures.files)) {
              if (!zipEntry.dir && relativePath.endsWith('.png')) {
                const data = await zipEntry.async('blob');
                bedrockItems.file(relativePath, data);
              }
            }
          }
        }
      }
      
      onProgress?.(90);
      
      // 최종 ZIP 파일 생성
      const result = await bedrockZip.generateAsync({ type: 'blob' });
      
      onProgress?.(100);
      
      return result;
      
    } catch (error) {
      throw new Error(`리소스팩 변환 실패: ${error}`);
    }
  }
  
  private static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

export function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
