import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

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
  recipeName: FormControl = new FormControl('', Validators.required)
  recipeDescription: FormControl = new FormControl('', Validators.required)
  ingredientSections!: FormArray;
  recipeSteps!: FormArray;

  constructor(private fb: FormBuilder) {  }

  ngOnInit() {
    this.ingredientSections = this.fb.array([]);
    this.recipeSteps = this.fb.array([]);

    this.recipeForm = this.fb.group({
      recipeName: this.recipeName,
      description: this.recipeDescription,
      ingredientSections: this.ingredientSections,
      steps: this.recipeSteps
    })
    this.addSection(); // Start med en sektion
    this.addStep();
  }

  addSection(): void {
    const section = this.fb.group({
      name: ['', Validators.required],
      ingredients: this.fb.array([])
    });
    this.ingredientSections.push(section);
    this.addIngredient(this.ingredientSections.length - 1); // Lägg till en ingrediens i den nya sektionen
  }

  addIngredient(ingredientSectionIndex: number): void {
    const ingredients = this.ingredientSections.at(ingredientSectionIndex).get('ingredients') as FormArray;
    ingredients.push(
      this.fb.group({
        name: ['', Validators.required],
        unit: [null],
        amount: [null],
      })
    );
  }

  addStep(): void {
    this.recipeSteps.push(
      new FormControl('', Validators.required)
    );
  }

  removeSection(index: number): void {
    this.ingredientSections.removeAt(index);
  }

  removeIngredient(sectionIndex: number, ingredientIndex: number): void {
    const ingredients = this.ingredientSections.at(sectionIndex).get('ingredients') as FormArray;
    ingredients.removeAt(ingredientIndex);
  }

  removeStep(index: number): void {
    this.recipeSteps.removeAt(index);
  }

  createRecipe() {
    console.log(this.recipeForm.value)
  }

  getIngredients(sectionIndex: number): FormArray {
    return this.ingredientSections.at(sectionIndex).get('ingredients') as FormArray;
  }
}
