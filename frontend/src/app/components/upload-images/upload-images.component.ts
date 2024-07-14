import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ImageConverterService } from "../../services/image-converter.service";

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

  private imageData: Uint8Array | undefined;
  private imageFile: File | undefined;

  constructor(private imageConverterService: ImageConverterService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageData = new Uint8Array(e.target.result);
        this.imageFile = new File([this.imageData], file.name, { type: file.type });
      };
      reader.readAsArrayBuffer(file);
    }
  }

  async convertImage() {
    if (!this.imageFile) {
      alert('Välj en bild först!');
      return;
    }
    const width = 300; // exempelbredd
    const height = 200; // exempelhöjd
    const format = 'png'; // exempelformat

    try {
      const convertedImage = await this.imageConverterService.processImage(this.imageFile, width, height, format);
      if (convertedImage) {
        console.log('Bildkonvertering lyckades:', convertedImage);
        this.displayImage(convertedImage);
      }
    } catch (error) {
      console.error('Kunde inte konvertera bilden:', error);
    }
  }

  displayImage(convertedImage: string) {
    const img = document.createElement('img');
    img.src = convertedImage;
    document.body.appendChild(img); // Eller lägg till bilden i en specifik del av din applikation
  }
}
