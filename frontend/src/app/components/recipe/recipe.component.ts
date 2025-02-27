import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {Recipe} from "../../model/recipe";

@Component({
  selector: 'app-recipe',
  imports: [
    NgIf
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit {
  recipe?: Recipe;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.http.get<Recipe>(`api/v1/recipe/getRecipeById?id=${id}`).subscribe({
      next: (data: Recipe) => {
        this.recipe = this.sortRecipe(data)
      },
      error: (error) => console.error('Det blev ett fel!', error)
    })
  }

  sortRecipe(recipe: Recipe): Recipe {
    recipe.recipeStepsDto.sort((a, b) => a.stepOrder - b.stepOrder);
    recipe.ingredientSectionsDto.forEach(section =>
      section.ingredients.sort((a, b) => a.ingredientOrder - b.ingredientOrder)
    );
    recipe.ingredientSectionsDto.sort((a, b) => a.sectionOrder - b.sectionOrder);
    recipe.imagesDto.sort((a, b) => a.order - b.order);
    return recipe;
  }

}
