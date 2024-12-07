import { Injectable } from '@angular/core';
import {ImageProcessor} from "../../interface/imageprocessor";

@Injectable({
  providedIn: 'root'
})
export class JsImageConverterService implements ImageProcessor {

  async processImage(file: File, targetWidth: number, targetHeight: number, format: string, quality: number = 0.8): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = this.downscaleImageProgressively(img, targetWidth, targetHeight);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result as string);
                fileReader.onerror = reject;
                fileReader.readAsDataURL(blob);
              } else {
                reject('Kunde inte skapa bildblob.');
              }
            },
            'image/' + format,
            quality
          );
        };
        img.onerror = reject;
        img.src = event.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private downscaleImageProgressively(img: HTMLImageElement, targetWidth: number, targetHeight: number): HTMLCanvasElement {
    let canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    while (canvas.width > targetWidth * 2 || canvas.height > targetHeight * 2) {
      canvas = this.downscaleStep(canvas, 0.5);
    }

    canvas = this.downscaleStep(canvas, targetWidth / canvas.width);
    return canvas;
  }

  private downscaleStep(canvas: HTMLCanvasElement, scale: number): HTMLCanvasElement {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = Math.max(Math.floor(canvas.width * scale), 1);
    newCanvas.height = Math.max(Math.floor(canvas.height * scale), 1);

    const ctx = newCanvas.getContext('2d')!;
    ctx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);

    return newCanvas;
  }
}
