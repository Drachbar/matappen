import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FallbackImageConverterService} from "../../services/ImageConverterServices/fallback-image-converter.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-create-recipe-2',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-recipe-2.component.html',
  styleUrl: './create-recipe-2.component.scss'
})
export class CreateRecipe2Component implements OnInit {
  recipeForm!: FormGroup;
  nameRecipe: FormControl = new FormControl('', Validators.required)
  recipeDescription: FormControl = new FormControl('', Validators.required)
  sections!: FormArray;
  steps!: FormArray;
  uploadedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private imageConverterService: FallbackImageConverterService,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    this.sections = this.fb.array([]);
    this.steps = this.fb.array([]);

    this.recipeForm = this.fb.group({
      nameRecipe: this.nameRecipe,
      description: this.recipeDescription,
      sections: this.sections,
      steps: this.steps
    })
    this.addSection();
    this.addStep();
  }

  addSection(): void {
    const section = this.fb.group({
      name: ['', Validators.required],
      ingredients: this.fb.array([])
    });
    this.sections.push(section);
    this.addIngredient(this.sections.length - 1); // Lägg till en ingrediens i den nya sektionen
  }

  addIngredient(ingredientSectionIndex: number): void {
    const ingredients = this.sections.at(ingredientSectionIndex).get('ingredients') as FormArray;
    ingredients.push(
      this.fb.group({
        name: ['', Validators.required],
        unit: [null],
        amount: [null],
      })
    );
  }

  addStep(): void {
    this.steps.push(
      new FormGroup({
        description: new FormControl('', Validators.required)
      })
    );
  }

  removeSection(index: number): void {
    this.sections.removeAt(index);
  }

  removeIngredient(sectionIndex: number, ingredientIndex: number): void {
    const ingredients = this.sections.at(sectionIndex).get('ingredients') as FormArray;
    ingredients.removeAt(ingredientIndex);
  }

  moveIngredientUp(sectionIndex: number, ingredientIndex: number): void {
    const ingredients = this.sections.at(sectionIndex).get('ingredients') as FormArray;
    if (ingredientIndex > 0) {
      const ingredientList = ingredients.value;
      const temp = ingredientList[ingredientIndex];
      ingredientList[ingredientIndex] = ingredientList[ingredientIndex - 1];
      ingredientList[ingredientIndex - 1] = temp;
      ingredients.setValue(ingredientList);
    }
  }

  moveIngredientDown(sectionIndex: number, ingredientIndex: number): void {
    const ingredients = this.sections.at(sectionIndex).get('ingredients') as FormArray;
    if (ingredientIndex < ingredients.length - 1) {
      const ingredientList = ingredients.value;
      const temp = ingredientList[ingredientIndex];
      ingredientList[ingredientIndex] = ingredientList[ingredientIndex + 1];
      ingredientList[ingredientIndex + 1] = temp;
      ingredients.setValue(ingredientList);
    }
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
  }

  moveStepUp(index: number): void {
    if (index > 0) {
      const steps = this.steps.value;
      const temp = steps[index];
      steps[index] = steps[index - 1];
      steps[index - 1] = temp;
      this.steps.setValue(steps);
    }
  }

  moveStepDown(index: number): void {
    if (index < this.steps.length - 1) {
      const steps = this.steps.value;
      const temp = steps[index];
      steps[index] = steps[index + 1];
      steps[index + 1] = temp;
      this.steps.setValue(steps);
    }
  }

  moveSectionUp(index: number): void {
    if (index > 0) {
      const sections = this.sections;
      const currentSection = sections.at(index);
      const previousSection = sections.at(index - 1);

      sections.setControl(index, previousSection);
      sections.setControl(index - 1, currentSection);
    }
  }

  moveSectionDown(index: number): void {
    if (index < this.sections.length - 1) {
      const sections = this.sections;
      const currentSection = sections.at(index);
      const nextSection = sections.at(index + 1);

      sections.setControl(index, nextSection);
      sections.setControl(index + 1, currentSection);
    }
  }

  createRecipe() {
    console.log("innan:" + "this.recipeForm.value")

    let recipeToSend = this.recipeForm.value;

    console.log(recipeToSend)

    recipeToSend.sections.forEach((section: any, sectionIndex: number) => {
      section.sectionOrder = sectionIndex + 1;
      section.ingredients.forEach((ingredient: any, ingredientIndex: number) => {
        ingredient.ingredientOrder = ingredientIndex + 1;
      })
    })

    recipeToSend.steps.forEach((step: any, stepIndex: number) => {
      step.stepOrder = stepIndex + 1;
    })

    console.log(recipeToSend.sections)

    const formData = new FormData();
    formData.append('recipe', JSON.stringify(this.recipeForm.value));

    console.log(formData.get('recipe'))

    this.uploadedFiles.forEach((file) => formData.append('images', file));

    this.http.post('api/v1/recipe/add', formData).subscribe({
      next: () => console.log('Receptet skapades!'),
      error: (error) => console.error('Det blev ett fel!', error)
    });
  }


  getIngredients(sectionIndex: number): FormArray {
    return this.sections.at(sectionIndex).get('ingredients') as FormArray;
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
        this.uploadedFiles.push(new File([blob], `${file.name.split('.')[0]}.webp`, {type: 'image/webp'}));
      }
    } catch (error) {
      console.error('Kunde inte konvertera bilden:', error);
    }
  }
}
