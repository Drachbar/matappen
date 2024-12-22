import { Injectable } from '@angular/core';
import {ImageProcessor} from "../../interface/imageprocessor";

@Injectable({
  providedIn: 'root'
})
export class WasmImageConverterService implements ImageProcessor{

  private wasmLoaded = false;
  private wasm: any;

  private async ensureWasmLoaded() {
    if (!this.wasmLoaded) {
      this.wasm = await import('@drachbar/image_converter')
      await this.wasm.default();
      this.wasmLoaded = true;
    }
  }

  async processImage(file: File, targetWidth: number, targetHeight: number, format: string): Promise<string> {
    await this.ensureWasmLoaded();
    const arrayBuffer = await file.arrayBuffer();
    const imageData = new Uint8Array(arrayBuffer);
    const result = this.wasm.convert_image(imageData, targetWidth, targetHeight, format);

    if (!result) {
      throw new Error("WASM-konverteringen misslyckades.");
    }

    const blob = new Blob([result], {type: `image/${format}`});
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    })
  }

}
