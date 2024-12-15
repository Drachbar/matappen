import { Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {CreateRecipeComponent} from "./components/create-recipe/create-recipe.component";
import {SearchRecipeComponent} from "./components/search-recipe/search-recipe.component";
import {RecipeComponent} from "./components/recipe/recipe.component";

export const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recipe/create-recipe', component: CreateRecipeComponent},
  {path: 'recipe/search-recipe', component: SearchRecipeComponent},
  {path: 'recipe/show-recipe/:id', component: RecipeComponent},
];
