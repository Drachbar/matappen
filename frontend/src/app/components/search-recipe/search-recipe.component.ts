import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-search-recipe',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink,
  ],
  templateUrl: './search-recipe.component.html',
  styleUrl: './search-recipe.component.scss'
})
export class SearchRecipeComponent {
  recipes: any = [];

  formGetRecipe = {
    name: '',
  };

  constructor(private http: HttpClient) {
  }

  getRecipesByName() {
    this.http.get(`/api/v1/recipe/getRecipes?name=${this.formGetRecipe.name}`).subscribe({
      next: (response) => {
        this.recipes = response
        console.log('Data skickades!', response)
      },
      error: (error) => console.error('Det blev ett fel!', error)
    });
  }
}
