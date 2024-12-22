import {Injectable} from '@angular/core';
import {WasmImageConverterService} from "./wasm-image-converter.service";
import {ImageProcessor} from "../../interface/imageprocessor";
import {JsImageConverterService} from "./js-image-converter.service";

@Injectable({
  providedIn: 'root'
})
export class FallbackImageConverterService implements ImageProcessor{

  constructor(private wasmService: WasmImageConverterService, private jsService: JsImageConverterService) {
  }

  async processImage(
    file: File,
    targetWidth: number,
    targetHeigth: number,
    format: string,
    quality: number = 0.8
  ): Promise<string> {
    try {
      return await this.wasmService.processImage(file, targetWidth, targetHeigth, format);
    } catch (e) {
      console.warn("WASM-konverteringen misslyckades, fallback till JS:", e)
      return this.jsService.processImage(file, targetWidth, targetHeigth, format, quality);
    }
  }
}
