import { Component } from '@angular/core';

@Component({
  selector: 'app-testwasm',
  standalone: true,
  imports: [],
  templateUrl: './testwasm.component.html',
  styleUrl: './testwasm.component.scss'
})
export class TestwasmComponent {
  imageUrl: string | null = null;

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      console.error('Ingen fil vald.');
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const imageData = new Uint8Array(arrayBuffer);

      try {
        // Initialisera WASM-modulen
        const wasm = await import('../../assets/pkg/image_converter.js');
        await wasm.default();

        // Konvertera bilden med WASM
        const result = wasm.convert_image(imageData, 300, 300, 'webp');
        const blob = new Blob([result], { type: 'image/webp' });
        this.imageUrl = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.src = this.imageUrl;
        document.body.appendChild(img);
      } catch (error) {
        console.error('Fel vid bildkonvertering:', error);
      }
    };
  }
}
