export interface ImageProcessor {
  processImage(file: File, width: number, height: number, format: string): Promise<string>;
}
