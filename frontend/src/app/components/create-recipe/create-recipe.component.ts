import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {ImageConverterService} from "../../services/image-converter.service";

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent {

  recipeData = {
    nameRecipe: '',
    description: '',
    sections: [
      {
        name: '',
        sectionOrder: 1,
        ingredients: [
          {
            name: '',
            ingredientOrder: 1,
            unit: '',
            amount: 0
          }
        ]
      }
    ],
    steps: [
      {
        description: '',
        stepOrder: 1
      }
    ]
  };

  uploadedFiles: File[] = []; // För att lagra de valda filerna

  constructor(private http: HttpClient, private imageConverterService: ImageConverterService) {
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const files = Array.from(target.files);
      this.uploadedFiles = []; // Töm listan med gamla filer
      files.forEach((file) => this.convertAndAddFile(file));
    }
  }

  async convertAndAddFile(file: File) {
    const maxWidth = 500; // Maximal bredd
    const maxHeight = 600; // Maximal höjd
    const format = 'webp'; // Exempelformat

    try {
      // Skapa ett HTMLImageElement för att läsa bildens ursprungliga dimensioner
      const img = await this.createImage(file);

      // Beräkna skalenliga dimensioner baserat på maxmåtten
      let targetWidth = img.width;
      let targetHeight = img.height;

      if (img.width > maxWidth || img.height > maxHeight) {
        const widthRatio = maxWidth / img.width;
        const heightRatio = maxHeight / img.height;
        const scalingFactor = Math.min(widthRatio, heightRatio); // Välj den minsta skalningsfaktorn för att passa in i både bredd och höjd

        targetWidth = img.width * scalingFactor;
        targetHeight = img.height * scalingFactor;
      }

      // Konvertera bilden med de beräknade dimensionerna
      const convertedImage = await this.imageConverterService.processImage(file, targetWidth, targetHeight, format, 1);
      if (convertedImage) {
        const blob = await (await fetch(convertedImage)).blob();
        const convertedFile = new File([blob], file.name.split('.')[0] + '.webp', { type: 'image/webp' });
        this.uploadedFiles.push(convertedFile); // Lägg till den konverterade bilden
      }
    } catch (error) {
      console.error('Kunde inte konvertera bilden:', error);
    }
  }

// Hjälpfunktion för att skapa en bild från en fil
  private createImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
        img.src = event.target?.result as string;
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  createRecipe() {
    // Skapa ett FormData-objekt
    const formData = new FormData();

    // Lägg till receptdata som JSON
    formData.append(
      'recipe',
      new Blob([JSON.stringify(this.recipeData)], { type: 'application/json' })
    );

    // Lägg till alla uppladdade filer
    this.uploadedFiles.forEach((file) => {
      formData.append('images', file);
    });

    // Skicka POST-förfrågan
    this.http.post('api/v1/recipe/add', formData).subscribe({
      next: (response) => console.log('Receptet skapades!', response),
      error: (error) => console.error('Det blev ett fel!', error)
    });
  }

  addStep() {
    // Lägger till ett nytt tomt steg i arrayen
    this.recipeData.steps.push({description: '', stepOrder: this.recipeData.steps.length + 1});
  }

  removeStep(index: number) {
    // Tar bort ett steg från arrayen
    this.recipeData.steps.splice(index, 1);
  }

  removeSection(index: number) {
    this.recipeData.sections.splice(index, 1);
  }

  addSection() {
    this.recipeData.sections.push({
      name: '',
      sectionOrder: this.recipeData.sections.length + 1,
      ingredients: [
        {
          name: '',
          unit: '',
          amount: 0,
          ingredientOrder: 1
        }
      ]
    });
  }

  removeIngredient(indexSection: number, indexIngredient: number) {
    this.recipeData.sections[indexSection].ingredients.splice(indexIngredient, 1);
  }

  addIngredient(indexSection: number) {
    this.recipeData.sections[indexSection].ingredients.push({
      name: '',
      unit: '',
      amount: 0,
      ingredientOrder: this.recipeData.sections[indexSection].ingredients.length + 1
    })
  }
}
