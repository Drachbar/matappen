import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {recipeSummary} from "../../model/recipe";
import {HttpClient} from "@angular/common/http";
import {RecipeListComponent} from "../recipe-list/recipe-list.component";

@Component({
  selector: 'app-show-search-list',
  imports: [
    RecipeListComponent
  ],
  templateUrl: './show-search-list.component.html',
  styleUrl: './show-search-list.component.scss'
})
export class ShowSearchListComponent implements OnInit {
  searchQuery: string = '';
  recipes: recipeSummary = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {this.route.queryParams.subscribe(params => {
    this.searchQuery = params['search'] || '';
    this.getRecipesByName();
  });
  }

  getRecipesByName() {
    this.http.get<recipeSummary>(`/api/v1/recipe/getRecipes?name=${this.searchQuery}`).subscribe({
      next: (response) => {
        this.recipes = response
        console.log('Data skickades!', response)
      },
      error: (error) => console.error('Det blev ett fel!', error)
    });
  }
}
