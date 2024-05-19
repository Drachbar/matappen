import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {UploadImagesComponent} from "../upload-images/upload-images.component";

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    UploadImagesComponent
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

  constructor(private http: HttpClient) {
  }

  createRecipe() {
    this.http.post('api/v1/recipe/add', this.recipeData).subscribe({
      next: (response) => console.log('Data skickades!', response),
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
