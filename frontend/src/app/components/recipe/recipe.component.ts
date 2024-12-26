import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-recipe',
  imports: [
    NgIf
  ],
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit {
  recipe: any = null;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.http.get(`api/v1/recipe/getRecipeById?id=${id}`).subscribe({
      next: (response) => {
        this.recipe = response;
        console.log('Data skickades!', response);
      },
      error: (error) => console.error('Det blev ett fel!', error)
    })
  }


}
