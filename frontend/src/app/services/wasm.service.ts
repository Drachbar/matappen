import { Injectable } from '@angular/core';
import {convert_image, default as init} from "../../assets/wasm";

@Injectable({
  providedIn: 'root'
})
export class WasmService {
  constructor() {
    this.loadWasm()
  }

  private async loadWasm() {
    try {
      await init();
    } catch (err) {
      console.error('Failed to load Wasm module:', err);
    }
  }

  public convertImage(data: Uint8Array, width: number, height: number, format: string){
    console.log(data)

    const returntype = convert_image(data, width, height, format);

    console.log(returntype)

    return returntype

    // console.log(returntype)
    // return returntype
  }
}
