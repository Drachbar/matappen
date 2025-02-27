import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {recipeSummary} from "../../model/recipe";

@Component({
  selector: 'app-recipe-list',
  imports: [
    RouterLink
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  @Input() recipes: recipeSummary = [];
}
