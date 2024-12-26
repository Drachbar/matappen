import { Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {CreateRecipeComponent} from "./components/create-recipe/create-recipe.component";
import {RecipeComponent} from "./components/recipe/recipe.component";
import {AccountComponent} from "./components/account/account.component";
import {AllRecipesComponent} from "./components/all-recipes/all-recipes.component";
import {MyRecipesComponent} from "./components/my-recipes/my-recipes.component";
import {ShowSearchListComponent} from "./components/show-search-list/show-search-list.component";
import {CreateRecipe2Component} from "./components/create-recipe-2/create-recipe-2.component";

export const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account', component: AccountComponent},
  {path: 'recipe/create-recipe', component: CreateRecipeComponent},
  {path: 'recipe/create-recipe-2', component: CreateRecipe2Component},
  {path: 'recipe/search-recipe', component: ShowSearchListComponent },
  {path: 'recipe/all-recipes', component: AllRecipesComponent},
  {path: 'recipe/my-recipes', component: MyRecipesComponent},
  {path: 'recipe/show-recipe/:id', component: RecipeComponent},
];
