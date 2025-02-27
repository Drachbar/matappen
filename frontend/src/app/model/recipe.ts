export type recipeSummary = {
  id: number;
  creatorName: string;
  description: string;
  nameRecipe: string;
  imageUrl: string | null;
}[]

export type Recipe = {
  recipeDto: RecipeDto;
  recipeStepsDto: RecipeStep[];
  ingredientSectionsDto: IngredientSection[];
  imagesDto: Image[];
};

export type RecipeDto = {
  id: number;
  nameRecipe: string;
  description: string;
  creatorName: string;
  imageUrl: string | null;
};

export type RecipeStep = {
  description: string;
  stepOrder: number;
  id: number;
};

export type IngredientSection = {
  name: string;
  sectionOrder: number;
  ingredients: Ingredient[];
  id: number;
};

export type Ingredient = {
  name: string;
  unit: string | null;
  ingredientOrder: number;
  amount: number | null;
  id: number;
};

export type Image = {
  name: string;
  width: number;
  height: number;
  order: number;
  id: number;
};
