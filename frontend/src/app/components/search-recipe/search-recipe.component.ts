import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {recipeSummary} from "../../model/recipe";
import {RecipeListComponent} from "../recipe-list/recipe-list.component";

@Component({
    selector: 'app-search-recipe',
  imports: [
    FormsModule,
    RecipeListComponent,
  ],
    templateUrl: './search-recipe.component.html',
    styleUrl: './search-recipe.component.scss'
})
export class SearchRecipeComponent {
  recipes: recipeSummary = [];

  formGetRecipe = {
    name: '',
  };

  constructor(private http: HttpClient) {
  }

  getRecipesByName() {
    this.http.get<recipeSummary>(`/api/v1/recipe/getRecipes?name=${this.formGetRecipe.name}`).subscribe({
      next: (response) => {
        this.recipes = response
        console.log('Data skickades!', response)
      },
      error: (error) => console.error('Det blev ett fel!', error)
    });
  }
}
