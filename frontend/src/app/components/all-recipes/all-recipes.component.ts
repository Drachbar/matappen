import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {recipeSummary} from "../../model/recipe";
import {RecipeListComponent} from "../recipe-list/recipe-list.component";

@Component({
  selector: 'app-all-recipes',
  imports: [
    RecipeListComponent
  ],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent implements OnInit {
  recipes: recipeSummary = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getRecipes()
  }

  getRecipes() {
    this.http.get<recipeSummary>(`/api/v1/recipe/getAllRecipes`).subscribe({
      next: (response) => {
        this.recipes = response
        console.log('Data skickades!', response)
      },
      error: (error) => console.error('Det blev ett fel!', error)
    });
  }
}
