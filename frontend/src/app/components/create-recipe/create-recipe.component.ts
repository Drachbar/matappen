import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FallbackImageConverterService} from "../../services/ImageConverterServices/fallback-image-converter.service";

@Component({
    selector: 'app-create-recipe',
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './create-recipe.component.html',
    styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent implements OnInit {

  recipeForm: FormGroup;
  uploadedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private imageConverterService: FallbackImageConverterService
  ) {
    this.recipeForm = this.fb.group({
      nameRecipe: ['', Validators.required],
      description: ['', Validators.required],
      sections: this.fb.array([]),
      steps: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.addSection(); // Start med en sektion
    this.addStep();    // Start med ett steg
  }

  get sections(): FormArray {
    return this.recipeForm.get('sections') as FormArray;
  }

  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  addSection(): void {
    const section = this.fb.group({
      name: ['', Validators.required],
      sectionOrder: [this.sections.length + 1],
      ingredients: this.fb.array([])
    });
    this.sections.push(section);
    this.addIngredient(this.sections.length - 1); // Lägg till en ingrediens i den nya sektionen
  }

  removeSection(index: number): void {
    this.sections.removeAt(index);
  }

  addIngredient(sectionIndex: number): void {
    const ingredients = this.sections.at(sectionIndex).get('ingredients') as FormArray;
    ingredients.push(
      this.fb.group({
        name: ['', Validators.required],
        unit: [''],
        amount: [0],
        ingredientOrder: [ingredients.length + 1]
      })
    );
  }

  removeIngredient(sectionIndex: number, ingredientIndex: number): void {
    const ingredients = this.sections.at(sectionIndex).get('ingredients') as FormArray;
    ingredients.removeAt(ingredientIndex);
  }

  addStep(): void {
    this.steps.push(
      this.fb.group({
        description: ['', Validators.required],
        stepOrder: [this.steps.length + 1]
      })
    );
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const files = Array.from(target.files);
      this.uploadedFiles = [];
      files.forEach((file) => this.convertAndAddFile(file));
    }
  }

  async convertAndAddFile(file: File): Promise<void> {
    try {
      const convertedFile = await this.imageConverterService.processImage(file, 500, 600, 'webp', 1);
      if (convertedFile) {
        const blob = await (await fetch(convertedFile)).blob();
        this.uploadedFiles.push(new File([blob], `${file.name.split('.')[0]}.webp`, { type: 'image/webp' }));
      }
    } catch (error) {
      console.error('Kunde inte konvertera bilden:', error);
    }
  }

  createRecipe(): void {
    const formData = new FormData();
    formData.append('recipe', JSON.stringify(this.recipeForm.value));

    this.uploadedFiles.forEach((file) => formData.append('images', file));

    this.http.post('api/v1/recipe/add', formData).subscribe({
      next: () => console.log('Receptet skapades!'),
      error: (error) => console.error('Det blev ett fel!', error)
    });
  }

  getIngredients(section: AbstractControl): FormArray {
    return section.get('ingredients') as FormArray;
  }
}
