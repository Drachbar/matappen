import {Component, OnInit} from '@angular/core';
import {RecipeListComponent} from "../recipe-list/recipe-list.component";
import {recipeSummary} from "../../model/recipe";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-my-recipes',
    imports: [
        RecipeListComponent
    ],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss'
})
export class MyRecipesComponent implements OnInit {
  recipes: recipeSummary = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getRecipes()
  }

  getRecipes() {
    this.http.get<recipeSummary>(`/api/v1/recipe/getMyRecipes`).subscribe({
      next: (response) => {
        this.recipes = response
        console.log('Data skickades!', response)
      },
      error: (error) => console.error('Det blev ett fel!', error)
    });
  }
}
