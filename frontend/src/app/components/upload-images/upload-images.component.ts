import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {WasmService} from "../../services/wasm.service";

@Component({
  selector: 'app-upload-images',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.scss'
})
export class UploadImagesComponent {

  selectedFile: File | null = null;
  width: number = 500;
  height: number = 500;
  format: string = 'webp';


  constructor(private wasmService: WasmService) {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async convertImage(file: File, width: number, height: number, format: string) {
    // console.log(file)
    // console.log(width)
    // console.log(height)
    // console.log(format)
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const arrayBuffer = reader.result;
      if (!(arrayBuffer instanceof ArrayBuffer)) {
        console.error("arrayBuffer är inte ArrayBuffer");
        return;
      }

      const imageData = new Uint8Array(arrayBuffer);

      try {
        const result = this.wasmService.convertImage(imageData, width, height, format)
        // const blob = new Blob([result], { type: `image/${format}`})
      } catch (e) {
        console.error(e);
      }
    };
  }

  private downloadFile(data: Uint8Array, format: string) {
    const blob = new Blob([data], { type: `image/${format}` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_image.${format}`;
    a.click();
  }
}
