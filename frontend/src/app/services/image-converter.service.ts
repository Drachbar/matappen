import { Injectable } from '@angular/core';
import {ImageProcessor} from "../interface/imageprocessor";

@Injectable({
  providedIn: 'root'
})
export class ImageConverterService implements ImageProcessor {

  async processImage(file: File, width: number, height: number, format: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx!.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/' + format));
        };
        img.src = event.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
